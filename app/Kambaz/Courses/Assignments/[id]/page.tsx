'use client';

import React, { useState } from "react";

interface AssignmentEditorProps {
  params: Promise<{ id: string }>;
}

const defaults = {
  name: "Demo Assignment",
  description: "This is a default assignment description.",
  points: 100,
  group: "Homework",
  grade: "Points",
  submission: "Online",
  entryOptions: ["Text Entry", "File Upload"],
  assignTo: "Everyone",
  due: "2025-09-30",
  availableFrom: "2025-09-23",
  until: "2025-10-07",
};

export default function AssignmentEditor({ params }: AssignmentEditorProps) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const [form, setForm] = useState({
    name: defaults.name,
    description: defaults.description,
    points: defaults.points,
    group: defaults.group,
    grade: defaults.grade,
    submission: defaults.submission,
    entryOptions: defaults.entryOptions,
    assignTo: defaults.assignTo,
    due: defaults.due,
    availableFrom: defaults.availableFrom,
    until: defaults.until,
  });

  const assignmentGroups = ["Homework", "Project", "Quiz", "Exam"];
  const gradeTypes = ["Points", "Percentage", "Letter Grade"];
  const submissionTypes = ["Online", "On Paper", "External Tool"];
  const onlineEntryOptions = [
    "Text Entry",
    "Website URL",
    "Media Recordings",
    "File Upload",
  ];

  function handleCheckbox(option: string) {
    setForm((prev) => ({
      ...prev,
      entryOptions: prev.entryOptions.includes(option)
        ? prev.entryOptions.filter((x) => x !== option)
        : [...prev.entryOptions, option],
    }));
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        color: "#000",
        background: "#fafafc",
        padding: "2rem",
        borderRadius: 10,
      }}
    >
      <h1 style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: 20 }}>
        Assignment Editor - {id}
      </h1>

      {/* Assignment Name */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold" }}>Assignment Name:</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Assignment Name"
          style={{ width: "100%", padding: 6, fontSize: 16, marginTop: 5 }}
        />
      </div>

      {/* Description */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold" }}>Description:</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{
            width: "100%",
            padding: 6,
            fontSize: 16,
            marginTop: 5,
            minHeight: 60,
          }}
        />
      </div>

      {/* Points */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold" }}>Points:</label>
        <input
          type="number"
          value={form.points}
          onChange={(e) => setForm({ ...form, points: +e.target.value })}
          style={{ width: "100%", padding: 6, fontSize: 16, marginTop: 5 }}
        />
      </div>

      {/* Assignment Group */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold" }}>Assignment Group:</label>
        <select
          value={form.group}
          onChange={(e) => setForm({ ...form, group: e.target.value })}
          style={{ width: "100%", padding: 6, fontSize: 16, marginTop: 5 }}
        >
          {assignmentGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {/* Display Grade */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold" }}>Display Grade:</label>
        <select
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
          style={{ width: "100%", padding: 6, fontSize: 16, marginTop: 5 }}
        >
          {gradeTypes.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Submission Type */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold" }}>Submission Type:</label>
        <select
          value={form.submission}
          onChange={(e) => setForm({ ...form, submission: e.target.value })}
          style={{ width: "100%", padding: 6, fontSize: 16, marginTop: 5 }}
        >
          {submissionTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Online Entry Options */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold" }}>Online Entry Options:</label>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 15,
            marginTop: 5,
          }}
        >
          {onlineEntryOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={form.entryOptions.includes(option)}
                onChange={() => handleCheckbox(option)}
                style={{ marginRight: 5 }}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Assign to */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ fontWeight: "bold" }}>Assign to:</label>
        <input
          type="text"
          value={form.assignTo}
          onChange={(e) => setForm({ ...form, assignTo: e.target.value })}
          style={{ width: "100%", padding: 6, fontSize: 16, marginTop: 5 }}
        />
      </div>

      {/* Dates */}
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <label style={{ fontWeight: "bold" }}>Due Date:</label>
          <input
            type="date"
            value={form.due}
            onChange={(e) => setForm({ ...form, due: e.target.value })}
            style={{ display: "block", marginTop: 5, padding: 6, fontSize: 16 }}
          />
        </div>
        <div>
          <label style={{ fontWeight: "bold" }}>Available From:</label>
          <input
            type="date"
            value={form.availableFrom}
            onChange={(e) =>
              setForm({ ...form, availableFrom: e.target.value })
            }
            style={{ display: "block", marginTop: 5, padding: 6, fontSize: 16 }}
          />
        </div>
        <div>
          <label style={{ fontWeight: "bold" }}>Until:</label>
          <input
            type="date"
            value={form.until}
            onChange={(e) => setForm({ ...form, until: e.target.value })}
            style={{ display: "block", marginTop: 5, padding: 6, fontSize: 16 }}
          />
        </div>
      </div>
    </div>
  );
}
