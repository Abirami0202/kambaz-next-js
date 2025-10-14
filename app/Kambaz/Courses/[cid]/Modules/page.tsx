"use client";

import Link from "next/link";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { Button, Dropdown, ListGroup } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

export default function Modules() {
  const params = useParams();
  const cid = params.cid as string;
  
  // Filter modules for the current course
  const courseModules = db.modules.filter(
    (module: any) => module.course === cid
  );

  return (
    <div style={{ padding: "1rem" }}>
      {/* Module Controls */}
      <div id="wd-modules-controls" className="text-nowrap mb-4">
        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-collapse-all">
          Collapse All
        </Button>
        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
          View Progress
        </Button>
        <Dropdown className="float-end me-2">
          <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
            <FaCheckCircle className="text-success me-2" />
            Publish All
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id="wd-publish-all">
              <FaCheckCircle className="text-success me-2" />
              Publish All
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-all-modules-and-items">
              <FaCheckCircle className="text-success me-2" />
              Publish all modules and items
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-modules-only">
              <FaCheckCircle className="text-success me-2" />
              Publish modules only
            </Dropdown.Item>
            <Dropdown.Item id="wd-unpublish-all-modules-and-items">
              Unpublish all modules and items
            </Dropdown.Item>
            <Dropdown.Item id="wd-unpublish-modules-only">
              Unpublish modules only
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
          <BsPlus className="fs-4 mb-1" />
          Module
        </Button>
      </div>

      <br /><br /><br />

      {/* Modules List */}
      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((module: any) => (
          <ListGroup.Item key={module._id} className="p-0 mb-5 fs-5 border-gray">
            {/* Module Title */}
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {module.name}
              {/* Module Control Buttons */}
              <div className="float-end">
                <FaCheckCircle className="text-success me-2" />
                <BsPlus className="fs-4" />
                <IoEllipsisVertical className="fs-4" />
              </div>
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
                    {lesson.name}
                    {/* Lesson Control Buttons */}
                    <div className="float-end">
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
    </div>
  );
}