"use client";

import AccountSidebar from "../Sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState("newuser");
  const [password, setPassword] = useState("password123");
  const [verifyPassword, setVerifyPassword] = useState("password123");

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== verifyPassword) {
      alert("Passwords do not match!");
      return;
    }
    router.push("/Kambaz/Account/Profile");
  };

  return (
    <div style={{ display: "flex" }}>
      <AccountSidebar />
      <div style={{ flex: 1, paddingLeft: 20, color: "#000" }}>
        <h3 style={{ fontWeight: "bold", fontSize: "1.8rem", marginBottom: "1rem" }}>
          Sign up
        </h3>
        <form onSubmit={handleSignup}>
          <label htmlFor="wd-signup-username" style={{ fontSize: "1rem", fontWeight: "bold" }}>
            Username
          </label>
          <br />
          <input
            type="text"
            id="wd-signup-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "#000"
            }}
          />
          <br />

          <label htmlFor="wd-signup-password" style={{ fontSize: "1rem", fontWeight: "bold" }}>
            Password
          </label>
          <br />
          <input
            type="password"
            id="wd-signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "#000"
            }}
          />
          <br />

          <label
            htmlFor="wd-signup-verify-password"
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            Verify Password
          </label>
          <br />
          <input
            type="password"
            id="wd-signup-verify-password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "#000"
            }}
          />
          <br />

          <button
            id="wd-signup-btn"
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
