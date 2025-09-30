// app/Kambaz/Courses/Assignments/page.tsx
"use client";

import Link from "next/link";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, ListGroup, Form } from "react-bootstrap";

const assignments = [
  {
    _id: "A101",
    title: "A1 - ENV + HTML",
    course: "RS101",
    availableFrom: "2024-05-06",
    availableUntil: "2024-05-13",
    dueDate: "2024-05-13",
    points: 100,
  },
  {
    _id: "A102",
    title: "A2 - CSS + BOOTSTRAP",
    course: "RS101",
    availableFrom: "2024-05-13",
    availableUntil: "2024-05-20",
    dueDate: "2024-05-20",
    points: 100,
  },
  {
    _id: "A103",
    title: "A3 - JAVASCRIPT + REACT",
    course: "RS101",
    availableFrom: "2024-05-20",
    availableUntil: "2024-05-27",
    dueDate: "2024-05-27",
    points: 100,
  },
];

export default function Assignments() {
  return (
    <div id="wd-assignments" style={{ padding: "1rem" }}>
      {/* Controls */}
      <div className="mb-3">
        <div className="input-group mb-3" style={{ maxWidth: "300px" }}>
          <span className="input-group-text">
            <FaMagnifyingGlass />
          </span>
          <Form.Control
            id="wd-search-assignment"
            placeholder="Search for Assignments"
          />
        </div>
        <Button variant="secondary" className="me-2 float-end" id="wd-add-assignment">
          <BsPlus className="fs-4" />
          Assignment
        </Button>
        <Button variant="secondary" className="me-2 float-end" id="wd-add-assignment-group">
          <BsPlus className="fs-4" />
          Group
        </Button>
      </div>

      <br /><br />

      {/* Assignments List */}
      <div className="border p-3 mb-3">
        <h3 id="wd-assignments-title">
          <BsGripVertical className="me-2" />
          ASSIGNMENTS 40% of Total
          <BsPlus className="float-end fs-3" />
        </h3>
      </div>

      <ListGroup id="wd-assignment-list" className="rounded-0">
        {assignments.map((assignment) => (
          <ListGroup.Item
            key={assignment._id}
            className="wd-assignment-list-item p-3"
            style={{ borderLeft: "3px solid green" }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <BsGripVertical className="me-2 fs-5" />
                <Link
                  href={`/Kambaz/Courses/Assignments/${assignment._id}/Editor`}
                  className="wd-assignment-link text-dark fw-bold"
                  style={{ textDecoration: "none" }}
                >
                  {assignment.title}
                </Link>
                <div className="text-muted small mt-1">
                  <span className="text-danger">Multiple Modules</span> | Not available until {assignment.availableFrom} |
                </div>
                <div className="text-muted small">
                  Due {assignment.dueDate} | {assignment.points} pts
                </div>
              </div>
              <div className="float-end">
                <FaCheckCircle className="text-success me-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}