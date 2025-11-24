/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import PeopleDetails from "./Details";
import * as enrollmentsClient from "../../../Enrollments/client";
import * as usersClient from "../../../Account/client";

export default function PeopleTable() {
  const params = useParams();
  const cid = params.cid as string;
  
  const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchEnrolledUsers();
  }, [cid]);

  const fetchEnrolledUsers = async () => {
    try {
      // Get user IDs enrolled in this course
      const userIds = await enrollmentsClient.findUsersForCourse(cid);
      
      // Fetch all users
      const allUsers = await usersClient.findAllUsers();
      
      // Filter to only enrolled users
      const enrolled = allUsers.filter((user: any) => userIds.includes(user._id));
      setEnrolledUsers(enrolled);
    } catch (error) {
      console.error("Error fetching enrolled users:", error);
    }
  };

  return (
    <div id="wd-people-table" style={{ padding: "1rem" }}>
      <PeopleDetails />
      
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
          {enrolledUsers.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <Link 
                  href={`/Kambaz/Courses/${cid}/People/${user._id}`}
                  className="text-decoration-none"
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
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
      </Table>
    </div>
  );
}