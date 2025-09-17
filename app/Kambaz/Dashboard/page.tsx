import Link from "next/link";

const courses = [
  { id: "js101", title: "Introduction to JavaScript" },
  { id: "react201", title: "React Fundamentals" },
  { id: "nextjs301", title: "Next.js Deep Dive" },
  { id: "nodejs401", title: "Advanced Node.js" },
];

export default function Dashboard() {
  return (
    <div style={{ padding: "1rem", color: "black" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "1rem" }}>
        Dashboard
      </h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {courses.map((course) => (
          <li
            key={course.id}
            style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "1rem",
            }}
          >
            <h2 style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
              {course.title}
            </h2>
            <Link
              href={`/Kambaz/Courses/Modules`}
              style={{ color: "#0070f3", textDecoration: "underline" }}
            >
              Go to Course Modules
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
