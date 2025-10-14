"use client";

import Link from "next/link";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, ListGroup, Form } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

export default function Assignments() {
  const params = useParams();
  const cid = params.cid as string;
  
  // Filter assignments for the current course
  const courseAssignments = db.assignments.filter(
    (assignment: any) => assignment.course === cid
  );

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
        {courseAssignments.map((assignment: any) => (
          <ListGroup.Item
            key={assignment._id}
            className="wd-assignment-list-item p-3"
            style={{ borderLeft: "3px solid green" }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <BsGripVertical className="me-2 fs-5" />
                <Link
                  href={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}/Editor`}
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