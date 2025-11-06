"use client";

import React, { useEffect, useState } from "react";
import * as client from "./lab8-client";  // Changed from "./client"

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
  };

  const fetchWelcomeOnLoad = async () => {
    const welcome = await client.fetchWelcomeMessage();
    setWelcomeOnLoad(welcome);
  };

  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div id="wd-http-client" className="mb-4">
      <h3>HTTP Client</h3>
      <hr />
      <h4>Requesting on Click</h4>
      <button
        className="btn btn-primary me-2"
        onClick={fetchWelcomeOnClick}
        id="wd-fetch-welcome-click"
      >
        Fetch Welcome
      </button>
      <br />
      Response from server: <b id="wd-welcome-click-response">{welcomeOnClick}</b>
      <hr />
      <h4>Requesting on Load</h4>
      Response from server: <b id="wd-welcome-load-response">{welcomeOnLoad}</b>
      <hr />
    </div>
  );
}