/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../../reducer";
import * as assignmentsClient from "../../client";

export default function AssignmentEditor() {
  const params = useParams();
  const router = useRouter();
  const cid = params.cid as string;
  const id = params.id as string;
  const dispatch = useDispatch();
  
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Check if user is faculty
  const isFaculty = currentUser?.role === "FACULTY";
  
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignment();
  }, [id]);

  const loadAssignment = async () => {
    try {
      if (id === "new") {
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
        setLoading(false);
      } else {
        const assignment = await assignmentsClient.fetchAssignmentById(id);
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
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error loading assignment:", error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (id === "new") {
        const { _id, ...assignmentWithoutId } = form;
        const newAssignment = await assignmentsClient.createAssignment(cid, assignmentWithoutId);
        dispatch(addAssignment(newAssignment));
      } else {
        const updatedAssignment = await assignmentsClient.updateAssignment(id, form);
        dispatch(updateAssignment(updatedAssignment));
      }
      router.push(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  if (loading) {
    return <div style={{ padding: "1rem" }}>Loading...</div>;
  }

  return (
    <div id="wd-assignments-editor" style={{ padding: "1rem", maxWidth: "800px" }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            disabled={!isFaculty}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            disabled={!isFaculty}
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
              disabled={!isFaculty}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-group">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select id="wd-group" disabled={!isFaculty}>
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
            <Form.Select id="wd-display-grade-as" disabled={!isFaculty}>
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
              <Form.Select id="wd-submission-type" className="mb-3" disabled={!isFaculty}>
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="External Tool">External Tool</option>
              </Form.Select>

              <div>
                <div className="fw-bold mb-2">Online Entry Options</div>
                <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" disabled={!isFaculty} />
                <Form.Check type="checkbox" id="wd-website-url" label="Website URL" disabled={!isFaculty} />
                <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" disabled={!isFaculty} />
                <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" disabled={!isFaculty} />
                <Form.Check type="checkbox" id="wd-file-upload" label="File Upload" disabled={!isFaculty} />
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
                  disabled={!isFaculty}
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
                      disabled={!isFaculty}
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
                      disabled={!isFaculty}
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
          {/* Only show Save button to FACULTY */}
          {isFaculty && (
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}