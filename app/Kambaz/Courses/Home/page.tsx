// app/Kambaz/Courses/Home/page.tsx
"use client";

import Modules from "../Modules/page";
import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { FaBell, FaChartBar, FaBullhorn } from "react-icons/fa";

export default function Home() {
  return (
    <div id="wd-home" style={{ display: "flex", padding: "1rem" }}>
      {/* Modules - 70% width */}
      <div style={{ flex: "0 0 70%", paddingRight: "1rem" }}>
        <Modules />
      </div>

      {/* Course Status - 30% width, hidden on smaller screens */}
      <div 
        id="wd-course-status" 
        className="d-none d-xl-block"
        style={{ flex: "0 0 30%", minWidth: "300px" }}
      >
        <h2>Course Status</h2>
        <div className="d-flex mb-3">
          <div className="w-50 pe-1">
            <Button variant="secondary" size="lg" className="w-100 text-nowrap">
              <MdDoNotDisturbAlt className="me-2 fs-5" />
              Unpublish
            </Button>
          </div>
          <div className="w-50">
            <Button variant="success" size="lg" className="w-100">
              <FaCheckCircle className="me-2 fs-5" />
              Publish
            </Button>
          </div>
        </div>
        
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <BiImport className="me-2 fs-5" />
          Import Existing Content
        </Button>
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <LiaFileImportSolid className="me-2 fs-5" />
          Import from Commons
        </Button>
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          Choose Home Page
        </Button>
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          View Course Stream
        </Button>
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <FaBullhorn className="me-2 fs-5" />
          New Announcement
        </Button>
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <FaChartBar className="me-2 fs-5" />
          New Analytics
        </Button>
        <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
          <FaBell className="me-2 fs-5" />
          View Course Notifications
        </Button>
      </div>
    </div>
  );
}