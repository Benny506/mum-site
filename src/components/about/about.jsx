import { FreshersCard, ReturningCard, VisitorsCard, CampusCollage } from "./AboutCards";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="spacing-50 mt-4 d-flex flex-column align-items-center">
      <div className="text-center" style={{ maxWidth: "569px" }}>
        <div className="fs-32 fw-600">We Know the Struggle</div>
        <div className="fs-16 fw-400">
          Not knowing where an office, lecture hall, or restroom is can be
          frustrating — from losing the best seats in class to trekking across
          campus just to find the one restroom you know.
        </div>
      </div>
      <div className="d-flex flex-column flex-xl-row gap-4 mt-5 w-100 px-3 px-xl-5">
        <div className="flex-grow-1" style={{ flexBasis: "40%" }}>
          <FreshersCard />
        </div>
        <div className="d-flex gap-4 flex-column flex-grow-1" style={{ flexBasis: "60%" }}>
          <ReturningCard />
          <VisitorsCard />
        </div>
      </div>
      <div className="d-flex justify-content-between w-100 px-3 px-xl-5 flex-column flex-lg-row mt-5 pt-5 align-items-center gap-5">
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <CampusCollage />
        </div>
        <div className="text-start" style={{ maxWidth: "520px" }}>
          <div className="fs-32 fw-600">
            Your Campus Mapped Like Never Before
          </div>
          <div className="fs-16 fw-400 my-4">
            We built an app that shows every spot on campus — with real photos,
            directions, and even friend tracking. From classes to offices to
            that suya joint your friend mentioned, you’ll get there without the
            guesswork.
          </div>
          <Link to="/download" className="text-decoration-none">
            <button
              className="d-flex align-items-center fs-16"
              style={{
                backgroundColor: "#FA0808",
                borderRadius: "40px",
                padding: "13px 18px",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              <p className="mb-0 fw-500">Get started for free</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;