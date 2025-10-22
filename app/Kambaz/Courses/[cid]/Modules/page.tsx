/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { ListGroup } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  addModule, 
  deleteModule, 
  updateModule, 
  editModule,
  addLesson,
  deleteLesson,
  updateLesson,
  editLesson
} from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import LessonEditor from "./LessonEditor";

export default function Modules() {
  const params = useParams();
  const cid = params.cid as string;
  const [moduleName, setModuleName] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [showLessonDialog, setShowLessonDialog] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState("");
  
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  // Filter modules for current course
  const courseModules = modules.filter((module: any) => module.course === cid);

  const handleAddModule = () => {
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName("");
  };

  const handleDeleteModule = (moduleId: string) => {
    dispatch(deleteModule(moduleId));
  };

  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };

  const handleUpdateModule = (module: any) => {
    dispatch(updateModule(module));
  };

  const handleShowAddLesson = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setShowLessonDialog(true);
  };

  const handleAddLesson = () => {
    dispatch(addLesson({ moduleId: currentModuleId, lessonName }));
    setLessonName("");
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    dispatch(deleteLesson({ moduleId, lessonId }));
  };

  const handleEditLesson = (moduleId: string, lessonId: string) => {
    dispatch(editLesson({ moduleId, lessonId }));
  };

  const handleUpdateLesson = (moduleId: string, lesson: any) => {
    dispatch(updateLesson({ moduleId, lesson }));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={handleAddModule}
      />

      <LessonEditor
        show={showLessonDialog}
        handleClose={() => setShowLessonDialog(false)}
        lessonName={lessonName}
        setLessonName={setLessonName}
        addLesson={handleAddLesson}
      />

      <br /><br /><br />

      {/* Modules List */}
      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((module: any) => (
          <ListGroup.Item key={module._id} className="p-0 mb-5 fs-5 border-gray">
            {/* Module Title */}
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              
              {/* Show input field if editing, otherwise show name */}
              {!module.editing && module.name}
              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) =>
                    handleUpdateModule({ ...module, name: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdateModule({ ...module, editing: false });
                    }
                  }}
                />
              )}
              
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={handleDeleteModule}
                editModule={handleEditModule}
                showAddLesson={handleShowAddLesson}
              />
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
                    
                    {/* Show input field if editing, otherwise show name */}
                    {!lesson.editing && lesson.name}
                    {lesson.editing && (
                      <input
                        className="form-control w-50 d-inline-block"
                        value={lesson.name}
                        onChange={(e) =>
                          handleUpdateLesson(module._id, { ...lesson, name: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUpdateLesson(module._id, { ...lesson, editing: false });
                          }
                        }}
                      />
                    )}
                    
                    <LessonControlButtons
                      moduleId={module._id}
                      lessonId={lesson._id}
                      deleteLesson={handleDeleteLesson}
                      editLesson={handleEditLesson}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}