import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
  showAddLesson,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
  showAddLesson: (moduleId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
        style={{ cursor: "pointer" }}
        title="Edit Module"
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteModule(moduleId)}
        style={{ cursor: "pointer" }}
        title="Delete Module"
      />
      <FaCheckCircle className="text-success me-2" />
      <BsPlus 
        className="fs-1" 
        onClick={() => showAddLesson(moduleId)}
        style={{ cursor: "pointer" }}
        title="Add Lesson"
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}