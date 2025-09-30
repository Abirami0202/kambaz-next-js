// app/Kambaz/NavigationSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function NavigationSidebar() {
  const pathname = usePathname();

  return (
    <div
      id="wd-kambaz-navigation"
      style={{
        width: "120px",
        backgroundColor: "black",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      {/* Northeastern Logo */}
      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        <a
          id="wd-neu-link"
          href="https://www.northeastern.edu/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          NEU
        </a>
      </div>

      {/* Account */}
      <Link
        href="/Kambaz/Account"
        id="wd-account-link"
        style={{
          backgroundColor: pathname.includes("Account") ? "white" : "black",
          color: pathname.includes("Account") ? "red" : "white",
          textDecoration: "none",
          textAlign: "center",
          padding: "0.75rem 0",
          display: "block",
        }}
      >
        <FaRegCircleUser style={{ fontSize: "28px", color: "red", display: "block", margin: "0 auto" }} />
        <div style={{ fontSize: "11px", marginTop: "4px" }}>Account</div>
      </Link>

      {/* Dashboard */}
      <Link
        href="/Kambaz/Dashboard"
        id="wd-dashboard-link"
        style={{
          backgroundColor: pathname.includes("Dashboard") ? "white" : "black",
          color: pathname.includes("Dashboard") ? "red" : "white",
          textDecoration: "none",
          textAlign: "center",
          padding: "0.75rem 0",
          display: "block",
        }}
      >
        <AiOutlineDashboard style={{ fontSize: "28px", color: "red", display: "block", margin: "0 auto" }} />
        <div style={{ fontSize: "11px", marginTop: "4px" }}>Dashboard</div>
      </Link>

      {/* Courses */}
      <Link
        href="/Kambaz/Courses"
        id="wd-course-link"
        style={{
          backgroundColor: pathname.includes("Courses") ? "white" : "black",
          color: pathname.includes("Courses") ? "red" : "white",
          textDecoration: "none",
          textAlign: "center",
          padding: "0.75rem 0",
          display: "block",
        }}
      >
        <LiaBookSolid style={{ fontSize: "28px", color: "red", display: "block", margin: "0 auto" }} />
        <div style={{ fontSize: "11px", marginTop: "4px" }}>Courses</div>
      </Link>

      {/* Calendar */}
      <Link
        href="/Kambaz/Calendar"
        id="wd-calendar-link"
        style={{
          backgroundColor: pathname.includes("Calendar") ? "white" : "black",
          color: pathname.includes("Calendar") ? "red" : "white",
          textDecoration: "none",
          textAlign: "center",
          padding: "0.75rem 0",
          display: "block",
        }}
      >
        <IoCalendarOutline style={{ fontSize: "28px", color: "red", display: "block", margin: "0 auto" }} />
        <div style={{ fontSize: "11px", marginTop: "4px" }}>Calendar</div>
      </Link>

      {/* Inbox */}
      <Link
        href="/Kambaz/Inbox"
        id="wd-inbox-link"
        style={{
          backgroundColor: pathname.includes("Inbox") ? "white" : "black",
          color: pathname.includes("Inbox") ? "red" : "white",
          textDecoration: "none",
          textAlign: "center",
          padding: "0.75rem 0",
          display: "block",
        }}
      >
        <FaInbox style={{ fontSize: "28px", color: "red", display: "block", margin: "0 auto" }} />
        <div style={{ fontSize: "11px", marginTop: "4px" }}>Inbox</div>
      </Link>

      {/* Labs */}
      <Link
        href="/Kambaz/Labs"
        id="wd-labs-link"
        style={{
          backgroundColor: pathname.includes("Labs") ? "white" : "black",
          color: pathname.includes("Labs") ? "red" : "white",
          textDecoration: "none",
          textAlign: "center",
          padding: "0.75rem 0",
          display: "block",
        }}
      >
        <LiaCogSolid style={{ fontSize: "28px", color: "red", display: "block", margin: "0 auto" }} />
        <div style={{ fontSize: "11px", marginTop: "4px" }}>Labs</div>
      </Link>
    </div>
  );
}