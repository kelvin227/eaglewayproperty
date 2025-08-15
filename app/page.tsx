import React from "react";

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at 60% 40%, #ffe5e9 0%, #fff3cd 100%)",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
      aria-label="Site Blocked Notice"
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          padding: "3rem 2.5rem",
          maxWidth: "440px",
          border: "1px solid #f5c6cb",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-32px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #f8d7da 60%, #fff3cd 100%)",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #fff",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" fill="#f8d7da" />
            <path
              d="M12 8v4M12 16h.01"
              stroke="#721c24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1
          style={{
            color: "#721c24",
            marginBottom: "0.75rem",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-1px",
            marginTop: "2rem",
          }}
        >
          Site Blocked
        </h1>
        <p
          style={{
            color: "#856404",
            fontWeight: 500,
            marginBottom: "1.5rem",
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          This website is temporarily unavailable due to a server hosting issue.
        </p>
        <div
          style={{
            textAlign: "left",
            color: "#495057",
            fontSize: "1rem",
            background: "#fffbe6",
            borderRadius: "12px",
            padding: "1rem 1.2rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            marginBottom: "1rem",
          }}
        >
          <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: "#721c24" }}>Web Developer:</strong>{" "}
              Please log in to your{" "}
              <span style={{ color: "#007bff" }}>cPanel</span> and resolve the
              hosting issue.
            </li>
            <li>
              <strong style={{ color: "#721c24" }}>Site Owner:</strong> If you
              hired a developer, please contact them to restore your site.
            </li>
          </ul>
        </div>
        <div
          style={{
            fontSize: "0.95rem",
            color: "#6c757d",
            marginTop: "1.5rem",
            borderTop: "1px solid #f5c6cb",
            paddingTop: "1rem",
          }}
        >
          <span role="img" aria-label="info" style={{ marginRight: "0.5rem" }}>
            ℹ️
          </span>
          For urgent support, contact your hosting provider.
        </div>
      </div>
    </main>
  );
}
