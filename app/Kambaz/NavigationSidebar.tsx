"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "NEU", href: "https://www.northeastern.edu", external: true },
    { label: "Account", href: "/Kambaz/Account/Signin" },
    { label: "Dashboard", href: "/Kambaz/Dashboard" },
    { label: "Courses", href: "/Kambaz/Courses/Home" },
    { label: "Calendar", href: "/Kambaz/Calendar" },
    { label: "Inbox", href: "/Kambaz/Inbox" },
    { label: "Labs", href: "/Kambaz/Labs" },
    { label: "Modules", href: "/Kambaz/Modules" },
    { label: "Assignments", href: "/Kambaz/Assignments" },
  ];

  return (
    <nav
      style={{
        width: 220,
        borderRight: "1px solid #ddd",
        padding: "1rem",
        height: "100vh",
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
        overflowY: "auto",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {navItems.map(({ label, href, external }) =>
          external ? (
            <li key={label} style={{ marginBottom: "1rem" }}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#0070f3",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                {label}
              </a>
            </li>
          ) : (
            <li key={label} style={{ marginBottom: "1rem" }}>
              <Link
                href={href}
                style={{
                  color: pathname.startsWith(href) ? "#000" : "#0070f3",
                  fontWeight: pathname.startsWith(href) ? "700" : "500",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
