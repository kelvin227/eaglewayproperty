import React from "react";

export default function ApplicationEmail({ applicantName = "Valued Client" }) {
  return (
    <div style={{ fontFamily: "Segoe UI, Arial, sans-serif", background: "#f4f8fb", padding: 0, margin: 0 }}>
      <div
        style={{
          maxWidth: 540,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 24px rgba(30,58,138,0.10)",
          padding: "40px 32px 32px 32px",
          border: "1px solid #e3e8ee",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img
            src="https://qsohd7f0aqhsgruh.public.blob.vercel-storage.com/eagleway-logo%28edited%29-51rEs4QpKTWxZeZQeROwgaMdIaBV1X.png"
            alt="Eagleway Properties Logo"
            style={{ width: 64, height: 64, marginBottom: 8, borderRadius: 8 }}
          />
          <h1 style={{ color: "#1e3a8a", fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: 1 }}>
            Application Approved!
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, marginTop: 8, marginBottom: 0 }}>
            Eagleway Properties Rental LLC
          </p>
        </div>
        <div style={{ fontSize: 17, color: "#222", lineHeight: 1.7 }}>
          <p style={{ margin: "0 0 16px 0" }}>
            Dear <span style={{ fontWeight: 600 }}>{applicantName}</span>,
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            <span style={{ color: "#16a34a", fontWeight: 600 }}>Congratulations!</span> We are pleased to inform you that your application has been <b>approved</b>.
          </p>
          <p style={{ margin: "0 0 16px 0" }}>
            Our agent will contact you soon to guide you through the next steps for your chosen property. If you have any questions, please reply to this email or contact our support team.
          </p>
          <p style={{ margin: "0 0 24px 0" }}>
            Thank you for choosing <b>Eagleway Properties Rental LLC</b>. We are committed to helping you find your perfect home.
          </p>
        </div>
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <a
            href="https://eaglewayproperty.com"
            style={{
              display: "inline-block",
              background: "linear-gradient(90deg,#1e3a8a 0%,#2563eb 100%)",
              color: "#fff",
              padding: "14px 36px",
              borderRadius: 6,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 2px 8px rgba(30,58,138,0.08)",
              letterSpacing: 0.5,
            }}
          >
            Visit Our Website
          </a>
        </div>
        <div style={{ background: "#f1f5f9", borderRadius: 8, padding: "18px 24px", marginBottom: 24 }}>
          <p style={{ margin: 0, color: "#475569", fontSize: 15 }}>
            <span style={{ fontWeight: 600 }}>Need help?</span> Our support team is here for you:&nbsp;
            <a href="mailto:support@eaglewayproperty.com" style={{ color: "#1e3a8a", textDecoration: "underline" }}>
              support@eaglewayproperty.com
            </a>
          </p>
        </div>
        <p style={{ fontSize: 15, color: "#222", textAlign: "center", margin: 0 }}>
          We offer you the best home&nbsp;
          <span role="img" aria-label="house">🏠</span>
        </p>
        <hr style={{ margin: "32px 0 16px 0", border: "none", borderTop: "1px solid #e2e8f0" }} />
        <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", margin: 0 }}>
          &copy; {new Date().getFullYear()} Eagleway Properties Rental LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
