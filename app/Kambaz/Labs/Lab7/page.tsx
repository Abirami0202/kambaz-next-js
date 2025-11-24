"use client";

import { useEffect, useState } from "react";
import { Container, Form, Button, ListGroup, Alert } from "react-bootstrap";

export default function Lab7() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState("");

  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

  // Test database connection
  const testConnection = async () => {
    try {
      const response = await fetch(`${HTTP_SERVER}/api/test-db`);
      const data = await response.json();
      setMessage(data.message || "Database connected successfully!");
      setError("");
    } catch (err: any) {
      setError("Failed to connect to database");
      setMessage("");
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${HTTP_SERVER}/api/users`);
      const data = await response.json();
      setUsers(data);
      setError("");
    } catch (err: any) {
      setError("Failed to fetch users");
    }
  };

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await fetch(`${HTTP_SERVER}/api/courses`);
      const data = await response.json();
      setCourses(data);
      setError("");
    } catch (err: any) {
      setError("Failed to fetch courses");
    }
  };

  // Fetch modules for a course
  const fetchModules = async (courseId: string) => {
    try {
      const response = await fetch(`${HTTP_SERVER}/api/courses/${courseId}/modules`);
      const data = await response.json();
      setModules(data);
      setError("");
    } catch (err: any) {
      setError("Failed to fetch modules");
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Container id="wd-lab7">
      <h2>Lab 7 - MongoDB Integration</h2>
      <p>This lab demonstrates integration with MongoDB database</p>

      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <hr />

      {/* Section 1: Database Connection Test */}
      <div className="mb-4">
        <h3>1. Database Connection Test</h3>
        <Button onClick={testConnection} variant="primary">
          Test MongoDB Connection
        </Button>
      </div>

      <hr />

      {/* Section 2: Retrieving All Documents */}
      <div className="mb-4">
        <h3>2. Retrieving All Users</h3>
        <Button onClick={fetchUsers} variant="primary" className="mb-3">
          Fetch All Users
        </Button>
        <ListGroup>
          {users.slice(0, 5).map((user) => (
            <ListGroup.Item key={user._id}>
              <strong>{user.firstName} {user.lastName}</strong> - {user.email} ({user.role})
            </ListGroup.Item>
          ))}
        </ListGroup>
        {users.length > 5 && <p className="mt-2">Showing 5 of {users.length} users</p>}
      </div>

      <hr />

      {/* Section 3: Retrieving All Courses */}
      <div className="mb-4">
        <h3>3. Retrieving All Courses</h3>
        <Button onClick={fetchCourses} variant="primary" className="mb-3">
          Fetch All Courses
        </Button>
        <ListGroup>
          {courses.map((course) => (
            <ListGroup.Item key={course._id}>
              <strong>{course.name}</strong> ({course.number}) - {course.credits} credits
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <hr />

      {/* Section 4: One-to-Many Relationship */}
      <div className="mb-4">
        <h3>4. One-to-Many Relationship (Course → Modules)</h3>
        <Form.Group className="mb-3">
          <Form.Label>Select a Course:</Form.Label>
          <Form.Select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              if (e.target.value) {
                fetchModules(e.target.value);
              } else {
                setModules([]);
              }
            }}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {modules.length > 0 && (
          <>
            <h5>Modules for Selected Course:</h5>
            <ListGroup>
              {modules.map((module) => (
                <ListGroup.Item key={module._id}>
                  {module.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </div>

      <hr />

      {/* Section 5: Database Operations Summary */}
      <div className="mb-4">
        <h3>5. Database Operations Summary</h3>
        <ul>
          <li><strong>Create:</strong> Insert new documents using <code>model.create()</code></li>
          <li><strong>Read:</strong> Retrieve documents using <code>model.find()</code> and <code>model.findById()</code></li>
          <li><strong>Update:</strong> Modify documents using <code>model.updateOne()</code></li>
          <li><strong>Delete:</strong> Remove documents using <code>model.deleteOne()</code></li>
        </ul>
      </div>

      <hr />

      {/* Section 6: Mongoose Concepts */}
      <div className="mb-4">
        <h3>6. Mongoose Concepts Demonstrated</h3>
        <ul>
          <li><strong>Schemas:</strong> Define document structure and validation</li>
          <li><strong>Models:</strong> Provide interface for database operations</li>
          <li><strong>DAOs:</strong> Data Access Objects wrap model operations</li>
          <li><strong>Relationships:</strong> One-to-Many using references (course → modules)</li>
          <li><strong>Populate:</strong> Load referenced documents automatically</li>
        </ul>
      </div>
    </Container>
  );
}