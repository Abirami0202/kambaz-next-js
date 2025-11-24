"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";

export default function Details() {
  const params = useParams();
  const uid = params?.uid as string | undefined;
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid || uid === "undefined") {
      console.log("No valid uid, skipping fetch");
      return;
    }
    try {
      const fetchedUser = await client.findUserById(uid);
      setUser(fetchedUser);
      setName(`${fetchedUser.firstName || ""} ${fetchedUser.lastName || ""}`);
      setEmail(fetchedUser.email || "");
      setRole(fetchedUser.role || "USER");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const deleteUser = async () => {
    if (!uid) return;
    try {
      await client.deleteUser(uid);
      router.push("/Kambaz/Account/Users");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const saveUser = async () => {
    if (!user) return;
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { 
      ...user, 
      firstName: firstName || "", 
      lastName: lastName || "",
      email: email,
      role: role
    };
    try {
      await client.updateUser(updatedUser);
      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [uid]);

  if (!uid || uid === "undefined" || !user) return null;

  return (
    <div
      className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow"
      style={{ width: "400px", zIndex: 1000, overflowY: "auto" }}
    >
      <button
        onClick={() => router.push("/Kambaz/Account/Users")}
        className="btn position-fixed end-0 top-0 wd-close-details"
        style={{ background: "none", border: "none" }}
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-5">
        <FaUserCircle className="text-secondary" style={{ fontSize: "80px" }} />
      </div>
      <hr />

      {/* Name Section */}
      <div className="text-danger fs-4 mb-3">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
            style={{ cursor: "pointer" }}
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
            style={{ cursor: "pointer" }}
          />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <Form.Control
            className="w-75 wd-edit-name mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>

      {/* Email Section */}
      <div className="mb-3">
        <b>Email:</b>
        {!editing && <span className="ms-2">{user.email}</span>}
        {editing && (
          <Form.Control
            className="mt-2 wd-edit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        )}
      </div>

      {/* Role Section */}
      <div className="mb-3">
        <b>Role:</b>
        {!editing && <span className="ms-2 wd-roles">{user.role}</span>}
        {editing && (
          <Form.Select
            className="mt-2 wd-edit-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
            <option value="TA">TA</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>
        )}
      </div>

      <div className="mb-2">
        <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
      </div>
      <div className="mb-2">
        <b>Section:</b> <span className="wd-section">{user.section}</span>
      </div>
      <div className="mb-2">
        <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
      </div>
      
      <hr />

      <div className="d-flex justify-content-between mt-4">
        <Button
          onClick={() => router.push("/Kambaz/Account/Users")}
          variant="secondary"
          className="wd-cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={deleteUser}
          variant="danger"
          className="wd-delete"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}