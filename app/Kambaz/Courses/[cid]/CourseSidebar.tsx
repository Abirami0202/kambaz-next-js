"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const cid = params.cid as string;
  
  const navItems = [
    { label: "Home", href: `/Kambaz/Courses/${cid}/Home`, id: "wd-course-home-link" },
    { label: "Modules", href: `/Kambaz/Courses/${cid}/Modules`, id: "wd-course-modules-link" },
    { label: "Piazza", href: `/Kambaz/Courses/${cid}/Piazza`, id: "wd-course-piazza-link" },
    { label: "Zoom", href: `/Kambaz/Courses/${cid}/Zoom`, id: "wd-course-zoom-link" },
    { label: "Assignments", href: `/Kambaz/Courses/${cid}/Assignments`, id: "wd-course-assignments-link" },
    { label: "Quizzes", href: `/Kambaz/Courses/${cid}/Quizzes`, id: "wd-course-quizzes-link" },
    { label: "Grades", href: `/Kambaz/Courses/${cid}/Grades`, id: "wd-course-grades-link" },
    { label: "People", href: `/Kambaz/Courses/${cid}/People`, id: "wd-course-people-link" },
  ];

  return (
    <div
      id="wd-courses-navigation"
      style={{
        width: "200px",
        backgroundColor: "white",
        minHeight: "100vh",
        borderRight: "1px solid #ddd",
      }}
    >
      {navItems.map(({ label, href, id }) => {
        const isActive = pathname === href || pathname.includes(label);
        
        return (
          <Link
            key={href}
            href={href}
            id={id}
            style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: "red",
              textDecoration: "none",
              backgroundColor: "white",
              borderLeft: isActive ? "3px solid black" : "3px solid transparent",
              fontWeight: isActive ? "bold" : "normal",
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}