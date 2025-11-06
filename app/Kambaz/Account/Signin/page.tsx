"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import AccountSidebar from "../Sidebar";
import * as client from "../client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";

export default function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      router.push("/Kambaz/Dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to login");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AccountSidebar />
      <div id="wd-signin-screen" style={{ padding: "2rem", maxWidth: "400px" }}>
        <h1>Sign in</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSignin}>
          <Form.Control
            id="wd-username"
            placeholder="username"
            className="mb-2"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <Form.Control
            id="wd-password"
            placeholder="password"
            type="password"
            className="mb-2"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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