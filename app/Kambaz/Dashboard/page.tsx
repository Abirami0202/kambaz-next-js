/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCourses, addCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { FaPlus } from "react-icons/fa";
import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  
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

  // Redirect to signin if not logged in
  useEffect(() => {
    if (currentUser === null) {
      router.push('/Kambaz/Account/Signin');
    }
  }, [currentUser, router]);

  const fetchCourses = async () => {
    try {
      const courses = await coursesClient.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchEnrollments = async () => {
    if (!currentUser) return;
    try {
      const userEnrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
      setEnrollments(userEnrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);

  const addNewCourse = async () => {
    try {
      const { _id, ...courseWithoutId } = course;
      const newCourse = await coursesClient.createCourse(courseWithoutId);
      dispatch(addCourse(newCourse));
      
      // Auto-enroll faculty in their own course
      if (isFaculty && currentUser) {
        await enrollmentsClient.enrollInCourse(currentUser._id, newCourse._id);
        await fetchEnrollments();
      }
      
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
      dispatch(deleteCourse(courseId));
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
      const updatedCourse = await coursesClient.updateCourse(course);
      dispatch(updateCourse(updatedCourse));
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

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await enrollmentsClient.enrollInCourse(currentUser._id, courseId);
      await fetchEnrollments();
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await enrollmentsClient.unenrollFromCourse(currentUser._id, courseId);
      await fetchEnrollments();
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some(e => e.course === courseId);
  };

  // Don't render anything if user is not logged in
  if (!currentUser) {
    return null;
  }

  // Check if user is faculty
  const isFaculty = currentUser.role === "FACULTY";

  // Filter courses based on view mode
  const displayedCourses = showAllCourses 
    ? courses 
    : courses.filter((c: any) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard" style={{ marginLeft: "140px", padding: "2rem" }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Toggle Buttons */}
      <div className="mb-3">
        <Button
          variant={showAllCourses ? "primary" : "secondary"}
          className="me-2"
          onClick={() => setShowAllCourses(true)}
        >
          All Courses
        </Button>
        <Button
          variant={!showAllCourses ? "primary" : "secondary"}
          onClick={() => setShowAllCourses(false)}
        >
          My Courses
        </Button>
      </div>

      {/* Only show "New Course" button to FACULTY */}
      {!showForm && isFaculty && (
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

      {/* Only show form to FACULTY */}
      {showForm && isFaculty && (
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
        {showAllCourses ? "All Courses" : "My Courses"} ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((courseItem: any) => {
            const enrolled = isEnrolled(courseItem._id);
            
            return (
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
                      
                      {/* Show Enroll/Unenroll buttons ONLY in "All Courses" view */}
                      {showAllCourses && (
                        enrolled ? (
                          <Button
                            variant="danger"
                            className="float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              handleUnenroll(courseItem._id);
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            className="float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEnroll(courseItem._id);
                            }}
                          >
                            Enroll
                          </Button>
                        )
                      )}
                      
                      {/* Only show Edit/Delete buttons to FACULTY */}
                      {isFaculty && !showAllCourses && (
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
                            className="float-end"
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
            );
          })}
        </Row>
      </div>
    </div>
  );
}