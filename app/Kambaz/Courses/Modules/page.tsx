import Link from "next/link";

const modules = [
  { id: "mod1", title: "Module 1: Basics", description: "Introduction to fundamentals." },
  { id: "mod2", title: "Module 2: Advanced", description: "Deep dive into advanced concepts." },
];

export default function ModulesList() {
  return (
    <div style={{ padding: "1rem", color: "black" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>Modules</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {modules.map((modItem) => (
          <li key={modItem.id} style={{ marginBottom: "1rem", cursor: "pointer" }}>
            <Link href={`/Kambaz/Courses/Modules/${modItem.id}`}>
              <h2 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{modItem.title}</h2>
              <p style={{ fontSize: "1rem" }}>{modItem.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
