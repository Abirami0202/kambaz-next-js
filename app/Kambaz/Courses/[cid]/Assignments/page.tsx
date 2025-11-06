/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, ListGroup, Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import * as coursesClient from "../../client";
import * as assignmentsClient from "./client";
import { useEffect } from "react";

export default function Assignments() {
  const params = useParams();
  const router = useRouter();
  const cid = params.cid as string;
  const dispatch = useDispatch();
  
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  // Fetch assignments from server when course changes
  const fetchAssignments = async () => {
    try {
      const assignments = await coursesClient.findAssignmentsForCourse(cid);
      dispatch(setAssignments(assignments));
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);
  
  // Filter assignments for the current course
  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  const handleAddAssignment = () => {
    router.push(`/Kambaz/Courses/${cid}/Assignments/new/Editor`);
  };

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
        <Button 
          variant="danger" 
          className="me-2 float-end" 
          id="wd-add-assignment"
          onClick={handleAddAssignment}
        >
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
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> {assignment.availableFrom} |
                </div>
                <div className="text-muted small">
                  <strong>Due</strong> {assignment.dueDate} | {assignment.points} <strong>pts</strong>
                </div>
              </div>
              <div className="float-end">
                <FaTrash
                  className="text-danger me-3"
                  onClick={() => handleDeleteAssignment(assignment._id)}
                  style={{ cursor: "pointer" }}
                  title="Delete Assignment"
                />
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