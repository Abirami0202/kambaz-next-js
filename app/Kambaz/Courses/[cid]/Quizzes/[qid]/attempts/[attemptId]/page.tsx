"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as attemptsClient from "../../../Attempts/client";
import * as questionsClient from "../../../Questions/client";
import * as quizzesClient from "../../../client";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function AttemptResultsPage() {
  const { cid, qid, attemptId } = useParams();
  const router = useRouter();
  
  const [attempt, setAttempt] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (attemptId && qid) {
      fetchAttemptData();
    }
  }, [attemptId, qid]);

  const fetchAttemptData = async () => {
    try {
      const [fetchedAttempt, fetchedQuestions, fetchedQuiz] = await Promise.all([
        attemptsClient.findAttemptById(attemptId as string),
        questionsClient.findQuestionsForQuiz(qid as string),
        quizzesClient.findQuizById(qid as string),
      ]);
      
      setAttempt(fetchedAttempt);
      setQuestions(fetchedQuestions);
      setQuiz(fetchedQuiz);
    } catch (error) {
      console.error("Error fetching attempt data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserAnswer = (questionId: string) => {
    const answerObj = attempt.answers.find((a: any) => a.question === questionId);
    return answerObj?.answer;
  };

  const isQuestionCorrect = (question: any) => {
    const userAnswer = getUserAnswer(question._id);

    if (question.type === "multiple-choice") {
      const correctIndices = question.choices
        .map((c: any, idx: number) => (c.isCorrect ? idx : -1))
        .filter((idx: number) => idx !== -1);
      
      const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [];
      return (
        correctIndices.length === userAnswerArray.length &&
        correctIndices.every((idx: number) => userAnswerArray.includes(idx))
      );
    } else if (question.type === "true-false") {
      return userAnswer === question.correctAnswer;
    } else if (question.type === "fill-in-blank") {
      return question.choices.every((choice: any, idx: number) => {
        const userAns = (userAnswer[idx] || "").trim().toLowerCase();
        const correctAns = choice.text.trim().toLowerCase();
        return userAns === correctAns;
      });
    }

    return false;
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading results...</div>;
  }

  if (!attempt || !quiz) {
    return <div style={{ padding: "2rem" }}>Attempt not found</div>;
  }

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem", borderBottom: "2px solid #dee2e6", paddingBottom: "1rem" }}>
        <h1>{quiz.title} - Results</h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
          <div>
            <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              Attempt {attempt.attemptNumber}
            </p>
            <p style={{ color: "#666" }}>
              Submitted: {new Date(attempt.submittedAt).toLocaleString()}
            </p>
          </div>
          <div
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#007bff" }}>
              {attempt.score} / {totalPoints}
            </div>
            <div style={{ fontSize: "1.2rem", color: "#666" }}>
              {totalPoints > 0 ? Math.round((attempt.score / totalPoints) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Questions with Answers */}
      <div>
        {questions.map((question, index) => {
          const isCorrect = isQuestionCorrect(question);
          const userAnswer = getUserAnswer(question._id);

          return (
            <div
              key={question._id}
              style={{
                border: `2px solid ${isCorrect ? "#28a745" : "#dc3545"}`,
                borderRadius: "8px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
                backgroundColor: isCorrect ? "#f8fff9" : "#fff8f8",
              }}
            >
              {/* Question Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0 }}>
                    Question {index + 1}: {question.title}
                  </h3>
                  <p style={{ marginTop: "0.5rem", color: "#666" }}>
                    {question.points} pts
                  </p>
                </div>
                <div style={{ fontSize: "2rem", color: isCorrect ? "#28a745" : "#dc3545" }}>
                  {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                </div>
              </div>

              {/* Question Text */}
              <p style={{ marginBottom: "1rem", whiteSpace: "pre-wrap" }}>{question.question}</p>

              {/* Multiple Choice Answers */}
              {question.type === "multiple-choice" && (
                <div>
                  {question.choices?.map((choice: any, idx: number) => {
                    const isUserChoice = (userAnswer || []).includes(idx);
                    const isCorrectChoice = choice.isCorrect;

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: "0.75rem",
                          border: "1px solid #dee2e6",
                          borderRadius: "4px",
                          marginBottom: "0.5rem",
                          backgroundColor: isCorrectChoice
                            ? "#d4edda"
                            : isUserChoice
                            ? "#f8d7da"
                            : "#fff",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {isUserChoice && <span>✓ Your answer</span>}
                          {isCorrectChoice && <span style={{ color: "#28a745" }}>✓ Correct</span>}
                          {!isCorrectChoice && !isUserChoice && <span>{choice.text}</span>}
                          {(isUserChoice || isCorrectChoice) && <span>- {choice.text}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* True/False Answers */}
              {question.type === "true-false" && (
                <div>
                  <p>
                    <strong>Your Answer:</strong> {userAnswer === true ? "True" : userAnswer === false ? "False" : "Not answered"}
                  </p>
                  <p style={{ color: "#28a745" }}>
                    <strong>Correct Answer:</strong> {question.correctAnswer ? "True" : "False"}
                  </p>
                </div>
              )}

              {/* Fill in Blank Answers */}
              {question.type === "fill-in-blank" && (
                <div>
                  {question.choices?.map((choice: any, idx: number) => {
                    const userAns = (userAnswer[idx] || "").trim();
                    const correctAns = choice.text.trim();
                    const isBlankCorrect = userAns.toLowerCase() === correctAns.toLowerCase();

                    return (
                      <div key={idx} style={{ marginBottom: "1rem" }}>
                        <p>
                          <strong>Blank {idx + 1}:</strong>
                        </p>
                        <p>Your Answer: <span style={{ color: isBlankCorrect ? "#28a745" : "#dc3545" }}>{userAns || "(empty)"}</span></p>
                        <p style={{ color: "#28a745" }}>Correct Answer: {correctAns}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Back Button */}
      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={() => router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to Quiz Details
        </button>
      </div>
    </div>
  );
}