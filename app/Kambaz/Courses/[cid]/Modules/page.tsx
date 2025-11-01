/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaBan, FaTrash, FaPencilAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Button, Dropdown, ListGroup } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useState } from "react";
import * as db from "../../../Database";
import ModulesControls from "./ModulesControls";
import LessonEditor from "./LessonEditor";

export default function Modules() {
  const params = useParams();
  const cid = params.cid as string;
  
  const [moduleName, setModuleName] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [modules, setModules] = useState(db.modules);
  const [showLessonEditor, setShowLessonEditor] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState("");
  
  // For inline editing
  const [editingModuleId, setEditingModuleId] = useState("");
  const [editingModuleName, setEditingModuleName] = useState("");
  const [editingLessonInlineId, setEditingLessonInlineId] = useState("");
  const [editingLessonInlineName, setEditingLessonInlineName] = useState("");
  
  // Filter modules for the current course
  const courseModules = modules.filter(
    (mod: any) => mod.course === cid
  );

  // MODULE FUNCTIONS
  const addModule = () => {
    const newModule = {
      _id: new Date().getTime().toString(),
      name: moduleName,
      course: cid,
      lessons: []
    };
    setModules([...modules, newModule]);
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m: any) => m._id !== moduleId));
  };

  const startEditingModule = (moduleId: string, currentName: string) => {
    setEditingModuleId(moduleId);
    setEditingModuleName(currentName);
  };

  const saveModuleName = (moduleId: string) => {
    setModules(modules.map((m: any) => 
      m._id === moduleId ? { ...m, name: editingModuleName } : m
    ));
    setEditingModuleId("");
    setEditingModuleName("");
  };

  const cancelModuleEdit = () => {
    setEditingModuleId("");
    setEditingModuleName("");
  };

  // LESSON FUNCTIONS
  const openAddLessonDialog = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setLessonName("");
    setShowLessonEditor(true);
  };

  const addLesson = () => {
    if (!lessonName.trim()) return;
    
    // Add new lesson
    const newLesson = {
      _id: new Date().getTime().toString(),
      name: lessonName,
      description: "",
      module: currentModuleId
    };
    
    setModules(modules.map((m: any) => {
      if (m._id === currentModuleId) {
        return {
          ...m,
          lessons: [...(m.lessons || []), newLesson]
        };
      }
      return m;
    }));
    
    setLessonName("");
    setShowLessonEditor(false);
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map((m: any) => {
      if (m._id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter((l: any) => l._id !== lessonId)
        };
      }
      return m;
    }));
  };

  const editLesson = (moduleId: string, lessonId: string) => {
    const foundModule = modules.find((m: any) => m._id === moduleId);
    if (foundModule) {
      const lesson = foundModule.lessons.find((l: any) => l._id === lessonId);
      if (lesson) {
        setEditingLessonInlineId(lessonId);
        setEditingLessonInlineName(lesson.name);
        setCurrentModuleId(moduleId);
      }
    }
  };

  const saveLessonName = (moduleId: string, lessonId: string) => {
    setModules(modules.map((m: any) => {
      if (m._id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map((l: any) =>
            l._id === lessonId ? { ...l, name: editingLessonInlineName } : l
          )
        };
      }
      return m;
    }));
    setEditingLessonInlineId("");
    setEditingLessonInlineName("");
  };

  const cancelLessonEdit = () => {
    setEditingLessonInlineId("");
    setEditingLessonInlineName("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* Module Controls */}
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />

      <br /><br /><br />

      {/* Modules List */}
      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((mod: any) => (
          <ListGroup.Item key={mod._id} className="p-0 mb-5 fs-5 border-gray">
            {/* Module Title */}
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              
              {/* Inline Module Name Editing */}
              {editingModuleId === mod._id ? (
                <input
                  type="text"
                  className="form-control d-inline-block"
                  style={{ width: "50%", display: "inline" }}
                  value={editingModuleName}
                  onChange={(e) => setEditingModuleName(e.target.value)}
                  onBlur={() => saveModuleName(mod._id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveModuleName(mod._id);
                    if (e.key === "Escape") cancelModuleEdit();
                  }}
                  autoFocus
                />
              ) : (
                <span>{mod.name}</span>
              )}
              
              {/* Module Control Buttons */}
              <div className="float-end">
                <FaPencil 
                  className="text-primary me-3" 
                  style={{ cursor: "pointer" }}
                  onClick={() => startEditingModule(mod._id, mod.name)}
                />
                <FaTrash 
                  className="text-danger me-2" 
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteModule(mod._id)}
                />
                <FaCheckCircle className="text-success me-2" />
                <BsPlus 
                  className="fs-4" 
                  style={{ cursor: "pointer" }}
                  onClick={() => openAddLessonDialog(mod._id)}
                />
                <IoEllipsisVertical className="fs-4 ms-1" />
              </div>
            </div>

            {/* Lessons */}
            {mod.lessons && mod.lessons.length > 0 && (
              <ListGroup className="rounded-0">
                {mod.lessons.map((lesson: any) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="p-3 ps-1"
                    style={{ borderLeft: "3px solid green" }}
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    
                    {/* Inline Lesson Name Editing */}
                    {editingLessonInlineId === lesson._id ? (
                      <input
                        type="text"
                        className="form-control d-inline-block"
                        style={{ width: "50%", display: "inline" }}
                        value={editingLessonInlineName}
                        onChange={(e) => setEditingLessonInlineName(e.target.value)}
                        onBlur={() => saveLessonName(mod._id, lesson._id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveLessonName(mod._id, lesson._id);
                          if (e.key === "Escape") cancelLessonEdit();
                        }}
                        autoFocus
                      />
                    ) : (
                      <span>{lesson.name}</span>
                    )}
                    
                    {/* Lesson Control Buttons */}
                    <div className="float-end">
                      <FaPencil
                        onClick={() => editLesson(mod._id, lesson._id)}
                        className="text-primary me-3"
                        style={{ cursor: "pointer" }}
                      />
                      <FaTrash
                        className="text-danger me-2"
                        onClick={() => deleteLesson(mod._id, lesson._id)}
                        style={{ cursor: "pointer" }}
                      />
                      <FaCheckCircle className="text-success me-2" />
                      <IoEllipsisVertical className="fs-4" />
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Lesson Editor Modal (for adding new lessons) */}
      <LessonEditor
        show={showLessonEditor}
        handleClose={() => setShowLessonEditor(false)}
        lessonName={lessonName}
        setLessonName={setLessonName}
        addLesson={addLesson}
      />
    </div>
  );
}