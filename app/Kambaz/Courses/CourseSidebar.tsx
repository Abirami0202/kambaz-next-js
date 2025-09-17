'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseSidebar() {
  const pathname = usePathname();
  const navItems = [
    { label: "Home", href: "/Kambaz/Courses/Home" },
    { label: "Modules", href: "/Kambaz/Courses/Modules" },
    { label: "Piazza", href: "/Kambaz/Courses/Piazza" },
    { label: "Zoom", href: "/Kambaz/Courses/Zoom" },
    { label: "Quizzes", href: "/Kambaz/Courses/Quizzes" },
    { label: "Assignments", href: "/Kambaz/Courses/Assignments" },
    { label: "Grades", href: "/Kambaz/Courses/Grades" },
  ];

  return (
    <nav
      style={{
        width: 200,
        borderRight: "1px solid #ddd",
        padding: "1rem",
        height: "100vh",
        boxSizing: "border-box",
        backgroundColor: "#f0f0f0",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {navItems.map(({ label, href }) => (
          <li key={label} style={{ marginBottom: "0.75rem" }}>
            <Link
              href={href}
              style={{
                display: "block",
                padding: "0.5rem",
                backgroundColor: pathname === href ? "#ddd" : "transparent",
                fontWeight: "bold",
                color: "#000",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
