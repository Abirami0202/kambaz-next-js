import Link from "next/link";

const courses = [
  { id: "js101", title: "Introduction to JavaScript" },
  { id: "react201", title: "React Fundamentals" },
  { id: "nextjs301", title: "Next.js Deep Dive" },
  { id: "nodejs401", title: "Advanced Node.js" },
];

const assignmentsData: Record<
  string,
  { id: string; title: string }[]
> = {
  js101: [
    { id: "a1", title: "JS Basics Assignment" },
    { id: "a2", title: "Functions and Loops" },
  ],
  react201: [
    { id: "a1", title: "React State Assignment" },
    { id: "a2", title: "React Hooks" },
  ],
  nextjs301: [
    { id: "a1", title: "Next.js Routing" },
    { id: "a2", title: "API Routes" },
  ],
  nodejs401: [
    { id: "a1", title: "Node.js Server" },
    { id: "a2", title: "Database Integration" },
  ],
};

export default function AssignmentsList() {
  return (
    <div style={{ padding: "1rem", color: "#000" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>Assignments</h1>
      {courses.map((course) => (
        <div key={course.id} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{course.title}</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {(assignmentsData[course.id] || []).map((assignment) => (
              <li key={assignment.id} style={{ marginBottom: "0.7rem" }}>
                <Link
                  href={`/Kambaz/Courses/Assignments/${course.id}-${assignment.id}`}
                  style={{ color: "#0070f3", textDecoration: "underline" }}
                >
                  {assignment.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
