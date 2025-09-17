export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <main style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>{children}</main>
    </div>
  );
}
