"use client";

import { useState } from "react";

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState(new Date());
  
  const dateObjectToHtmlDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div id="wd-date-state-variables">
      <h4>Date State Variables</h4>
      <h5>{JSON.stringify(startDate)}</h5>
      <h5>{dateObjectToHtmlDateString(startDate)}</h5>
      <input
        className="form-control w-50"
        type="date"
        value={dateObjectToHtmlDateString(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <hr />
    </div>
  );
}