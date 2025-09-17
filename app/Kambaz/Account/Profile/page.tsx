"use client";

import AccountSidebar from "../Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();

  const [username, setUsername] = useState("abi03");
  const [firstName, setFirstName] = useState("Abirami");
  const [lastName, setLastName] = useState("Thiru");
  const [password, setPassword] = useState("pass123");
  const [dob, setDob] = useState("1990-01-01");
  const [email, setEmail] = useState("xyz@gmail.com");
  const [role, setRole] = useState("student");

  const roles = ["student", "teacher", "admin", "guest"];

  const handleSignout = () => {
    router.push("/Kambaz/Account/Signin");
  };

  return (
    <div style={{ display: "flex" }}>
      <AccountSidebar />
      <div style={{ flex: 1, paddingLeft: 20, color: "#000" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "1.8rem", marginBottom: "1rem" }}>
          Account Profile
        </h2>
        <form>
          <label htmlFor="wd-username" style={{ fontSize: "1rem", fontWeight: "bold" }}>Username</label><br />
          <input
            id="wd-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ fontSize: "1rem", padding: "0.4rem", marginBottom: "1rem", width: "100%" }}
          /><br />

          <label htmlFor="wd-firstname" style={{ fontSize: "1rem", fontWeight: "bold" }}>First Name</label><br />
          <input
            id="wd-firstname"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ fontSize: "1rem", padding: "0.4rem", marginBottom: "1rem", width: "100%" }}
          /><br />

          <label htmlFor="wd-lastname" style={{ fontSize: "1rem", fontWeight: "bold" }}>Last Name</label><br />
          <input
            id="wd-lastname"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ fontSize: "1rem", padding: "0.4rem", marginBottom: "1rem", width: "100%" }}
          /><br />

          <label htmlFor="wd-password" style={{ fontSize: "1rem", fontWeight: "bold" }}>Password</label><br />
          <input
            id="wd-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: "1rem", padding: "0.4rem", marginBottom: "1rem", width: "100%" }}
          /><br />

          <label htmlFor="wd-dob" style={{ fontSize: "1rem", fontWeight: "bold" }}>Date of Birth</label><br />
          <input
            id="wd-dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{ fontSize: "1rem", padding: "0.4rem", marginBottom: "1rem", width: "100%" }}
          /><br />

          <label htmlFor="wd-email" style={{ fontSize: "1rem", fontWeight: "bold" }}>Email</label><br />
          <input
            id="wd-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ fontSize: "1rem", padding: "0.4rem", marginBottom: "1rem", width: "100%" }}
          /><br />

          <label htmlFor="wd-role" style={{ fontSize: "1rem", fontWeight: "bold" }}>Role</label><br />
          <select
            id="wd-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ fontSize: "1rem", padding: "0.4rem", marginBottom: "1rem", width: "100%" }}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select><br />

          <button
            type="button"
            id="wd-signout-btn"
            onClick={handleSignout}
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
            Sign Out
          </button>
        </form>
        <br />
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#0070f3",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline"
          }}
        >
          Back to Kambaz Home
        </button>
      </div>
    </div>
  );
}
