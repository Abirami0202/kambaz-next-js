/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { FaPlus } from "react-icons/fa";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [course, setCourse] = useState({
    _id: "",
    name: "New Course",
    number: "New Number",
    startDate: "2024-01-10",
    endDate: "2024-05-15",
    department: "CS",
    credits: 4,
    description: "New Description",
  });

  const addNewCourse = () => {
    dispatch(addCourse(course));
    setCourse({
      _id: "",
      name: "New Course",
      number: "New Number",
      startDate: "2024-01-10",
      endDate: "2024-05-15",
      department: "CS",
      credits: 4,
      description: "New Description",
    });
    setShowForm(false);
    setIsEditing(false);
  };

  const removeCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const editCourse = (courseToEdit: any) => {
    setCourse(courseToEdit);
    setShowForm(true);
    setIsEditing(true);
  };

  const saveUpdatedCourse = () => {
    dispatch(updateCourse(course));
    setCourse({
      _id: "",
      name: "New Course",
      number: "New Number",
      startDate: "2024-01-10",
      endDate: "2024-05-15",
      department: "CS",
      credits: 4,
      description: "New Description",
    });
    setShowForm(false);
    setIsEditing(false);
  };

  const cancelForm = () => {
    setCourse({
      _id: "",
      name: "New Course",
      number: "New Number",
      startDate: "2024-01-10",
      endDate: "2024-05-15",
      department: "CS",
      credits: 4,
      description: "New Description",
    });
    setShowForm(false);
    setIsEditing(false);
  };

  return (
    <div id="wd-dashboard" style={{ marginLeft: "140px", padding: "2rem" }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* New Course Button - Only show if form is hidden */}
      {!showForm && (
        <div className="mb-4">
          <Button
            variant="danger"
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
            }}
          >
            <FaPlus className="me-2" />
            New Course
          </Button>
        </div>
      )}

      {/* Course Form - Only show when showForm is true */}
      {showForm && (
        <div className="mb-4 border p-4 rounded">
          <h5 className="mb-3">
            {isEditing ? "Edit Course" : "New Course"}
            <Button 
              variant="danger" 
              className="float-end"
              onClick={isEditing ? saveUpdatedCourse : addNewCourse}
              id={isEditing ? "wd-update-course-click" : "wd-add-new-course-click"}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
            <Button 
              variant="secondary" 
              className="float-end me-2"
              onClick={cancelForm}
            >
              Cancel
            </Button>
          </h5>
          <br /><br />
          
          <input
            className="form-control mb-2"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <input
            className="form-control mb-2"
            value={course.number}
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
            placeholder="Course Number"
          />
          <input
            className="form-control mb-2"
            type="date"
            value={course.startDate}
            onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
          />
          <input
            className="form-control mb-2"
            type="date"
            value={course.endDate}
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            placeholder="Description"
            rows={3}
          />
        </div>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((courseItem: any) => (
            <Col key={courseItem._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Kambaz/Courses/${courseItem._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src="/Courseimage.jpg"
                    style={{ width: "100%", height: "160px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {courseItem.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {courseItem.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                    
                    <Button
                      variant="warning"
                      className="float-end me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        editCourse(courseItem);
                      }}
                      id="wd-edit-course-click"
                    >
                      Edit
                    </Button>
                    
                    <Button
                      variant="danger"
                      className="float-end"
                      onClick={(e) => {
                        e.preventDefault();
                        removeCourse(courseItem._id);
                      }}
                      id="wd-delete-course-click"
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}