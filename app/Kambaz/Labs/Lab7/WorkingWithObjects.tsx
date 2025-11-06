"use client";

import React, { useState } from "react";
import { Form } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  return (
    <div id="wd-working-with-objects" className="mb-4">
      <h3>Working With Objects</h3>

      <h4>Retrieving Objects</h4>
      
        <a id="wd-retrieve-assignments"
        className="btn btn-primary mb-3"
        href={ASSIGNMENT_API_URL}
      >
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      
        <a id="wd-retrieve-assignment-title"
        className="btn btn-primary mb-3"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      <h4>Modifying Properties</h4>
      
        <a id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <Form.Control
        className="w-75 mb-3"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <div className="clearfix"></div>

      
        <a id="wd-update-assignment-score"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <Form.Control
        className="w-75 mb-3"
        id="wd-assignment-score"
        type="number"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <div className="clearfix"></div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-assignment-completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-assignment-completed">
          Completed
        </label>
        
          <a id="wd-update-assignment-completed"
          className="btn btn-primary ms-3"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>
      <hr />

      <h4>Working with Module Object</h4>
      
        <a id="wd-retrieve-module"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/module`}
      >
        Get Module
      </a>
      
        <a id="wd-retrieve-module-name"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>

      <hr />
    </div>
  );
}