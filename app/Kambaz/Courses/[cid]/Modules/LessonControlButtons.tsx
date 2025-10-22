import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function LessonControlButtons({
  moduleId,
  lessonId,
  deleteLesson,
  editLesson,
}: {
  moduleId: string;
  lessonId: string;
  deleteLesson: (moduleId: string, lessonId: string) => void;
  editLesson: (moduleId: string, lessonId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        onClick={() => editLesson(moduleId, lessonId)}
        className="text-primary me-3"
        style={{ cursor: "pointer" }}
      />
      <FaTrash
        className="text-danger me-2"
        onClick={() => deleteLesson(moduleId, lessonId)}
        style={{ cursor: "pointer" }}
      />
      <FaCheckCircle className="text-success me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}