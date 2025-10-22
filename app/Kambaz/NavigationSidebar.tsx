"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function NavigationSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Account", path: "/Kambaz/Account", Icon: FaRegCircleUser, id: "wd-account-link" },
    { label: "Dashboard", path: "/Kambaz/Dashboard", Icon: AiOutlineDashboard, id: "wd-dashboard-link" },
    { label: "Courses", path: "/Kambaz/Courses", Icon: LiaBookSolid, id: "wd-course-link" },
    { label: "Calendar", path: "/Kambaz/Calendar", Icon: IoCalendarOutline, id: "wd-calendar-link" },
    { label: "Inbox", path: "/Kambaz/Inbox", Icon: FaInbox, id: "wd-inbox-link" },
    { label: "Labs", path: "/Kambaz/Labs", Icon: LiaCogSolid, id: "wd-labs-link" },
  ];

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
        zIndex: 1000,
      }}
    >
      {/* Northeastern Logo/Link with Image */}
      <div style={{ textAlign: "center", padding: "1rem 0", backgroundColor: "black" }}>
        <a
          id="wd-neu-link"
          href="https://www.northeastern.edu/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none", display: "inline-block" }}
        >
          <img
            src="/neu-logo.png"
            alt="NEU Logo"
            width={75}
            height={75}
            style={{ display: "block", margin: "0 auto", objectFit: "contain" }}
          />
        </a>
      </div>

      {links.map((link) => {
        const { Icon } = link;
        // Check if current path matches this specific link
        const isActive = pathname.startsWith(link.path);
        
        // Determine styles based on the link label and active state
        let backgroundColor = "black";
        let textColor = "white";
        let iconColor = "red";

        if (link.label === "Account") {
          // Account: always black background, white text and icon (never changes)
          backgroundColor = "black";
          textColor = "white";
          iconColor = "white";
        } else if (link.label === "Dashboard" && isActive) {
          // Dashboard when active: white background, red text and red icon
          backgroundColor = "white";
          textColor = "red";
          iconColor = "red";
        } else if (isActive) {
          // All other links when active: white background, black text, red icon
          backgroundColor = "white";
          textColor = "black";
          iconColor = "red";
        } else {
          // All non-active links: black background, white text, red icon
          backgroundColor = "black";
          textColor = "white";
          iconColor = "red";
        }
        
        return (
          <Link
            key={link.path}
            href={link.path}
            id={link.id}
            style={{
              backgroundColor: backgroundColor,
              color: textColor,
              textDecoration: "none",
              textAlign: "center",
              padding: "0.75rem 0",
              display: "block",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Icon size={28} color={iconColor} />
              <div style={{ fontSize: "11px", marginTop: "4px" }}>
                {link.label}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}