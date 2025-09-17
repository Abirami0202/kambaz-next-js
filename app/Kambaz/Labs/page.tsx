import Link from "next/link";

export default function LabsPage() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Labs</h1>
      <p>Abirami, Web development</p>
      <ul>
        <li>
          <Link href="/Kambaz/Labs/Lab1">Lab 1</Link>
        </li>
        <li>
          <Link href="/Kambaz/Labs/Lab2">Lab 2</Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/">Back to Kambaz Home</Link>
      </p>

      <p>Source code repositories:</p>
      <ul>
        <li>
          <a href="https://github.com/Abirami0202/kambaz-next-js.git" target="_blank" rel="noopener noreferrer">
            Repository 1
          </a>
        </li>
        <li>
          <a href="https://github.com/Abirami0202/kambaz-next-js.git" target="_blank" rel="noopener noreferrer">
            Repository 2
          </a>
        </li>
      </ul>
    </div>
  );
}
