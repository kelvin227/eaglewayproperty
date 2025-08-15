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
        background: "#f8d7da",
        color: "#721c24",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
      aria-label="Site Blocked Notice"
    >
      <h1>Site Blocked</h1>
      <p>This site is currently blocked due to a server hosting issue.</p>
      <p>
        If you are the web developer, please log in to your cPanel to resolve
        it.
      </p>
      <p>
        If you had a developer manage the site for you, please contact the
        developer to resolve the issue.
      </p>
    </main>
  );
}
