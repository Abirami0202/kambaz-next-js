"use client";

import { useState } from "react";

export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 });

  return (
    <div id="wd-object-state-variables">
      <h4>Object State Variables</h4>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <input
        className="form-control w-50 mb-2"
        value={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
        placeholder="Name"
      />
      <input
        className="form-control w-50"
        type="number"
        value={person.age}
        onChange={(e) => setPerson({ ...person, age: parseInt(e.target.value) })}
        placeholder="Age"
      />
      <hr />
    </div>
  );
}