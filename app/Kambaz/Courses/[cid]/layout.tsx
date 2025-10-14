/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import CourseSidebar from "./CourseSidebar";
import * as db from "../../Database";

export default async function CourseLayout({ 
  children,
  params
}: { 
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  const course = db.courses.find((c: any) => c._id === cid);
  
  return (
    <div>
      <h2 className="text-danger" style={{ padding: "1rem", marginLeft: "140px" }}>
        {course && course.name}
      </h2>
      <hr />
      <div style={{ display: "flex" }}>
        <CourseSidebar />
        <main style={{ flex: 1, padding: "1rem", color: "#000" }}>
          {children}
        </main>
      </div>
    </div>
  );
}