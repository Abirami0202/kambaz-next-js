"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import * as client from "../../../Account/client";

export default function PeopleDetails() {
  const params = useParams();
  const uid = params?.uid as string | undefined;
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid || uid === "undefined") {
      console.log("No valid uid, skipping fetch");
      return;
    }
    try {
      const user = await client.findUserById(uid);
      setUser(user);
      setName(`${user.firstName} ${user.lastName}`);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const deleteUser = async (uid: string) => {
    try {
      await client.deleteUser(uid);
      router.back();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
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

  if (!uid || uid === "undefined") return null;

  return (
    <div
      className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow"
      style={{ width: "400px", zIndex: 1000 }}
    >
      <button
        onClick={() => router.back()}
        className="btn position-fixed end-0 top-0 wd-close-details"
        style={{ background: "none", border: "none" }}
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary fs-1" />
      </div>
      <hr />

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
            onClick={() => saveUser()}
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
            className="w-75 wd-edit-name"
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

      <div className="mb-2">
        <b>Roles:</b> <span className="wd-roles">{user.role}</span>
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

      <Button
        onClick={() => router.back()}
        variant="secondary"
        className="float-start me-2 wd-cancel"
      >
        Cancel
      </Button>
      <Button
        onClick={() => deleteUser(uid)}
        variant="danger"
        className="float-end wd-delete"
      >
        Delete
      </Button>
    </div>
  );
}