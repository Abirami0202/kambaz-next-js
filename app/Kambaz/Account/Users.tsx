"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import Details from "./Users/Details";
import * as client from "./client";

export default function Users() {
  const params = useParams();
  const uid = params?.uid as string | undefined;
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    try {
      const users = await client.findAllUsers();
      console.log("Fetched users:", users);
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "2rem", position: "relative" }}>
      {uid && <Details />}
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Users</h3>
        <Button onClick={createUser} variant="danger" className="wd-add-people">
          <FaPlus className="me-2" />
          People
        </Button>
      </div>

      <div className="d-flex mb-3">
        <Form.Control
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="me-2 wd-filter-by-name"
          style={{ width: "300px" }}
        />
        <Form.Select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="wd-select-role"
          style={{ width: "200px" }}
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </Form.Select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <Link 
                  href={`/Kambaz/Account/Users/${user._id}`}
                  className="text-decoration-none"
                >
                  <FaUserCircle className="me-2 fs-4 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </Link>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}