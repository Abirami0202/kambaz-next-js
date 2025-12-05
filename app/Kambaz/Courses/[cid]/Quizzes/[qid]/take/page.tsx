"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import * as quizzesClient from "../../client";
import * as questionsClient from "../../Questions/client";
import * as attemptsClient from "../../Attempts/client";
import { addAttempt } from "../../Attempts/reducer";

export default function TakeQuizPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    if (qid && currentUser) {
      fetchQuizData();
    }
  }, [qid, currentUser]);

  const fetchQuizData = async () => {
    try {
      const [fetchedQuiz, fetchedQuestions, countData] = await Promise.all([
        quizzesClient.findQuizById(qid as string),
        questionsClient.findQuestionsForQuiz(qid as string),
        attemptsClient.getAttemptCount(qid as string, currentUser._id),
      ]);
      
      setQuiz(fetchedQuiz);
      setQuestions(fetchedQuestions);
      setAttemptCount(countData.count);
      
      // Initialize answers object
      const initialAnswers: any = {};
      fetchedQuestions.forEach((q: any) => {
        if (q.type === "multiple-choice") {
          initialAnswers[q._id] = [];
        } else if (q.type === "true-false") {
          initialAnswers[q._id] = null;
        } else if (q.type === "fill-in-blank") {
          initialAnswers[q._id] = q.choices?.map(() => "") || [];
        }
      });
      setAnswers(initialAnswers);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleMultipleChoiceChange = (questionId: string, choiceIndex: number, isChecked: boolean) => {
    const currentAnswers = answers[questionId] || [];
    if (isChecked) {
      setAnswers({
        ...answers,
        [questionId]: [...currentAnswers, choiceIndex],
      });
    } else {
      setAnswers({
        ...answers,
        [questionId]: currentAnswers.filter((i: number) => i !== choiceIndex),
      });
    }
  };

  const handleFillInBlankChange = (questionId: string, blankIndex: number, value: string) => {
    const currentAnswers = [...(answers[questionId] || [])];
    currentAnswers[blankIndex] = value;
    setAnswers({
      ...answers,
      [questionId]: currentAnswers,
    });
  };

  const calculateScore = () => {
    let totalScore = 0;
    
    questions.forEach((question) => {
      const userAnswer = answers[question._id];
      let isCorrect = false;

      if (question.type === "multiple-choice") {
        const correctIndices = question.choices
          .map((c: any, idx: number) => (c.isCorrect ? idx : -1))
          .filter((idx: number) => idx !== -1);
        
        const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [];
        isCorrect =
          correctIndices.length === userAnswerArray.length &&
          correctIndices.every((idx: number) => userAnswerArray.includes(idx));
      } else if (question.type === "true-false") {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === "fill-in-blank") {
        isCorrect = question.choices.every((choice: any, idx: number) => {
          const userAns = (userAnswer[idx] || "").trim().toLowerCase();
          const correctAns = choice.text.trim().toLowerCase();
          return userAns === correctAns;
        });
      }

      if (isCorrect) {
        totalScore += question.points || 0;
      }
    });

    return totalScore;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    
    const attemptData = {
      quiz: qid as string,
      user: currentUser._id,
      course: cid as string,
      attemptNumber: attemptCount + 1,
      score,
      answers: Object.keys(answers).map((questionId) => ({
        question: questionId,
        answer: answers[questionId],
      })),
    };

    try {
      const newAttempt = await attemptsClient.submitAttempt(qid as string, attemptData);
      dispatch(addAttempt(newAttempt));
      router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempts/${newAttempt._id}`);
    } catch (error) {
      console.error("Error submitting attempt:", error);
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

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading quiz...</div>;
  }

  if (!quiz || !currentUser) {
    return <div style={{ padding: "2rem" }}>Quiz not found</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem", borderBottom: "2px solid #dee2e6", paddingBottom: "1rem" }}>
        <h1>{quiz.title}</h1>
        <p style={{ color: "#666" }}>
          Attempt {attemptCount + 1} | Time Limit: {quiz.timeLimit} minutes
        </p>
      </div>

      {/* Question Navigation */}
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
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current Question */}
      {currentQuestion && (
        <div
          style={{
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            padding: "2rem",
            backgroundColor: "#fff",
            minHeight: "400px",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <h2>
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p style={{ fontWeight: "bold", fontSize: "1.1rem", marginTop: "1rem" }}>
              {currentQuestion.title} ({currentQuestion.points} pts)
            </p>
            <p style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
              {currentQuestion.question}
            </p>
          </div>

          {/* Multiple Choice */}
          {currentQuestion.type === "multiple-choice" && (
            <div>
              {currentQuestion.choices?.map((choice: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    padding: "1rem",
                    border: "2px solid #dee2e6",
                    borderRadius: "4px",
                    marginBottom: "0.5rem",
                  }}
                >
                  <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={(answers[currentQuestion._id] || []).includes(idx)}
                      onChange={(e) =>
                        handleMultipleChoiceChange(currentQuestion._id, idx, e.target.checked)
                      }
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span>{choice.text}</span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* True/False */}
          {currentQuestion.type === "true-false" && (
            <div>
              <div
                style={{
                  padding: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "4px",
                  marginBottom: "0.5rem",
                }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    checked={answers[currentQuestion._id] === true}
                    onChange={() => handleAnswerChange(currentQuestion._id, true)}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span>True</span>
                </label>
              </div>
              <div
                style={{
                  padding: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "4px",
                }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    checked={answers[currentQuestion._id] === false}
                    onChange={() => handleAnswerChange(currentQuestion._id, false)}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span>False</span>
                </label>
              </div>
            </div>
          )}

          {/* Fill in the Blank */}
          {currentQuestion.type === "fill-in-blank" && (
            <div>
              {currentQuestion.choices?.map((choice: any, idx: number) => (
                <div key={idx} style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Blank {idx + 1}:
                  </label>
                  <input
                    type="text"
                    value={(answers[currentQuestion._id] || [])[idx] || ""}
                    onChange={(e) =>
                      handleFillInBlankChange(currentQuestion._id, idx, e.target.value)
                    }
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
      )}

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
          }}
        >
          Previous
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}