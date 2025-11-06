/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCourses, addCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import * as coursesClient from "../Courses/client";
import * as accountClient from "../Account/client";
import { FaPlus } from "react-icons/fa";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  
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

  // Fetch courses based on enrollment toggle
  const fetchCourses = async () => {
    try {
      if (showAllCourses) {
        // Show all courses
        const allCourses = await coursesClient.fetchAllCourses();
        const enrolledCourses = await accountClient.findCoursesForUser(currentUser._id);
        
        // Mark which courses user is enrolled in
        const coursesWithEnrollment = allCourses.map((c: any) => ({
          ...c,
          enrolled: enrolledCourses.some((ec: any) => ec._id === c._id) || false
        }));
        
        dispatch(setCourses(coursesWithEnrollment));
      } else {
        // Show only enrolled courses
        const enrolledCourses = await accountClient.findCoursesForUser(currentUser._id);
        const coursesWithFlag = enrolledCourses.map((c: any) => ({
          ...c,
          enrolled: true
        }));
        dispatch(setCourses(coursesWithFlag));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser, showAllCourses]);

  const addNewCourse = async () => {
    console.log("Current User:", currentUser);
    console.log("Current User ID:", currentUser._id);
    
    try {
      const newCourse = await coursesClient.createCourse(course);
      console.log("New Course Created:", newCourse);
      
      // Auto-enroll the faculty member in their new course
      await accountClient.enrollInCourse(currentUser._id, newCourse._id);
      console.log("Enrollment successful!");
      
      // After creating and enrolling, refresh courses to get updated list
      await fetchCourses();
      
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
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const removeCourse = async (courseId: string) => {
    try {
      await coursesClient.deleteCourse(courseId);
      await fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const editCourse = (courseToEdit: any) => {
    setCourse(courseToEdit);
    setShowForm(true);
    setIsEditing(true);
  };

  const saveUpdatedCourse = async () => {
    try {
      await coursesClient.updateCourse(course);
      await fetchCourses();
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
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (enrolled) {
        // Unenroll
        await accountClient.unenrollFromCourse(currentUser._id, courseId);
        alert("Unenrolled successfully!");
      } else {
        // Enroll
        await accountClient.enrollInCourse(currentUser._id, courseId);
        alert("Enrolled successfully!");
      }
      
      // Refresh courses after enrollment change
      await fetchCourses();
    } catch (error) {
      console.error("Error updating enrollment:", error);
      alert("Enrollment failed!");
    }
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

  if (!currentUser) {
    return <div>Please sign in to view dashboard.</div>;
  }

  return (
    <div id="wd-dashboard" style={{ marginLeft: "140px", padding: "2rem" }}>
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button 
          variant="primary" 
          className="float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Courses" : "Show All Courses"}
        </Button>
      </h1>
      <hr />

      {/* New Course Button - Only show for FACULTY and when not showing all courses */}
      {!showForm && !showAllCourses && currentUser.role === "FACULTY" && (
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

      {/* Course Form */}
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

      <h2 id="wd-dashboard-published">
        {showAllCourses ? `All Courses (${courses.length})` : `Enrolled Courses (${courses.length})`}
      </h2>
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
                    
                    {/* Show enrollment buttons when viewing all courses */}
                    {showAllCourses && (
                      <Button
                        variant={courseItem.enrolled ? "danger" : "success"}
                        className="float-end"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnrollment(courseItem._id, courseItem.enrolled);
                        }}
                      >
                        {courseItem.enrolled ? "Unenroll" : "Enroll"}
                      </Button>
                    )}
                    
                    {/* Show edit/delete buttons only for FACULTY and only on My Courses view */}
                    {!showAllCourses && currentUser.role === "FACULTY" && (
                      <>
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
                          className="float-end me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            removeCourse(courseItem._id);
                          }}
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                      </>
                    )}
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