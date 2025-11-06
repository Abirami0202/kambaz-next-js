"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import AccountSidebar from "../Sidebar";
import * as client from "../client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "STUDENT"
  });
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password !== verifyPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Kambaz/Account/Profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to sign up");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AccountSidebar />
      <div id="wd-signup-screen" style={{ padding: "2rem", maxWidth: "400px" }}>
        <h1>Sign up</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSignup}>
          <Form.Control
            id="wd-username"
            placeholder="username"
            className="mb-2"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <Form.Control
            id="wd-password"
            placeholder="password"
            type="password"
            className="mb-2"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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