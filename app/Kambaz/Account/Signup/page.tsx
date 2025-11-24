"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import * as client from "../client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const user = await client.signup({ username, password });
      dispatch(setCurrentUser(user));
      router.push("/Kambaz/Account/Profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to signup");
    }
  };

  return (
    <div id="wd-signup-screen" style={{ padding: "2rem", maxWidth: "400px" }}>
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
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
  );
}