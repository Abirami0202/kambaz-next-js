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
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModules, addModule, deleteModule, updateModule } from "./reducer";
import * as modulesClient from "./client";
import ModulesControls from "./ModulesControls";
import LessonEditor from "./LessonEditor";

export default function Modules() {
  const params = useParams();
  const cid = params.cid as string;
  const dispatch = useDispatch();
  
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const [moduleName, setModuleName] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [showLessonEditor, setShowLessonEditor] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState("");
  
  // For inline editing
  const [editingModuleId, setEditingModuleId] = useState("");
  const [editingModuleName, setEditingModuleName] = useState("");
  const [editingLessonInlineId, setEditingLessonInlineId] = useState("");
  const [editingLessonInlineName, setEditingLessonInlineName] = useState("");
  
  // Check if user is faculty
  const isFaculty = currentUser?.role === "FACULTY";
  
  // Filter modules for the current course - WITH SAFETY CHECK
  const courseModules = Array.isArray(modules) 
    ? modules.filter((module: any) => module.course === cid)
    : [];

  // Fetch modules on component mount
  useEffect(() => {
    fetchModules();
  }, [cid]);

  const fetchModules = async () => {
    try {
      const fetchedModules = await modulesClient.fetchModulesForCourse(cid);
      dispatch(setModules(fetchedModules));
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  // MODULE FUNCTIONS
  const addNewModule = async () => {
    if (!moduleName.trim()) return;
    
    try {
      const newModule = await modulesClient.createModule(cid, { name: moduleName, description: "" });
      dispatch(addModule(newModule));
      setModuleName("");
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const removeModule = async (moduleId: string) => {
    try {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const startEditingModule = (moduleId: string, currentName: string) => {
    setEditingModuleId(moduleId);
    setEditingModuleName(currentName);
  };

  const saveModuleName = async (moduleId: string) => {
    console.log("💾 SAVING MODULE NAME:", moduleId, editingModuleName);
    try {
      const updatedModule = await modulesClient.updateModule(moduleId, { 
        name: editingModuleName,
        course: cid 
      });
      console.log("✅ Got updated module from API:", updatedModule);
      dispatch(updateModule(updatedModule));
      setEditingModuleId("");
      setEditingModuleName("");
    } catch (error) {
      console.error("Error updating module:", error);
    }
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

  const addLesson = async () => {
    if (!lessonName.trim()) return;
    
    try {
      const newLesson = {
        _id: new Date().getTime().toString(),
        name: lessonName,
        description: "",
        module: currentModuleId
      };
      
      const updatedModule = await modulesClient.addLessonToModule(currentModuleId, newLesson);
      dispatch(updateModule(updatedModule));
      
      setLessonName("");
      setShowLessonEditor(false);
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  const deleteLesson = async (moduleId: string, lessonId: string) => {
    try {
      const updatedModule = await modulesClient.deleteLessonFromModule(moduleId, lessonId);
      dispatch(updateModule(updatedModule));
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const editLesson = (moduleId: string, lessonId: string) => {
    if (!Array.isArray(modules)) return;
    const module = modules.find((m: any) => m._id === moduleId);
    if (module) {
      const lesson = module.lessons.find((l: any) => l._id === lessonId);
      if (lesson) {
        setEditingLessonInlineId(lessonId);
        setEditingLessonInlineName(lesson.name);
        setCurrentModuleId(moduleId);
      }
    }
  };

  const saveLessonName = async (moduleId: string, lessonId: string) => {
    try {
      const updatedModule = await modulesClient.updateLessonInModule(moduleId, lessonId, {
        name: editingLessonInlineName
      });
      dispatch(updateModule(updatedModule));
      setEditingLessonInlineId("");
      setEditingLessonInlineName("");
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
  };

  const cancelLessonEdit = () => {
    setEditingLessonInlineId("");
    setEditingLessonInlineName("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* Module Controls - Only show to FACULTY */}
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={addNewModule}
        />
      )}

      <br /><br /><br />

      {/* Modules List */}
      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((module: any) => (
          <ListGroup.Item key={module._id} className="p-0 mb-5 fs-5 border-gray">
            {/* Module Title */}
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              
              {/* Inline Module Name Editing - Only for FACULTY */}
              {editingModuleId === module._id && isFaculty ? (
                <input
                  type="text"
                  className="form-control d-inline-block"
                  style={{ width: "50%", display: "inline" }}
                  value={editingModuleName}
                  onChange={(e) => setEditingModuleName(e.target.value)}
                  onBlur={() => saveModuleName(module._id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveModuleName(module._id);
                    if (e.key === "Escape") cancelModuleEdit();
                  }}
                  autoFocus
                />
              ) : (
                <span>{module.name}</span>
              )}
              
              {/* Module Control Buttons - Only show to FACULTY */}
              {isFaculty && (
                <div className="float-end">
                  <FaPencil 
                    className="text-primary me-3" 
                    style={{ cursor: "pointer" }}
                    onClick={() => startEditingModule(module._id, module.name)}
                  />
                  <FaTrash 
                    className="text-danger me-2" 
                    style={{ cursor: "pointer" }}
                    onClick={() => removeModule(module._id)}
                  />
                  <FaCheckCircle className="text-success me-2" />
                  <BsPlus 
                    className="fs-4" 
                    style={{ cursor: "pointer" }}
                    onClick={() => openAddLessonDialog(module._id)}
                  />
                  <IoEllipsisVertical className="fs-4 ms-1" />
                </div>
              )}
            </div>

            {/* Lessons */}
            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="p-3 ps-1"
                    style={{ borderLeft: "3px solid green" }}
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    
                    {/* Inline Lesson Name Editing - Only for FACULTY */}
                    {editingLessonInlineId === lesson._id && isFaculty ? (
                      <input
                        type="text"
                        className="form-control d-inline-block"
                        style={{ width: "50%", display: "inline" }}
                        value={editingLessonInlineName}
                        onChange={(e) => setEditingLessonInlineName(e.target.value)}
                        onBlur={() => saveLessonName(module._id, lesson._id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveLessonName(module._id, lesson._id);
                          if (e.key === "Escape") cancelLessonEdit();
                        }}
                        autoFocus
                      />
                    ) : (
                      <span>{lesson.name}</span>
                    )}
                    
                    {/* Lesson Control Buttons - Only show to FACULTY */}
                    {isFaculty && (
                      <div className="float-end">
                        <FaPencil
                          onClick={() => editLesson(module._id, lesson._id)}
                          className="text-primary me-3"
                          style={{ cursor: "pointer" }}
                        />
                        <FaTrash
                          className="text-danger me-2"
                          onClick={() => deleteLesson(module._id, lesson._id)}
                          style={{ cursor: "pointer" }}
                        />
                        <FaCheckCircle className="text-success me-2" />
                        <IoEllipsisVertical className="fs-4" />
                      </div>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Lesson Editor Modal (for adding new lessons) - Only for FACULTY */}
      {isFaculty && (
        <LessonEditor
          show={showLessonEditor}
          handleClose={() => setShowLessonEditor(false)}
          lessonName={lessonName}
          setLessonName={setLessonName}
          addLesson={addLesson}
        />
      )}
    </div>
  );
}