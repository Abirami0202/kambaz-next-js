import CourseSidebar from "./CourseSidebar";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <CourseSidebar />
      <main style={{ flex: 1, padding: "1rem", color: "#000" }}>{children}</main>
    </div>
  );
}
