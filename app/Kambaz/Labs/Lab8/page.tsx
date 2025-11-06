"use client";

import React from "react";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";

export default function Lab8() {
  return (
    <div id="wd-lab8" className="container-fluid">
      <h2>Lab 8 - Asynchronous JavaScript and AJAX</h2>
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}