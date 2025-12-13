import Link from "next/link";
import Image from "next/image";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>

      {/* Your full name and section */}
      <h4>Name: Mrunal</h4>
      <h4>Section: WD</h4>
      {/* Links */}
      <p>
        <Link href="/Labs">All Labs</Link> | <Link href="/Kambaz">Kambaz App</Link> |{" "}
        <a id="wd-github" href="https://github.com/mrunalg25/kambaz-next-js.git" target="_blank">Source Code (GitHub)</a>
      </p>

      {/* Heading Tags */}
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        <h5>This is an h5 heading example</h5>
      </div>

      {/* Paragraph Tag */}
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">This is the first paragraph. The paragraph tag is used to format vertical gaps between long pieces of text like this one.</p>
        <p id="wd-p-2">This is the second paragraph. Even though there is a deliberate white gap between the paragraph above and this paragraph, by default browsers render them as one contiguous piece of text as shown here on the right.</p>
        <p id="wd-p-3">This is the third paragraph. Wrap each paragraph with the paragraph tag to tell browsers to render the gaps.</p>
      </div>

      {/* Lists */}
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        <div>
          My favorite recipe:
          <ol id="wd-your-favorite-recipe">
            <li>Cook rice</li>
            <li>Add sauces</li>
            <li>Cook for 3 mins</li>
            <li>Add masalas and rice to the sauce, and ENJOY!</li>
          </ol>
        </div>
        <h5>Unordered List Tag</h5>
        <div>
          Your favorite books in no particular order:
          <ul id="wd-your-books">
            <li>The Alchemist</li>
            <li>The Harry Potter</li>
            <li>Psychology of Money</li>
          </ul>
        </div>
      </div>

      {/* Table */}
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Q1</td><td>HTML</td><td>2025-05-01</td><td>88</td></tr>
            <tr><td>Q2</td><td>CSS</td><td>2025-05-05</td><td>84</td></tr>
            <tr><td>Q3</td><td>JS</td><td>2025-05-10</td><td>91</td></tr>
            <tr><td>Q4</td><td>React</td><td>2025-05-12</td><td>87</td></tr>
            <tr><td>Q5</td><td>Node</td><td>2025-05-17</td><td>89</td></tr>
            <tr><td>Q6</td><td>Mongo</td><td>2025-05-20</td><td>92</td></tr>
            <tr><td>Q7</td><td>API</td><td>2025-05-22</td><td>93</td></tr>
            <tr><td>Q8</td><td>Auth</td><td>2025-05-24</td><td>85</td></tr>
            <tr><td>Q9</td><td>Deploy</td><td>2025-05-28</td><td>86</td></tr>
            <tr><td>Q10</td><td>Final</td><td>2025-06-01</td><td>90</td></tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>88.5</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Images */}
      <div id="wd-images">
        <h4>Image Tag</h4>
        Loading an image from the internet:
        <br />
        <Image id="wd-starship" width={300} height={200} src="/starship.jpg" alt="Starship" />
        <br />
        Loading a local image:
        <br />
        <Image id="wd-teslabot" width={300} height={200} src="/teslabot.jpg" alt="Teslabot"/>
      </div>

      {/* Navigation & Anchor */}
      <div>
        <h4>Anchor tag</h4>
        Please <a href="https://www.lipsum.com" id="wd-lipsum" target="_blank">click here</a> to get dummy text.<br/>
        <a id="wd-github" href="https://github.com/yourusername/kambaz-next-js" target="_blank">Source Code Repository</a>
      </div>
      <div>
        <h4>Labs Navigation</h4>
        <Link href="/Kambaz/Labs/Lab1">Lab 1</Link>&nbsp; | &nbsp;
        <Link href="/Kambaz/Labs/Lab2">Lab 2</Link>&nbsp; | &nbsp;
        <Link href="/">Kambaz Application</Link>
      </div>
    </div>
  );
}
