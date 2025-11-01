"use client";

import { Button, Dropdown } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import { useState } from "react";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap mb-4">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        onClick={handleShow}
        id="wd-add-module-btn"
      >
        <BsPlus className="fs-4 mb-1" />
        Module
      </Button>
      
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-collapse-all"
        style={{
          backgroundColor: "#6c757d",
          color: "black",
          borderColor: "#6c757d",
        }}
      >
        Collapse All
      </Button>
      
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-view-progress"
        style={{
          backgroundColor: "#6c757d",
          color: "black",
          borderColor: "#6c757d",
        }}
      >
        View Progress
      </Button>
      
      <Dropdown className="float-end me-2">
        <Dropdown.Toggle
          variant="secondary"
          size="lg"
          id="wd-publish-all-btn"
          style={{
            backgroundColor: "#6c757d",
            color: "black",
            borderColor: "#6c757d",
          }}
        >
          <FaCheckCircle className="text-success me-2" />
          Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <FaCheckCircle className="text-success me-2" />
            Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <FaCheckCircle className="text-success me-2" />
            Publish modules only
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            <FaBan className="me-2" />
            Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            <FaBan className="me-2" />
            Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          addModule();
          handleClose();
        }}
      />
    </div>
  );
}