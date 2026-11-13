import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../preview/supabaseClient";
import "./fve311.css";
import {
  FVE311_CLOSE_MS,
  FVE311_OPEN_MS,
  SKILL_SUGGESTIONS,
  YEAR_OPTIONS,
  buildReceiptText,
  generateRegNumber,
  getCountdownParts,
  getWindowState,
  spacedPin,
} from "./constants";

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export default function Fve311Page() {
  const now = useNow();
  const state = getWindowState(now);
  const target = state === "upcoming" ? FVE311_OPEN_MS : FVE311_CLOSE_MS;
  const parts = useMemo(() => getCountdownParts(target, now), [target, now]);

  const [fullName, setFullName] = useState("");
  const [matNo, setMatNo] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [skill, setSkill] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (state !== "live") {
      setError(state === "upcoming" ? "Registration has not opened yet." : "Registration is closed.");
      return;
    }
    if (!fullName.trim() || !matNo.trim() || !department.trim() || !year || !skill.trim()) {
      setError("Please fill every field.");
      return;
    }
    if (!confirmed) {
      setError("Please tick the confirmation that your Mat No is 100% correct.");
      return;
    }
    setSubmitting(true);
    try {
      let created = null;
      let lastError = null;
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const reg_number = generateRegNumber();
        const { data, error: insertError } = await supabase
          .from("fve311_registrations")
          .insert({
            full_name: fullName.trim(),
            mat_no: matNo.trim(),
            department: department.trim(),
            year_of_study: Number(year),
            skill_interest: skill.trim(),
            reg_number,
          })
          .select()
          .single();
        if (!insertError) {
          created = data;
          setResult(data);
          break;
        }
        lastError = insertError;
        if (insertError.code !== "23505") break;
      }
      if (!created) throw lastError || new Error("Insert failed");
    } catch (err) {
      const msg = String(err?.message || "");
      if (msg.includes("fve311_window_check")) {
        setError("Registration window has closed.");
      } else {
        setError("Could not submit. Check your connection and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function copyReg() {
    if (result?.reg_number && navigator.clipboard) {
      navigator.clipboard.writeText(result.reg_number).catch(() => null);
    }
  }

  function downloadReceipt(row) {
    const target = row || result;
    if (!target) return;
    const blob = new Blob([buildReceiptText(target)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${target.reg_number}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // Force the receipt download once per successful registration
  const downloadedFor = useRef(null);
  useEffect(() => {
    if (result?.reg_number && downloadedFor.current !== result.reg_number) {
      downloadedFor.current = result.reg_number;
      downloadReceipt(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className="fve311-wrap">
      <div className="fve311-nav">
        <Link to="/">← my-uni-map</Link>
        <Link to="/fve311/list">View registrants →</Link>
      </div>
      <div className="fve311-hero">
        <span className="fve311-badge">FVE 311 · Digital Entrepreneurship</span>
        <h1>Course Registration 2026</h1>
        <p>Register online and get your registration number instantly. Open to all students offering this course.</p>
        <div className="fve311-window">1 – 20 November 2026 · West Africa Time</div>
        <div className="fve311-countdown" aria-live="polite">
          {(["days", "hours", "minutes", "seconds"]).map((k) => (
            <div className="fve311-count" key={k}>
              <strong>{String(parts[k]).padStart(2, "0")}</strong>
              <span>{k}</span>
            </div>
          ))}
        </div>
        <div className="fve311-window">
          {state === "upcoming" ? "Opens in" : state === "live" ? "Closes in" : "Registration closed — list stays open below"}
        </div>
      </div>

      <div className="fve311-card">
        {result ? (
          <div className="fve311-success">
            <h2>You're registered 🎉</h2>
            <p className="fve311-sub">Save this number — you'll need it for the course. Your receipt downloaded automatically.</p>
            <div className="fve311-reg">{result.reg_number}</div>
            <p className="fve311-sub">Read aloud: {spacedPin(result.reg_number)}</p>
            <p className="fve311-sub">{result.full_name} · {result.mat_no}</p>
            <div className="fve311-row-btns">
              <button className="fve311-btn" type="button" onClick={copyReg}>Copy number</button>
              <button className="fve311-ghost" type="button" onClick={() => downloadReceipt()}>Download receipt</button>
            </div>
            <div className="fve311-row-btns">
              <Link className="fve311-ghost" to="/fve311/list">View list</Link>
            </div>
          </div>
        ) : state !== "live" ? (
          <div className="fve311-success">
            <h2>{state === "upcoming" ? "Not open yet" : "Registration closed"}</h2>
            <p className="fve311-sub">
              {state === "upcoming"
                ? "Come back on 1 November 2026 to register."
                : "The window ended 20 November 2026. You can still browse the registrants list."}
            </p>
            <div className="fve311-row-btns">
              <Link className="fve311-ghost" to="/fve311/list">View registrants</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <p className="fve311-sub">Takes less than a minute.</p>
            {error ? <div className="fve311-error">{error}</div> : null}
            <div className="fve311-field">
              <label htmlFor="fve-name">Name</label>
              <input id="fve-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Adaeze Okonkwo" autoComplete="name" />
            </div>
            <div className="fve311-field">
              <label htmlFor="fve-mat">Mat. No</label>
              <input id="fve-mat" value={matNo} onChange={(e) => setMatNo(e.target.value)} placeholder="e.g. FVE/2023/001" autoComplete="off" />
            </div>
            <div className="fve311-field">
              <label htmlFor="fve-dept">Department</label>
              <input id="fve-dept" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Vocational Education" />
            </div>
            <div className="fve311-field">
              <label htmlFor="fve-year">Year of Study</label>
              <select id="fve-year" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Select year</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>Year {y}</option>
                ))}
              </select>
            </div>
            <div className="fve311-field">
              <label htmlFor="fve-skill">Skill interested in</label>
              <input id="fve-skill" list="fve-skills" value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Start typing or pick a suggestion" />
              <datalist id="fve-skills">
                {SKILL_SUGGESTIONS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
            <label className="fve311-check">
              <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
              <span>I confirm my Mat. No above is 100% correct. I understand it cannot be edited after submission.</span>
            </label>
            <button className="fve311-btn" type="submit" disabled={submitting}>
              {submitting ? "Registering…" : "Get my registration number"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
