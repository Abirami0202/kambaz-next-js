"use client";

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { courses } = useSelector((state: any) => state.coursesReducer);

  // Extract course ID from pathname
  const courseIdMatch = pathname.match(/\/Courses\/([^\/]+)/);
  const courseId = courseIdMatch ? courseIdMatch[1] : null;

  // Find the course
  const course = courses.find((c: any) => c._id === courseId);

  // Determine current page
  const isDashboard = pathname.includes("/Dashboard");
  const isPeople = pathname.includes("/People");
  const isModules = pathname.includes("/Modules");
  const isAssignments = pathname.includes("/Assignments");
  const isHome = pathname.includes("/Home");
  const isPiazza = pathname.includes("/Piazza");
  const isZoom = pathname.includes("/Zoom");
  const isQuizzes = pathname.includes("/Quizzes");
  const isGrades = pathname.includes("/Grades");

  // Get the page name
  let pageName = "";
  if (isPeople) pageName = "People";
  else if (isModules) pageName = "Modules";
  else if (isAssignments) pageName = "Assignments";
  else if (isHome) pageName = "Home";
  else if (isPiazza) pageName = "Piazza";
  else if (isZoom) pageName = "Zoom";
  else if (isQuizzes) pageName = "Quizzes";
  else if (isGrades) pageName = "Grades";

  // Don't show breadcrumb if we're not on a relevant page
  if (!isDashboard && !courseId) {
    return null;
  }

  return (
    <div style={{ 
      padding: "1rem 1rem 0.5rem 1rem", 
      backgroundColor: "#f5f5f5",
      borderBottom: "1px solid #ddd"
    }}>
      {isDashboard && (
        <div style={{ fontSize: "14px", color: "#d41b2c" }}>
          Dashboard
        </div>
      )}
      
      {course && (
        <div style={{ fontSize: "14px" }}>
          <Link 
            href={`/Kambaz/Courses/${courseId}/Home`}
            style={{ color: "#d41b2c", textDecoration: "none" }}
          >
            {course.name}
          </Link>
          
          {pageName && (
            <span>
              <span style={{ margin: "0 0.5rem", color: "#666" }}>&gt;</span>
              <span style={{ color: "#000" }}>{pageName}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}