/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, use } from "react";
import CourseSidebar from "./CourseSidebar";

export default function CourseLayout({ 
  children,
  params
}: { 
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = use(params);
  
  return (
    <div>
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