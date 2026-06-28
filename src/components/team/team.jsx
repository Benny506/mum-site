import styles from './team.module.css';
import { BiSend } from "react-icons/bi";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.png";
import img5 from "../../assets/images/img5.png";

function Team() {

  return (
    <div className="spacing-50 my-5 ">
      <div
        className={styles.container}
      >
        <div className={styles.content}>
          <div className="fs-43 fw-600">
            Why We’re Different — Tested on Campus, Proven by Students
          </div>
          <div className="my-3 fs-16 fw-500">
            Google Maps is great for cities. Our app is built for campus life —
            with real landmarks, shortcuts, and hidden spots only students know.
            Made by students, for students.
          </div>
          <div
            className="bg-ff d-flex gap-2"
            style={{
              borderRadius: "60px",
              padding: "10px",
              alignSelf: "end",
              minWidth: "80px",
            }}
          >
            <input
              placeholder="Your email address"
              className="w-75 w-md-25"
              style={{ border: "none", borderRadius: "60px" }}
            />
            <button
              className="bg-fa txt-ff d-none d-md-block col-6"
              style={{ borderRadius: "60px", padding: "10px 20px" }}
            >
              Get early access
            </button>
            <BiSend color="red" size={30} className="d-block d-md-none" />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div
          className="d-flex align-items-center gap-5 justify-content-center flex-column flex-lg-row justify-content-lg-between"
        >
          <img src={img1} alt="Team member 1" className={styles.teamImg} style={{ width: "100%", maxWidth: "230px" }} />
          <div className={styles.teamDescription}>
            <div className="fs-56 fw-600 mt-5">
              The Team Behind the Technology.
            </div>
            <div className="fs-19 fw-400 mt-4">
              We’re Control Genesis — students and creators building tools to
              make campus life easier. We face the same struggles, so we set out
              to solve them.
            </div>
          </div>
          <img
            src={img2} style={{ width: "100%", maxWidth: "230px" }}
            alt="Team member 2"
            className={`${styles.teamImg} mt-4 mt-lg-0`}
          />
        </div>
        <div
          className="d-flex mt-5 align-items-center gap-5 justify-content-center flex-column flex-md-row justify-content-md-between"
        >
          <img src={img3} alt="Team member 3" style={{ width: "100%", maxWidth: "230px" }} />
          <img
            src={img4}
            alt="Team member 4" style={{ width: "100%", maxWidth: "230px" }}
            className={styles.offsetImage}
          />
          <img src={img5} alt="Team member 5" style={{ width: "100%", maxWidth: "230px" }} />
        </div>
      </div>
    </div>
  );
}

export default Team;
