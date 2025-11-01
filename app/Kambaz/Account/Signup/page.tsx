// app/Kambaz/Account/Signup/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import AccountSidebar from "../Sidebar";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("abirami");
  const [password, setPassword] = useState("abirami123");
  const [verifyPassword, setVerifyPassword] = useState("abirami123");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      alert("Passwords do not match!");
      return;
    }
    router.push("/Kambaz/Account/Profile");
  };

  return (
    <div style={{ display: "flex" }}>
      <AccountSidebar />
      <div id="wd-signup-screen" style={{ padding: "2rem", maxWidth: "400px" }}>
        <h1>Sign up</h1>
        <Form onSubmit={handleSignup}>
          <Form.Control
            id="wd-username"
            placeholder="username"
            className="mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            id="wd-password"
            placeholder="password"
            type="password"
            className="mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control
            id="wd-verify-password"
            placeholder="verify password"
            type="password"
            className="mb-2"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
          <Button
            id="wd-signup-btn"
            type="submit"
            variant="primary"
            className="w-100 mb-2"
          >
            Sign up
          </Button>
          <Link id="wd-signin-link" href="/Kambaz/Account/Signin">
            Sign in
          </Link>
        </Form>
      </div>
    </div>
  );
}