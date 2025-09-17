interface ModulePageProps {
  params: {
    id: string;
  };
}

const moduleContent: Record<string, { title: string; content: string }> = {
  mod1: {
    title: "Module 1: Basics",
    content: "This module introduces basic concepts and fundamentals you need to know.",
  },
  mod2: {
    title: "Module 2: Advanced",
    content: "This module covers advanced topics and best practices.",
  },
};

export default function ModulePage({ params }: ModulePageProps) {
  const module = moduleContent[params.id];
  if (!module) {
    return <div style={{ padding: "1rem", color: "black" }}>Module not found.</div>;
  }
  return (
    <div style={{ padding: "1rem", color: "black" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2rem" }}>{module.title}</h1>
      <p style={{ fontSize: "1.1rem" }}>{module.content}</p>
    </div>
  );
}
