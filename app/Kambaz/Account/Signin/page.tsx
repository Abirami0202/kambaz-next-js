// app/Kambaz/Account/Signin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import AccountSidebar from "../Sidebar";

export default function Signin() {
  const router = useRouter();
  const [username, setUsername] = useState("abirami");
  const [password, setPassword] = useState("abirami123");

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/Kambaz/Account/Profile");
  };

  return (
    <div style={{ display: "flex" }}>
      <AccountSidebar />
      <div id="wd-signin-screen" style={{ padding: "2rem", maxWidth: "400px" }}>
        <h1>Sign in</h1>
        <Form onSubmit={handleSignin}>
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
          <Button
            id="wd-signin-btn"
            type="submit"
            variant="primary"
            className="w-100 mb-2"
          >
            Sign in
          </Button>
          <Link id="wd-signup-link" href="/Kambaz/Account/Signup">
            Sign up
          </Link>
        </Form>
      </div>
    </div>
  );
}