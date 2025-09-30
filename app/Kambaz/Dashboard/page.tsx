// app/Kambaz/Dashboard/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button } from "react-bootstrap";

const courses = [
  { 
    _id: "RS101", 
    name: "Rocket Propulsion", 
    number: "RS4550",
    description: "This course provides an in-depth study of rocket propulsion systems.",
    image: "/Courseimage.jpg"
  },
  { 
    _id: "RS102", 
    name: "Aerodynamics", 
    number: "RS4560",
    description: "Fundamentals of aerodynamics and flight mechanics.",
    image: "/Courseimage.jpg"
  },
  { 
    _id: "RS103", 
    name: "Spacecraft Design", 
    number: "RS4570",
    description: "Principles of spacecraft design and systems engineering.",
    image: "/Courseimage.jpg"
  },
  { 
    _id: "CS101", 
    name: "Introduction to JavaScript", 
    number: "CS1234",
    description: "Learn the fundamentals of JavaScript programming.",
    image: "/Courseimage.jpg"
  },
  { 
    _id: "CS102", 
    name: "React Fundamentals", 
    number: "CS2345",
    description: "Build modern web applications with React.",
    image: "/Courseimage.jpg"
  },
  { 
    _id: "CS103", 
    name: "Next.js Deep Dive", 
    number: "CS3456",
    description: "Master Next.js for full-stack development.",
    image: "/Courseimage.jpg"
  },
  { 
    _id: "CS104", 
    name: "Advanced Node.js", 
    number: "CS4567",
    description: "Build scalable backend applications with Node.js.",
    image: "/Courseimage.jpg"
  },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard" style={{ marginLeft: "140px", padding: "2rem" }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link 
                  href={`/Kambaz/Courses/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img 
                    variant="top" 
                    src={course.image} 
                    style={{ width: "100%", height: "160px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text 
                      className="wd-dashboard-course-description overflow-hidden" 
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
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