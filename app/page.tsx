import Link from "next/link";

export default function Kambaz() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "2rem", color: "#000", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Name: Abirami T, Section: WebDev Online
        </p>
        <h1 style={{ fontWeight: "bold", fontSize: "2.5rem", marginBottom: "1rem" }}>
          Kambaz
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          Welcome to the Kambaz application! This is a prototype online learning management system, inspired by Canvas and used for coursework demonstration in your Full Stack Next.js applications class.
        </p>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "1.1rem" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <Link href="/Kambaz/Account/Signin" id="wd-account-signin-link" style={{ color: "#0070f3", textDecoration: "underline" }}>
                Account: Sign In
              </Link>
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <Link href="/Kambaz/Account/Signup" id="wd-account-signup-link" style={{ color: "#0070f3", textDecoration: "underline" }}>
                Account: Sign Up
              </Link>
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <Link href="/Kambaz/Dashboard" id="wd-dashboard-link" style={{ color: "#0070f3", textDecoration: "underline" }}>
                Dashboard
              </Link>
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <Link href="/Kambaz/Labs" id="wd-labs-link" style={{ color: "#0070f3", textDecoration: "underline" }}>
                Labs
              </Link>
            </li>
            <li>
              <Link href="/" id="wd-landing-page-link" style={{ color: "#0070f3", textDecoration: "underline" }}>
                Back to Main Landing Page
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
