export default function CoursesHome() {
  const courses = [
    {
      id: "js101",
      title: "Introduction to JavaScript",
      description: "Learn the basics of JavaScript programming language.",
    },
    {
      id: "react201",
      title: "React Fundamentals",
      description: "Understand the core concepts of React framework.",
    },
    {
      id: "nextjs301",
      title: "Next.js Deep Dive",
      description: "Build powerful server-rendered React apps with Next.js.",
    },
  ];

  return (
    <div style={{ color: "#000", padding: "1rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "1rem" }}>
        Courses Home
      </h1>

      <div style={{ display: "flex", gap: "2rem" }}>
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "1rem",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <h2 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              {course.title}
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>
              {course.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
