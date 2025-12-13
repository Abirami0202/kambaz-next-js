import Link from "next/link";

export default function LabsPage() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Labs</h1>
      
      {/* Your full name and section - as required by assignment */}
      <h3>Name: Mrunal</h3>
      <h3>Section: WD</h3>
      
      <ul>
        <li>
          <Link href="/Kambaz/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Kambaz/Labs/Lab2" id="wd-lab2-link">
            Lab 2: Forms
          </Link>
        </li>
        <li>
          <Link href="/Kambaz/Labs/Lab3" id="wd-lab3-link">
            Lab 3: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Kambaz/Labs/Lab4" id="wd-lab4-link">
            Lab 4: Bootstrap & Components
          </Link>
        </li>
        <li>
          <Link href="/Kambaz/Labs/Lab5" id="wd-lab5-link">
            Lab 5: JavaScript & React
          </Link>
        </li>
        <li>
          <Link href="/Kambaz/Labs/Lab6" id="wd-lab6-link">
            Lab 6: State Management & Redux
          </Link>
        </li>
        {/* NEW LAB 7 for Chapter 6 MongoDB */}
        <li>
          <Link href="/Kambaz/Labs/Lab7" id="wd-lab7-link">
            Lab 7: MongoDB Integration
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/" id="wd-kambaz-link">Back to Kambaz Home</Link>
      </p>

      <p>Source code repositories:</p>
      <ul>
        <li>
          <a 
            id="wd-github" 
            href="https://github.com/mrunalg25/kambaz-next-js" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            React GitHub Repository
          </a>
        </li>
        <li>
          <a 
            id="wd-github-node" 
            href="https://github.com/mrunalg25/kambaz-node-server-app" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Node GitHub Repository
          </a>
        </li>
      </ul>
    </div>
  );
}