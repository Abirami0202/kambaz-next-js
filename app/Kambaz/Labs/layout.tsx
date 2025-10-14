"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

export default function LabsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div>
      <nav className="nav nav-pills mb-3">
        <Link 
          href="/Kambaz/Labs" 
          className={`nav-link ${pathname === "/Kambaz/Labs" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link 
          href="/Kambaz/Labs/Lab1" 
          className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}
        >
          Lab 1
        </Link>
        <Link 
          href="/Kambaz/Labs/Lab2" 
          className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}
        >
          Lab 2
        </Link>
        <Link 
          href="/Kambaz/Labs/Lab3" 
          className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}
        >
          Lab 3
        </Link>
        <Link 
          href="/Kambaz/Labs/Lab4" 
          className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}
        >
          Lab 4
        </Link>
        <Link 
          href="/Kambaz/Labs/Lab5" 
          className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}
        >
          Lab 5
        </Link>
        <Link 
          href="/" 
          className="nav-link"
        >
          Kambaz
        </Link>
      </nav>
      {children}
    </div>
  );
}