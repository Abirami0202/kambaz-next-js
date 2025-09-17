import Link from "next/link";

const courses = [
  { id: "js101", title: "Introduction to JavaScript" },
  { id: "react201", title: "React Fundamentals" },
  { id: "nextjs301", title: "Next.js Deep Dive" },
  { id: "nodejs401", title: "Advanced Node.js" }
];

export default function Assignments() {
  return (
    <div style={{ padding: "1rem", color: "black" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>Select a Course</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {courses.map((course) => (
          <li key={course.id} style={{ marginBottom: "1rem" }}>
            <Link href={`/Kambaz/Courses/Assignments/${course.id}`}>
              <strong style={{ fontSize: "1.2rem" }}>{course.title}</strong>
            </Link>
            <div style={{ marginTop: "0.5rem" }}>
              <button style={{ marginRight: 8 }}>Quizzes</button>
              <button style={{ marginRight: 8 }}>Exams</button>
              <button>Project</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
