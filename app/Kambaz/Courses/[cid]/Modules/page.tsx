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
import { useDispatch, useSelector } from "react-redux";
import { setModules, addModule, deleteModule, updateModule } from "./reducer";
import * as coursesClient from "../../client";
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

  // Fetch modules from server when course changes
  const fetchModules = async () => {
    try {
      const modules = await coursesClient.findModulesForCourse(cid);
      dispatch(setModules(modules));
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);
  
  // Filter modules for the current course
  const courseModules = modules.filter(
    (mod: any) => mod.course === cid
  );

  // MODULE FUNCTIONS
  const addModuleHandler = async () => {
    try {
      const newModule = await coursesClient.createModuleForCourse(cid, {
        name: moduleName,
        course: cid,
      });
      dispatch(addModule(newModule));
      setModuleName("");
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const deleteModuleHandler = async (moduleId: string) => {
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
    try {
      const module = modules.find((m: any) => m._id === moduleId);
      const updatedModule = { ...module, name: editingModuleName };
      await modulesClient.updateModule(updatedModule);
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

  // LESSON FUNCTIONS - NOW WITH SERVER INTEGRATION
  const openAddLessonDialog = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setLessonName("");
    setShowLessonEditor(true);
  };

  const addLesson = async () => {
    if (!lessonName.trim()) return;
    
    try {
      const lesson = {
        name: lessonName,
        description: "",
        module: currentModuleId
      };
      
      const updatedModule = await modulesClient.addLessonToModule(currentModuleId, lesson);
      dispatch(updateModule(updatedModule));
      setLessonName("");
      setShowLessonEditor(false);
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  const deleteLesson = async (moduleId: string, lessonId: string) => {
    try {
      await modulesClient.deleteLessonFromModule(moduleId, lessonId);
      
      const updatedModules = modules.map((m: any) => {
        if (m._id === moduleId) {
          return {
            ...m,
            lessons: m.lessons.filter((l: any) => l._id !== lessonId)
          };
        }
        return m;
      });
      
      dispatch(setModules(updatedModules));
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
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

  const saveLessonName = async (moduleId: string, lessonId: string) => {
    try {
      const lesson = { name: editingLessonInlineName };
      await modulesClient.updateLessonInModule(moduleId, lessonId, lesson);
      
      const updatedModules = modules.map((m: any) => {
        if (m._id === moduleId) {
          return {
            ...m,
            lessons: m.lessons.map((l: any) =>
              l._id === lessonId ? { ...l, name: editingLessonInlineName } : l
            )
          };
        }
        return m;
      });
      
      dispatch(setModules(updatedModules));
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
      {/* Module Controls */}
      {currentUser?.role === "FACULTY" && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={addModuleHandler}
        />
      )}

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
              {currentUser?.role === "FACULTY" && (
                <div className="float-end">
                  <FaPencil 
                    className="text-primary me-3" 
                    style={{ cursor: "pointer" }}
                    onClick={() => startEditingModule(mod._id, mod.name)}
                  />
                  <FaTrash 
                    className="text-danger me-2" 
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteModuleHandler(mod._id)}
                  />
                  <FaCheckCircle className="text-success me-2" />
                  <BsPlus 
                    className="fs-4" 
                    style={{ cursor: "pointer" }}
                    onClick={() => openAddLessonDialog(mod._id)}
                  />
                  <IoEllipsisVertical className="fs-4 ms-1" />
                </div>
              )}
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
                    {currentUser?.role === "FACULTY" && (
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
                    )}
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