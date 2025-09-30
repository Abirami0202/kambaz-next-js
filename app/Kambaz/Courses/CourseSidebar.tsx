// app/Kambaz/Courses/CourseSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseSidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { label: "Home", href: "/Kambaz/Courses/Home", id: "wd-course-home-link" },
    { label: "Modules", href: "/Kambaz/Courses/Modules", id: "wd-course-modules-link" },
    { label: "Piazza", href: "/Kambaz/Courses/Piazza", id: "wd-course-piazza-link" },
    { label: "Zoom", href: "/Kambaz/Courses/Zoom", id: "wd-course-zoom-link" },
    { label: "Assignments", href: "/Kambaz/Courses/Assignments", id: "wd-course-assignments-link" },
    { label: "Quizzes", href: "/Kambaz/Courses/Quizzes", id: "wd-course-quizzes-link" },
    { label: "Grades", href: "/Kambaz/Courses/Grades", id: "wd-course-grades-link" },
    { label: "People", href: "/Kambaz/Courses/People", id: "wd-course-people-link" },
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