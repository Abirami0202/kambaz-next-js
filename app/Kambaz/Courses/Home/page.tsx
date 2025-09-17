import Link from "next/link";

const courses = [
  { id: "js101", title: "Introduction to JavaScript" },
  { id: "react201", title: "React Fundamentals" },
  { id: "nextjs301", title: "Next.js Deep Dive" },
  { id: "nodejs401", title: "Advanced Node.js" }
];

export default function CoursesHome() {
  return (
    <div style={{ padding: "1rem", color: "black" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>Courses</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {courses.map((course) => (
          <li key={course.id} style={{ marginBottom: "1rem" }}>
            <Link href={`/Kambaz/Courses/Modules`}>
              <strong style={{ fontSize: "1.2rem" }}>{course.title}</strong>
            </Link>
            <Link href={`/Kambaz/Courses/Assignments`} style={{ marginLeft: "1rem", fontSize: "1rem" }}>
              Assignments
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
