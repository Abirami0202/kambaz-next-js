// app/Kambaz/Courses/Assignments/[id]/page.tsx
"use client";

import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

// Remove the interface and params prop completely
export default function AssignmentEditor() {
  const [form, setForm] = React.useState({
    name: "A1 - ENV + HTML",
    description: "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.",
    points: 100,
    group: "ASSIGNMENTS",
    grade: "Points",
    submission: "Online",
    entryOptions: ["Text Entry", "Website URL", "File Upload"],
    assignTo: "Everyone",
    due: "2024-05-13",
    availableFrom: "2024-05-06",
    until: "2024-05-20",
  });

  const handleCheckbox = (option: string) => {
    setForm((prev) => ({
      ...prev,
      entryOptions: prev.entryOptions.includes(option)
        ? prev.entryOptions.filter((x) => x !== option)
        : [...prev.entryOptions, option],
    }));
  };

  return (
    <div id="wd-assignments-editor" style={{ padding: "1rem", maxWidth: "800px" }}>
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Form.Group>

        {/* Points */}
        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-points">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              id="wd-points"
              type="number"
              value={form.points}
              onChange={(e) => setForm({ ...form, points: +e.target.value })}
            />
          </Col>
        </Row>

        {/* Assignment Group */}
        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-group">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              id="wd-group"
              value={form.group}
              onChange={(e) => setForm({ ...form, group: e.target.value })}
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Display Grade As */}
        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-display-grade-as">
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              id="wd-display-grade-as"
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
            >
              <option value="Points">Points</option>
              <option value="Percentage">Percentage</option>
              <option value="Letter Grade">Letter Grade</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission Type */}
        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-submission-type">
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3">
              <Form.Select
                id="wd-submission-type"
                value={form.submission}
                onChange={(e) => setForm({ ...form, submission: e.target.value })}
                className="mb-3"
              >
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="External Tool">External Tool</option>
              </Form.Select>

              <div>
                <div className="fw-bold mb-2">Online Entry Options</div>
                <Form.Check
                  type="checkbox"
                  id="wd-text-entry"
                  label="Text Entry"
                  checked={form.entryOptions.includes("Text Entry")}
                  onChange={() => handleCheckbox("Text Entry")}
                />
                <Form.Check
                  type="checkbox"
                  id="wd-website-url"
                  label="Website URL"
                  checked={form.entryOptions.includes("Website URL")}
                  onChange={() => handleCheckbox("Website URL")}
                />
                <Form.Check
                  type="checkbox"
                  id="wd-media-recordings"
                  label="Media Recordings"
                  checked={form.entryOptions.includes("Media Recordings")}
                  onChange={() => handleCheckbox("Media Recordings")}
                />
                <Form.Check
                  type="checkbox"
                  id="wd-student-annotation"
                  label="Student Annotation"
                  checked={form.entryOptions.includes("Student Annotation")}
                  onChange={() => handleCheckbox("Student Annotation")}
                />
                <Form.Check
                  type="checkbox"
                  id="wd-file-upload"
                  label="File Upload"
                  checked={form.entryOptions.includes("File Upload")}
                  onChange={() => handleCheckbox("File Upload")}
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Assign To */}
        <Row className="mb-3">
          <Form.Label column sm={3} className="text-end" htmlFor="wd-assign-to">
            Assign
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3">
              <Form.Label htmlFor="wd-assign-to" className="fw-bold">
                Assign to
              </Form.Label>
              <Form.Control
                id="wd-assign-to"
                value={form.assignTo}
                onChange={(e) => setForm({ ...form, assignTo: e.target.value })}
              />

              <Form.Group className="mt-3">
                <Form.Label htmlFor="wd-due-date" className="fw-bold">
                  Due
                </Form.Label>
                <Form.Control
                  id="wd-due-date"
                  type="date"
                  value={form.due}
                  onChange={(e) => setForm({ ...form, due: e.target.value })}
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
                      value={form.until}
                      onChange={(e) => setForm({ ...form, until: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr />
        <div className="d-flex justify-content-end">
          <Link href="/Kambaz/Courses/Assignments">
            <Button variant="secondary" className="me-2">
              Cancel
            </Button>
          </Link>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}