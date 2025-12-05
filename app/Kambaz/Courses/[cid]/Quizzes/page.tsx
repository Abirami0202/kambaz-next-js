"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes, addQuiz, deleteQuiz as deleteQuizAction, updateQuiz as updateQuizAction } from "./reducer";
import * as quizzesClient from "./client";
import * as questionsClient from "./Questions/client";
import * as attemptsClient from "./Attempts/client";
import { FaPlus, FaEllipsisV, FaCheckCircle } from "react-icons/fa";

export default function QuizzesPage() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [quizDetails, setQuizDetails] = useState<any>({});
  
  // Check if user is faculty
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  useEffect(() => {
    if (cid) {
      fetchQuizzes();
    }
  }, [cid]);

  useEffect(() => {
    if (quizzes.length > 0) {
      fetchQuizDetails();
    }
  }, [quizzes, currentUser]);

  const fetchQuizzes = async () => {
    const fetchedQuizzes = await quizzesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(fetchedQuizzes));
  };

  const fetchQuizDetails = async () => {
    const details: any = {};
    
    for (const quiz of quizzes) {
      try {
        // Fetch question count
        const questions = await questionsClient.findQuestionsForQuiz(quiz._id);
        details[quiz._id] = {
          questionCount: questions.length,
        };

        // For students, fetch latest attempt
        if (isStudent && currentUser) {
          const latestAttempt = await attemptsClient.getLatestAttempt(quiz._id, currentUser._id);
          if (latestAttempt) {
            details[quiz._id].latestScore = latestAttempt.score;
          }
        }
      } catch (error) {
        console.error(`Error fetching details for quiz ${quiz._id}:`, error);
      }
    }
    
    setQuizDetails(details);
  };

  const handleAddQuiz = async () => {
    const newQuiz = {
      title: "New Quiz",
      course: cid as string,
      published: false,
      availableDate: new Date().toISOString(),
    };
    const createdQuiz = await quizzesClient.createQuiz(cid as string, newQuiz);
    dispatch(addQuiz(createdQuiz));
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${createdQuiz._id}`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuizAction(quizId));
    setOpenMenuId(null);
  };

  const handleTogglePublish = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    const result = await quizzesClient.updateQuiz(quiz._id, updatedQuiz);
    dispatch(updateQuizAction(result));
    setOpenMenuId(null);
  };

  const handleQuizClick = (quizId: string) => {
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
  };

  const toggleMenu = (quizId: string) => {
    setOpenMenuId(openMenuId === quizId ? null : quizId);
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!availableDate) {
      return { status: "Available", color: "#28a745" };
    }

    if (now < availableDate) {
      return {
        status: `Not available until ${availableDate.toLocaleDateString()}`,
        color: "#dc3545",
      };
    }

    if (untilDate && now > untilDate) {
      return { status: "Closed", color: "#6c757d" };
    }

    return { status: "Available", color: "#28a745" };
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h1>Quizzes</h1>
        {/* Only show Add Quiz button to FACULTY */}
        {isFaculty && (
          <button
            onClick={handleAddQuiz}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FaPlus /> Quiz
          </button>
        )}
      </div>

      {quizzes.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          {isFaculty ? (
            <p>No quizzes yet. Click the "+ Quiz" button to create one.</p>
          ) : (
            <p>No quizzes available.</p>
          )}
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {quizzes.map((quiz: any) => (
            <li
              key={quiz._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "1rem",
                marginBottom: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                {quiz.published && (
                  <FaCheckCircle style={{ color: "#28a745", fontSize: "1.2rem" }} />
                )}
                <div style={{ flex: 1 }}>
                  <h3
                    onClick={() => handleQuizClick(quiz._id)}
                    style={{
                      margin: 0,
                      cursor: "pointer",
                      color: "#007bff",
                      textDecoration: "none",
                    }}
                  >
                    {quiz.title}
                  </h3>
                  
                  {/* Additional Quiz Info */}
                  <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
                    {/* Availability Status */}
                    <div style={{ marginBottom: "0.25rem" }}>
                      <strong style={{ color: getAvailabilityStatus(quiz).color }}>
                        {getAvailabilityStatus(quiz).status}
                      </strong>
                    </div>
                    
                    {/* Due Date */}
                    {quiz.dueDate && (
                      <div style={{ marginBottom: "0.25rem" }}>
                        <strong>Due:</strong> {new Date(quiz.dueDate).toLocaleDateString()} at {new Date(quiz.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                    
                    {/* Points */}
                    <div style={{ marginBottom: "0.25rem" }}>
                      <strong>Points:</strong> {quiz.points || 0}
                    </div>
                    
                    {/* Number of Questions */}
                    {quizDetails[quiz._id] && (
                      <div style={{ marginBottom: "0.25rem" }}>
                        <strong>Questions:</strong> {quizDetails[quiz._id].questionCount || 0}
                      </div>
                    )}
                    
                    {/* Student Score */}
                    {isStudent && quizDetails[quiz._id]?.latestScore !== undefined && (
                      <div style={{ marginBottom: "0.25rem" }}>
                        <strong>Your Score:</strong> {quizDetails[quiz._id].latestScore} / {quiz.points}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Only show 3-dot menu to FACULTY */}
              {isFaculty && (
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => toggleMenu(quiz._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      padding: "0.5rem",
                    }}
                  >
                    <FaEllipsisV />
                  </button>

                  {openMenuId === quiz._id && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 1000,
                        minWidth: "150px",
                      }}
                    >
                      <button
                        onClick={() => handleTogglePublish(quiz)}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.5rem 1rem",
                          textAlign: "left",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                      >
                        {quiz.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() => handleDeleteQuiz(quiz._id)}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.5rem 1rem",
                          textAlign: "left",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          color: "#dc3545",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}