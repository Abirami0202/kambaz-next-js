"use client";

import AccountSidebar from "../Sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const router = useRouter();
  const [username, setUsername] = useState("abi");
  const [password, setPassword] = useState("123456");

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/Kambaz/Account/Profile");
  };

  return (
    <div style={{ display: "flex" }}>
      <AccountSidebar />
      <div style={{ flex: 1, padding: "2rem", color: "#000" }}>
        <h3 style={{ fontWeight: "bold", fontSize: "1.8rem", marginBottom: "1rem" }}>
          Sign in
        </h3>
        <form onSubmit={handleSignin}>
          <input
            id="wd-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "#000",
            }}
          />
          <input
            id="wd-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "#000",
            }}
          />
          <button
            id="wd-signin-btn"
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
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
