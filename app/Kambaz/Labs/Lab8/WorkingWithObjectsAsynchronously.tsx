"use client";

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import * as client from "./lab8-client";  // Changed from "./client"

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  const fetchAssignment = async () => {
    const assignment = await client.fetchAssignment();
    setAssignment(assignment);
  };

  const updateTitle = async (title: string) => {
    const updatedAssignment = await client.updateTitle(title);
    setAssignment(updatedAssignment);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects" className="mb-4">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <Form.Control
        value={assignment.title || ""}
        className="mb-2"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        id="wd-async-assignment-title"
      />
      <Form.Control
        as="textarea"
        rows={3}
        value={assignment.description || ""}
        className="mb-2"
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
        id="wd-async-assignment-description"
      />
      <Form.Control
        type="date"
        className="mb-2"
        value={assignment.due || ""}
        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
        id="wd-async-assignment-due"
      />
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-async-assignment-completed"
          checked={assignment.completed || false}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label
          className="form-check-label"
          htmlFor="wd-async-assignment-completed"
        >
          Completed
        </label>
      </div>
      <button
        className="btn btn-primary me-2"
        onClick={() => updateTitle(assignment.title)}
        id="wd-update-assignment-title-click"
      >
        Update Title
      </button>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}