"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as quizzesClient from "../client";
import { updateQuiz as updateQuizAction } from "../reducer";
import { FaCheckCircle, FaBan } from "react-icons/fa";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is faculty
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    if (qid) {
      fetchQuiz();
    }
  }, [qid]);

  const fetchQuiz = async () => {
    try {
      const fetchedQuiz = await quizzesClient.findQuizById(qid as string);
      setQuiz(fetchedQuiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async () => {
    if (!quiz) return;
    const updatedQuiz = { ...quiz, published: !quiz.published };
    const result = await quizzesClient.updateQuiz(quiz._id, updatedQuiz);
    setQuiz(result);
    dispatch(updateQuizAction(result));
  };

  const handleEdit = () => {
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  const handlePreview = () => {
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  if (!quiz) {
    return <div style={{ padding: "2rem" }}>Quiz not found</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header with Title and Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0 }}>{quiz.title}</h1>
        {/* Only show control buttons to FACULTY */}
        {isFaculty && (
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={handleTogglePublish}
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: quiz.published ? "#6c757d" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {quiz.published ? (
                <>
                  <FaBan /> Unpublish
                </>
              ) : (
                <>
                  <FaCheckCircle /> Publish
                </>
              )}
            </button>
            <button
              onClick={handlePreview}
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Preview
            </button>
            <button
              onClick={handleEdit}
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Quiz Summary */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "2rem",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "1.5rem", borderBottom: "2px solid #dee2e6", paddingBottom: "0.5rem" }}>
          Quiz Summary
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Left Column */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>Quiz Type:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.quizType || "Graded Quiz"}</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Points:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.points || 0}</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Assignment Group:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.assignmentGroup || "Quizzes"}</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Shuffle Answers:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.shuffleAnswers ? "Yes" : "No"}</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Time Limit:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.timeLimit || 20} minutes</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Multiple Attempts:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.multipleAttempts ? "Yes" : "No"}</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Show Correct Answers:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.showCorrectAnswers || "Immediately"}</div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>Access Code:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.accessCode || "None"}</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>One Question at a Time:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Webcam Required:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.webcamRequired ? "Yes" : "No"}</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Lock Questions After Answering:</strong>
              <div style={{ marginTop: "0.25rem" }}>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Due Date:</strong>
              <div style={{ marginTop: "0.25rem" }}>
                {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "Not set"}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Available Date:</strong>
              <div style={{ marginTop: "0.25rem" }}>
                {quiz.availableDate ? new Date(quiz.availableDate).toLocaleString() : "Not set"}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Until Date:</strong>
              <div style={{ marginTop: "0.25rem" }}>
                {quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : "Not set"}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <strong>Published:</strong>
              <div style={{ marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {quiz.published ? (
                  <>
                    <FaCheckCircle style={{ color: "#28a745" }} /> Yes
                  </>
                ) : (
                  <>
                    <FaBan style={{ color: "#dc3545" }} /> No
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {quiz.description && (
          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #dee2e6" }}>
            <strong>Description:</strong>
            <div style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>{quiz.description}</div>
          </div>
        )}
      </div>
    </div>
  );
}