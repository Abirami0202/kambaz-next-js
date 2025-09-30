// app/Kambaz/Courses/People/page.tsx
"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const users = [
  {
    _id: "1",
    firstName: "Abirami",
    lastName: "Thirunavukkarasu",
    loginId: "001234561S",
    section: "S101",
    role: "STUDENT",
    lastActivity: "2020-10-01",
    totalActivity: "10:21:32",
  },
  {
    _id: "2",
    firstName: "Malar",
    lastName: "Krishnan",
    loginId: "001234562S",
    section: "S101",
    role: "STUDENT",
    lastActivity: "2020-10-02",
    totalActivity: "12:15:20",
  },
  {
    _id: "3",
    firstName: "Vimal",
    lastName: "Kumar",
    loginId: "001234563S",
    section: "S102",
    role: "STUDENT",
    lastActivity: "2020-10-03",
    totalActivity: "08:45:10",
  },
  {
    _id: "4",
    firstName: "Arun",
    lastName: "Raj",
    loginId: "001234564S",
    section: "S101",
    role: "TA",
    lastActivity: "2020-10-04",
    totalActivity: "15:30:45",
  },
];

export default function PeopleTable() {
  return (
    <div id="wd-people-table" style={{ padding: "1rem" }}>
      <Table striped>
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
          {users.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}