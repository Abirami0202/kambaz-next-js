"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as quizzesClient from "../../client";
import { updateQuiz as updateQuizAction } from "../../reducer";

export default function QuizEditorPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    timeLimitEnabled: false,
    multipleAttempts: false,
    showCorrectAnswers: "immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    published: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (qid) {
      fetchQuiz();
    }
  }, [qid]);

  const fetchQuiz = async () => {
    try {
      const fetchedQuiz = await quizzesClient.findQuizById(qid as string);
      setQuiz({
        ...fetchedQuiz,
        timeLimitEnabled: fetchedQuiz.timeLimit > 0,
      });
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setQuiz({
      ...quiz,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    const updatedQuiz = await quizzesClient.updateQuiz(qid as string, quiz);
    dispatch(updateQuizAction(updatedQuiz));
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    const publishedQuiz = { ...quiz, published: true };
    const updatedQuiz = await quizzesClient.updateQuiz(qid as string, publishedQuiz);
    dispatch(updateQuizAction(updatedQuiz));
    router.push(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    router.push(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleQuestionsTab = () => {
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/questions`);
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Tabs */}
      <div style={{ borderBottom: "2px solid #dee2e6", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => setActiveTab("details")}
            style={{
              padding: "0.75rem 1.5rem",
              border: "none",
              background: "none",
              cursor: "pointer",
              borderBottom: activeTab === "details" ? "3px solid #dc3545" : "none",
              fontWeight: activeTab === "details" ? "bold" : "normal",
              color: activeTab === "details" ? "#dc3545" : "#000",
            }}
          >
            Details
          </button>
          <button
            onClick={handleQuestionsTab}
            style={{
              padding: "0.75rem 1.5rem",
              border: "none",
              background: "none",
              cursor: "pointer",
              borderBottom: activeTab === "questions" ? "3px solid #dc3545" : "none",
              fontWeight: activeTab === "questions" ? "bold" : "normal",
              color: activeTab === "questions" ? "#dc3545" : "#000",
            }}
          >
            Questions
          </button>
        </div>
      </div>

      {/* Details Tab Content */}
      {activeTab === "details" && (
        <div>
          <h2 style={{ marginBottom: "1.5rem" }}>Edit Quiz Details</h2>

          <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Title */}
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                Title
              </label>
              <input
                type="text"
                name="title"
                value={quiz.title}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                Description
              </label>
              <textarea
                name="description"
                value={quiz.description}
                onChange={handleInputChange}
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Quiz Type */}
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                Quiz Type
              </label>
              <select
                name="quizType"
                value={quiz.quizType}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </select>
            </div>

            {/* Points */}
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                Points
              </label>
              <input
                type="number"
                name="points"
                value={quiz.points}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Assignment Group */}
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                Assignment Group
              </label>
              <select
                name="assignmentGroup"
                value={quiz.assignmentGroup}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              >
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
              </select>
            </div>

            {/* Options Section */}
            <div style={{ border: "1px solid #dee2e6", borderRadius: "4px", padding: "1.5rem" }}>
              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>Options</h3>

              {/* Shuffle Answers */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    name="shuffleAnswers"
                    checked={quiz.shuffleAnswers}
                    onChange={handleInputChange}
                  />
                  <span>Shuffle Answers</span>
                </label>
              </div>

              {/* Time Limit */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <input
                    type="checkbox"
                    name="timeLimitEnabled"
                    checked={quiz.timeLimitEnabled}
                    onChange={handleInputChange}
                  />
                  <span>Time Limit</span>
                </label>
                {quiz.timeLimitEnabled && (
                  <div style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
                    <input
                      type="number"
                      name="timeLimit"
                      value={quiz.timeLimit}
                      onChange={handleInputChange}
                      style={{
                        width: "100px",
                        padding: "0.5rem",
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                      }}
                    />
                    <span style={{ marginLeft: "0.5rem" }}>minutes</span>
                  </div>
                )}
              </div>

              {/* Multiple Attempts */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    name="multipleAttempts"
                    checked={quiz.multipleAttempts}
                    onChange={handleInputChange}
                  />
                  <span>Allow Multiple Attempts</span>
                </label>
              </div>

              {/* One Question at a Time */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    name="oneQuestionAtATime"
                    checked={quiz.oneQuestionAtATime}
                    onChange={handleInputChange}
                  />
                  <span>One Question at a Time</span>
                </label>
              </div>

              {/* Webcam Required */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    name="webcamRequired"
                    checked={quiz.webcamRequired}
                    onChange={handleInputChange}
                  />
                  <span>Webcam Required</span>
                </label>
              </div>

              {/* Lock Questions After Answering */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    name="lockQuestionsAfterAnswering"
                    checked={quiz.lockQuestionsAfterAnswering}
                    onChange={handleInputChange}
                  />
                  <span>Lock Questions After Answering</span>
                </label>
              </div>
            </div>

            {/* Show Correct Answers */}
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                Show Correct Answers
              </label>
              <select
                name="showCorrectAnswers"
                value={quiz.showCorrectAnswers}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              >
                <option value="immediately">Immediately</option>
                <option value="after_due_date">After Due Date</option>
                <option value="never">Never</option>
              </select>
            </div>

            {/* Access Code */}
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                Access Code
              </label>
              <input
                type="text"
                name="accessCode"
                value={quiz.accessCode}
                onChange={handleInputChange}
                placeholder="Optional"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Dates Section */}
            <div style={{ border: "1px solid #dee2e6", borderRadius: "4px", padding: "1.5rem" }}>
              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>Assign</h3>

              {/* Due Date */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  name="dueDate"
                  value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ""}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              {/* Available Date */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Available From
                </label>
                <input
                  type="datetime-local"
                  name="availableDate"
                  value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : ""}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              {/* Until Date */}
              <div>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Until
                </label>
                <input
                  type="datetime-local"
                  name="untilDate"
                  value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().slice(0, 16) : ""}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "2rem" }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleSaveAndPublish}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Save & Publish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}