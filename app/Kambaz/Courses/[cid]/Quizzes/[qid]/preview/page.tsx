"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as quizzesClient from "../../client";
import * as questionsClient from "../../Questions/client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (qid) {
      fetchQuizAndQuestions();
    }
  }, [qid]);

  const fetchQuizAndQuestions = async () => {
    try {
      const [fetchedQuiz, fetchedQuestions] = await Promise.all([
        quizzesClient.findQuizById(qid as string),
        questionsClient.findQuestionsForQuiz(qid as string),
      ]);
      setQuiz(fetchedQuiz);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching quiz or questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleClose = () => {
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  if (!quiz || questions.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>No questions available for preview</h2>
        <button
          onClick={handleClose}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Back to Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem", borderBottom: "2px solid #dee2e6", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>{quiz.title} - Preview</h1>
          <button
            onClick={handleClose}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close Preview
          </button>
        </div>
      </div>

      {/* Question Navigation Bar */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontWeight: "bold", marginRight: "1rem" }}>Questions:</span>
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleJumpToQuestion(index)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: index === currentQuestionIndex ? "#007bff" : "#fff",
              color: index === currentQuestionIndex ? "#fff" : "#000",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: index === currentQuestionIndex ? "bold" : "normal",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current Question Display */}
      <div
        style={{
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "2rem",
          backgroundColor: "#fff",
          minHeight: "400px",
        }}
      >
        {/* Question Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0 }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#007bff" }}>
              {currentQuestion.points} {currentQuestion.points === 1 ? "pt" : "pts"}
            </span>
          </div>
          <h3 style={{ margin: "0.5rem 0", color: "#495057" }}>{currentQuestion.title}</h3>
        </div>

        {/* Question Text */}
        <div
          style={{
            fontSize: "1.1rem",
            marginBottom: "2rem",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            whiteSpace: "pre-wrap",
          }}
        >
          {currentQuestion.question || "No question text provided"}
        </div>

        {/* Multiple Choice Options */}
        {currentQuestion.type === "multiple-choice" && currentQuestion.choices && (
          <div style={{ marginTop: "1.5rem" }}>
            <h4 style={{ marginBottom: "1rem" }}>Select your answer:</h4>
            {currentQuestion.choices.map((choice: any, idx: number) => (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "4px",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  transition: "all 0.2s",
                }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                    disabled
                  />
                  <span style={{ fontSize: "1rem" }}>{choice.text}</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {/* True/False Options */}
        {currentQuestion.type === "true-false" && (
          <div style={{ marginTop: "1.5rem" }}>
            <h4 style={{ marginBottom: "1rem" }}>Select your answer:</h4>
            <div
              style={{
                padding: "1rem",
                border: "2px solid #dee2e6",
                borderRadius: "4px",
                marginBottom: "0.5rem",
                backgroundColor: "#fff",
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="trueFalse"
                  style={{ width: "20px", height: "20px" }}
                  disabled
                />
                <span style={{ fontSize: "1rem" }}>True</span>
              </label>
            </div>
            <div
              style={{
                padding: "1rem",
                border: "2px solid #dee2e6",
                borderRadius: "4px",
                backgroundColor: "#fff",
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="trueFalse"
                  style={{ width: "20px", height: "20px" }}
                  disabled
                />
                <span style={{ fontSize: "1rem" }}>False</span>
              </label>
            </div>
          </div>
        )}

        {/* Fill in the Blank */}
        {currentQuestion.type === "fill-in-blank" && (
          <div style={{ marginTop: "1.5rem" }}>
            <h4 style={{ marginBottom: "1rem" }}>Fill in the blank(s):</h4>
            {currentQuestion.choices?.map((choice: any, idx: number) => (
              <div key={idx} style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Blank {idx + 1}:
                </label>
                <input
                  type="text"
                  placeholder="Enter your answer"
                  disabled
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #dee2e6",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: currentQuestionIndex === 0 ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentQuestionIndex === 0 ? "not-allowed" : "pointer",
            opacity: currentQuestionIndex === 0 ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FaArrowLeft /> Previous
        </button>

        <div style={{ fontSize: "1.1rem", fontWeight: "bold", display: "flex", alignItems: "center" }}>
          {currentQuestionIndex + 1} / {questions.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: currentQuestionIndex === questions.length - 1 ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentQuestionIndex === questions.length - 1 ? "not-allowed" : "pointer",
            opacity: currentQuestionIndex === questions.length - 1 ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
}