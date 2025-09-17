"use client";

import { useRef } from "react";

export default function Lab2() {
  const alertRef = useRef<HTMLButtonElement>(null);

  function showAlert() {
    alert("Life is Good!");
  }

  return (
    <div id="wd-lab2">
      <h2>Lab 2 — Forms</h2>
      <form>
        {/* Text fields */}
        <h5>Text Fields</h5>
        <label htmlFor="wd-text-fields-username">Username</label>
        <input placeholder="Abirami" id="wd-text-fields-username" /><br />
        <label htmlFor="wd-text-fields-password">Password</label>
        <input type="password" defaultValue="123asd" id="wd-text-fields-password" /><br />
        <label htmlFor="wd-text-fields-first-name">First Name</label>
        <input type="text" title="Abirami" id="wd-text-fields-first-name" /><br />
        <label htmlFor="wd-text-fields-last-name">Last Name</label>
        <input type="text" placeholder="Thiru" defaultValue="Thiru" title="The last name" id="wd-text-fields-last-name" /><br />

        {/* Textarea */}
        <h5>Text boxes</h5>
        <label>Biography</label><br />
        <textarea id="wd-textarea"
          cols={30}
          rows={10}
          defaultValue="This is a Biography default value."
        ></textarea>
        <br />

        {/* Button */}
        <h5 id="wd-buttons">Buttons</h5>
        <button type="button" id="wd-all-good" onClick={showAlert}>Hello World!</button><br />

        {/* Radio */}
        <h5 id="wd-radio-buttons">Radio buttons</h5>
        <label>Favorite movie genre</label><br />
        <input type="radio" name="radio-genre" id="wd-radio-comedy" />
        <label htmlFor="wd-radio-comedy">Comedy</label><br />
        <input type="radio" name="radio-genre" id="wd-radio-drama" />
        <label htmlFor="wd-radio-drama">Drama</label><br />
        <input type="radio" name="radio-genre" id="wd-radio-scifi" />
        <label htmlFor="wd-radio-scifi">Science Fiction</label><br />
        <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
        <label htmlFor="wd-radio-fantasy">Fantasy</label><br />

        {/* Checkbox */}
        <h5 id="wd-checkboxes">Checkboxes</h5>
        <label>Favorite movie genre</label><br />
        <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
        <label htmlFor="wd-chkbox-comedy">Comedy</label><br />
        <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
        <label htmlFor="wd-chkbox-drama">Drama</label><br />
        <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
        <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br />
        <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
        <label htmlFor="wd-chkbox-fantasy">Fantasy</label><br />

        {/* Dropdown */}
        <h4 id="wd-dropdowns">Dropdowns</h4>
        <h5>Select one</h5>
        <label htmlFor="wd-select-one-genre">Favorite movie genre</label><br />
        <select id="wd-select-one-genre" defaultValue="SCIFI">
          <option value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option value="SCIFI">Science Fiction</option>
          <option value="FANTASY">Fantasy</option>
        </select><br />
        <h5>Select many</h5>
        <label htmlFor="wd-select-many-genre">Favorite movie genres</label><br />
        <select multiple id="wd-select-many-genre" defaultValue={['COMEDY', 'SCIFI']}>
          <option value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option value="SCIFI">Science Fiction</option>
          <option value="FANTASY">Fantasy</option>
        </select><br />

        {/* Other field types */}
        <h4>Other HTML field types</h4>
        <label htmlFor="wd-text-fields-email">Email</label>
        <input type="email" placeholder="xyz@gmail.com" id="wd-text-fields-email" /><br />
        <label htmlFor="wd-text-fields-salary-start">Starting salary</label>
        <input type="number" defaultValue={100000} placeholder="1000" id="wd-text-fields-salary-start" /><br />
        <label htmlFor="wd-text-fields-rating">Rating</label>
        <input type="range" defaultValue={4} max={5} id="wd-text-fields-rating" /><br />
        <label htmlFor="wd-text-fields-dob">Date of birth</label>
        <input type="date" defaultValue="2000-01-21" id="wd-text-fields-dob" /><br />

        {/* File upload */}
        <h5>File input</h5>
        <input type="file" /><br />
      </form>
      <div>
        <h4>Labs Navigation</h4>
        <a href="/Kambaz/Labs/Lab1">Lab 1</a> | <a href="/Kambaz/Labs/Lab2">Lab 2</a> | <a href="/">Kambaz Application</a>
      </div>
    </div>
  );
}
