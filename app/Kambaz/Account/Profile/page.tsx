// app/Kambaz/Account/Profile/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AccountSidebar from "../Sidebar";

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("abi03");
  const [firstName, setFirstName] = useState("Abirami");
  const [lastName, setLastName] = useState("Thirunavukkarasu");
  const [password, setPassword] = useState("pass123");
  const [dob, setDob] = useState("2000-01-01");
  const [email, setEmail] = useState("abirami@gmail.com");
  const [role, setRole] = useState("STUDENT");

  const handleSignout = () => {
    router.push("/Kambaz/Account/Signin");
  };

  return (
    <div style={{ display: "flex" }}>
      <AccountSidebar />
      <div id="wd-profile-screen" style={{ padding: "2rem", maxWidth: "400px" }}>
        <h3>Profile</h3>
        <Form>
          <Form.Control
            id="wd-username"
            defaultValue={username}
            className="mb-2"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            id="wd-password"
            defaultValue={password}
            type="password"
            className="mb-2"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control
            id="wd-firstname"
            defaultValue={firstName}
            className="mb-2"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Control
            id="wd-lastname"
            defaultValue={lastName}
            className="mb-2"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Form.Control
            id="wd-dob"
            defaultValue={dob}
            type="date"
            className="mb-2"
            onChange={(e) => setDob(e.target.value)}
          />
          <Form.Control
            id="wd-email"
            defaultValue={email}
            type="email"
            className="mb-2"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Select
            id="wd-role"
            defaultValue={role}
            className="mb-2"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
          <Button
            id="wd-signout-btn"
            onClick={handleSignout}
            variant="danger"
            className="w-100"
          >
            Sign out
          </Button>
        </Form>
      </div>
    </div>
  );
}