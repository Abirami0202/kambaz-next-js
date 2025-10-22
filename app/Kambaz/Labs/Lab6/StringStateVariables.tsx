"use client";

import { useState } from "react";

export default function StringStateVariables() {
  const [firstName, setFirstName] = useState("John");

  return (
    <div id="wd-string-state-variables">
      <h4>String State Variables</h4>
      <p>{firstName}</p>
      <input
        className="form-control w-50"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <hr />
    </div>
  );
}