import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../preview/supabaseClient";
import "./fve311.css";
import { toCsv } from "./constants";

export default function Fve311ListPage() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("fve311_registrations")
        .select("reg_number,full_name,mat_no,department,year_of_study,skill_interest,created_at")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (!alive) return;
      if (fetchError) setError("Could not load registrants.");
      else setRows(data || []);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.reg_number, r.full_name, r.mat_no, r.department, r.skill_interest]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [rows, query]);

  function downloadCsv() {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fve311-registrations.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="fve311-wrap">
      <div className="fve311-nav">
        <Link to="/fve311">← Register</Link>
        <Link to="/">my-uni-map →</Link>
      </div>
      <div className="fve311-list-wrap">
        <span className="fve311-badge">FVE 311 · Registrants</span>
        <h1 style={{ fontSize: 32, margin: "0 0 6px" }}>{loading ? "Loading…" : `${filtered.length} registered`}</h1>
        <p style={{ color: "#cbd5c9", fontSize: 14 }}>
          Public list — 1–20 November 2026 window. Search or export below.
        </p>
        <div className="fve311-list-card">
          {error ? <div className="fve311-error">{error}</div> : null}
          <div className="fve311-list-tools">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, mat no, department, reg number…"
            />
            <button className="fve311-btn" style={{ width: "auto", padding: "10px 18px" }} type="button" onClick={downloadCsv} disabled={filtered.length === 0}>
              Export CSV
            </button>
          </div>
          <div className="fve311-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Reg number</th>
                  <th>Name</th>
                  <th>Mat no</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Skill</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.reg_number}>
                    <td><strong>{r.reg_number}</strong></td>
                    <td>{r.full_name}</td>
                    <td>{r.mat_no}</td>
                    <td>{r.department}</td>
                    <td>{r.year_of_study}</td>
                    <td>{r.skill_interest}</td>
                    <td>{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!loading && filtered.length === 0 ? <p className="fve311-sub" style={{ marginTop: 12 }}>No registrants yet.</p> : null}
        </div>
      </div>
    </div>
  );
}
