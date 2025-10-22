"use client";

import { ReactNode, use } from "react";
import CourseSidebar from "./CourseSidebar";
import { useSelector } from "react-redux";

export default function CourseLayout({ 
  children,
  params
}: { 
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = use(params);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((c: any) => c._id === cid);
  
  return (
    <div>
      <h2 className="text-danger" style={{ padding: "1rem", marginLeft: "140px" }}>
        {course && course.name} &gt; {/* This will show the course name */}
      </h2>
      <hr />
      <div style={{ display: "flex" }}>
        {/* Course Sidebar - Hidden on screens smaller than md (768px) */}
        <div className="d-none d-md-block">
          <CourseSidebar />
        </div>
        <main style={{ flex: 1, padding: "1rem", color: "#000" }}>
          {children}
        </main>
      </div>
    </div>
  );
}