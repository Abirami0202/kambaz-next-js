import Link from "next/link";

export default function Modules() {
  const modules = [
    {
      id: 1,
      title: "Module 1: Introduction to Programming",
      lessons: [
        { id: 1, title: "Lesson 1: Variables and Data Types" },
        { id: 2, title: "Lesson 2: Control Structures" },
      ],
    },
    {
      id: 2,
      title: "Module 2: Advanced JavaScript",
      lessons: [
        { id: 1, title: "Lesson 1: Closures and Scope" },
        { id: 2, title: "Lesson 2: Asynchronous Programming" },
      ],
    },
    // Add more modules if desired
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Modules</h1>
      {modules.map((module) => (
        <div key={module.id} style={{ marginBottom: "2rem" }}>
          <h2>{module.title}</h2>
          <ul>
            {module.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link href={`/Kambaz/Modules/${module.id}/Lessons/${lesson.id}`}>
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
