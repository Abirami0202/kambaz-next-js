"use client";

import React from "react";
import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab7() {
  return (
    <div id="wd-lab7" className="container-fluid">
      <h2>Lab 7 - Node.js & Express Server</h2>
      
      <div className="list-group mb-4">
        <a 
          href={`${HTTP_SERVER}/lab5/welcome`}
          className="list-group-item list-group-item-action"
          id="wd-welcome"
        >
          Welcome
        </a>
      </div>

      <EnvironmentVariables />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithArrays />
    </div>
  );
}