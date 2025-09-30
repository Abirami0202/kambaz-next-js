// app/Kambaz/Account/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Signin", href: "/Kambaz/Account/Signin", id: "wd-signin-link" },
    { label: "Signup", href: "/Kambaz/Account/Signup", id: "wd-signup-link" },
    { label: "Profile", href: "/Kambaz/Account/Profile", id: "wd-profile-link" },
  ];

  return (
    <div 
      id="wd-account-navigation" 
      style={{ 
        width: "200px", 
        backgroundColor: "white",
        minHeight: "100vh",
        borderRight: "1px solid #ddd"
      }}
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        
        return (
          <Link
            key={link.href}
            href={link.href}
            id={link.id}
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
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}