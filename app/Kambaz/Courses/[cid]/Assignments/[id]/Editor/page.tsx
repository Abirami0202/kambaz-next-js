/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../../reducer";
import * as coursesClient from "@/app/Kambaz/Courses/client";
import * as assignmentsClient from "@/app/Kambaz/Courses/[cid]/Assignments/client";

export default function AssignmentEditor() {
  const params = useParams();
  const router = useRouter();
  const cid = params.cid as string;
  const id = params.id as string;  // Using 'id' not 'aid'
  const dispatch = useDispatch();
  
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const assignment = assignments.find((a: any) => a._id === id);
  
  const [form, setForm] = useState({
    _id: "",
    title: "",
    description: "The assignment is available online.",
    points: 100,
    course: cid,
    availableFrom: "",
    availableUntil: "",
    dueDate: "",
  });

  useEffect(() => {
    if (assignment) {
      setForm({
        _id: assignment._id,
        title: assignment.title || "",
        description: assignment.description || "The assignment is available online.",
        points: assignment.points || 100,
        course: assignment.course || cid,
        availableFrom: assignment.availableFrom || "",
        availableUntil: assignment.availableUntil || "",
        dueDate: assignment.dueDate || "",
      });
    } else if (id === "new") {
      setForm({
        _id: "",
        title: "New Assignment",
        description: "New Assignment Description",
        points: 100,
        course: cid,
        availableFrom: new Date().toISOString().split('T')[0],
        availableUntil: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [assignment, id, cid]);

  const handleSave = async () => {
    try {
      if (id === "new" || !form._id) {
        // Creating new assignment - use course route
        const newAssignment = await coursesClient.createAssignmentForCourse(cid, form);
        dispatch(addAssignment(newAssignment));
      } else {
        // Updating existing assignment - use assignment route
        const updatedAssignment = await assignmentsClient.updateAssignment(form);
        dispatch(updateAssignment(updatedAssignment));
      }
      router.push(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment");
    }
  };

  return (
    <div id="wd-assignments-editor" style={{ padding: "1rem", maxWidth: "800px" }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-points">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              id="wd-points"
              type="number"
              value={form.points}
              onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-group">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-display-grade-as">
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-display-grade-as">
              <option value="Points">Points</option>
              <option value="Percentage">Percentage</option>
              <option value="Letter Grade">Letter Grade</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-submission-type">
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3">
              <Form.Select id="wd-submission-type" className="mb-3">
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="External Tool">External Tool</option>
              </Form.Select>

              <div>
                <div className="fw-bold mb-2">Online Entry Options</div>
                <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
                <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
                <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
                <Form.Check type="checkbox" id="wd-file-upload" label="File Upload" />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-assign-to">
            Assign
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3">
              <Form.Label htmlFor="wd-assign-to" className="fw-bold">
                Assign to
              </Form.Label>
              <Form.Control id="wd-assign-to" value="Everyone" readOnly />

              <Form.Group className="mt-3">
                <Form.Label htmlFor="wd-due-date" className="fw-bold">
                  Due
                </Form.Label>
                <Form.Control
                  id="wd-due-date"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label htmlFor="wd-available-from" className="fw-bold">
                      Available from
                    </Form.Label>
                    <Form.Control
                      id="wd-available-from"
                      type="date"
                      value={form.availableFrom}
                      onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label htmlFor="wd-available-until" className="fw-bold">
                      Until
                    </Form.Label>
                    <Form.Control
                      id="wd-available-until"
                      type="date"
                      value={form.availableUntil}
                      onChange={(e) => setForm({ ...form, availableUntil: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr />
        <div className="d-flex justify-content-end">
          <Link href={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary" className="me-2">
              Cancel
            </Button>
          </Link>
          {currentUser?.role === "FACULTY" && (
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}