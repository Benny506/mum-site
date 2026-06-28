import React from 'react';
import quotation from "../../assets/images/quotation.png";
import testimonial1 from "../../assets/images/testimonial1.png";
import testimonial2 from "../../assets/images/testimonial2.png";
import testimonial3 from "../../assets/images/testimonial3.png";
import './Testimonials.css';

const testimonialsData = [
  {
    text: "I found a POS right behind my faculty I never knew was there — no more running to the other side of campus for cash.",
    img: testimonial1,
    name: "Alicia James",
    level: "200 level student"
  },
  {
    text: "Freshers need this app. I wish I had it last year — finding classes and hangout spots would’ve been so much easier.",
    img: testimonial3,
    name: "Jude Akpan",
    level: "200 level student"
  },
  {
    text: "It’s easier to meet up with friends now. The ping feature is mad — no more endless calls or ‘where are you?’ texts.",
    img: testimonial1,
    name: "Kennedy Effiong",
    level: "300 level student"
  },
  {
    text: "The business catalogs are a lifesaver. Found someone selling exactly the textbook I needed just 2 blocks away.",
    img: testimonial2,
    name: "Sarah Jenkins",
    level: "400 level student"
  }
];

const TestimonialCard = ({ data }) => (
  <div
    className="d-flex flex-column justify-content-between shadow-sm"
    style={{
      width: "450px",
      borderRadius: "15px",
      background: "#FFFBFB",
      padding: "30px",
      whiteSpace: "normal",
      border: "1px solid #f9f9f9"
    }}
  >
    <div>
      <img src={quotation} alt="quote" style={{ width: 30 }} />
    </div>
    <div className="fs-16 fw-500 mt-4 mb-4" style={{ minHeight: "80px", color: '#444' }}>
      "{data.text}"
    </div>
    <div className="d-flex align-items-center">
      <img src={data.img} alt={data.name} style={{ width: 45, height: 45, borderRadius: '50%', objectFit: 'cover' }} />
      <div className="ms-3">
        <div className="fs-14 fw-600">{data.name}</div>
        <div className="fw-400 fs-12 text-muted">{data.level}</div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <div className="spacing-50 my-5 py-5 position-relative overflow-hidden">

      {/* Massive Quotation Mark Watermark */}
      <div
        className="position-absolute text-danger fw-bold quote-watermark quote-watermark-top"
        style={{ zIndex: 0, userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}
      >
        "
      </div>
      <div
        className="position-absolute text-danger fw-bold quote-watermark quote-watermark-bottom"
        style={{ zIndex: 0, userSelect: 'none', pointerEvents: 'none', lineHeight: 1, transform: 'rotate(180deg)' }}
      >
        "
      </div>

      <div className="text-center mb-5 px-3 position-relative" style={{ zIndex: 1 }}>
        <div className="fs-32 fw-600">What Students Are Saying</div>
        <div className="fs-16 fw-400 mt-3 text-muted">
          Real Voices. Real Experiences.
        </div>
      </div>
      <div className="marquee-container py-3 position-relative" style={{ zIndex: 1 }}>
        {/* Render 2 identical blocks for seamless infinite looping */}
        <div className="marquee-content">
          {testimonialsData.map((t, i) => <TestimonialCard key={i} data={t} />)}
        </div>
        <div className="marquee-content">
          {testimonialsData.map((t, i) => <TestimonialCard key={`dup-${i}`} data={t} />)}
        </div>
      </div>
    </div>
  )
}
