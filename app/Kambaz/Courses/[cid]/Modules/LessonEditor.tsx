import { Modal, Button } from "react-bootstrap";

export default function LessonEditor({
  show,
  handleClose,
  lessonName,
  setLessonName,
  addLesson,
}: {
  show: boolean;
  handleClose: () => void;
  lessonName: string;
  setLessonName: (name: string) => void;
  addLesson: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className="form-control"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          placeholder="Lesson Name"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            addLesson();
            handleClose();
          }}
        >
          Add Lesson
        </Button>
      </Modal.Footer>
    </Modal>
  );
}