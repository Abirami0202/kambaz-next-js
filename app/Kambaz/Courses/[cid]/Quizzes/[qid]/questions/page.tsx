"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions, addQuestion, updateQuestion as updateQuestionAction, deleteQuestion as deleteQuestionAction } from "../../Questions/reducer";
import * as questionsClient from "../../Questions/client";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function QuizQuestionsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  
  // Check if user is faculty
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    if (qid) {
      fetchQuestions();
    }
  }, [qid]);

  const fetchQuestions = async () => {
    const fetchedQuestions = await questionsClient.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(fetchedQuestions));
  };

  const handleAddQuestion = async () => {
    const newQuestion = {
      quiz: qid as string,
      title: "Question",
      type: "multiple-choice",
      points: 1,
      question: "",
      choices: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
    };
    const createdQuestion = await questionsClient.createQuestion(qid as string, newQuestion);
    dispatch(addQuestion(createdQuestion));
    setEditingQuestionId(createdQuestion._id);
    setEditingQuestion(createdQuestion);
  };

  const handleEditQuestion = (question: any) => {
    setEditingQuestionId(question._id);
    setEditingQuestion({ ...question });
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion) return;
    const updated = await questionsClient.updateQuestion(editingQuestion._id, editingQuestion);
    dispatch(updateQuestionAction(updated));
    setEditingQuestionId(null);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await questionsClient.deleteQuestion(questionId);
    dispatch(deleteQuestionAction(questionId));
  };

  const handleTypeChange = (newType: string) => {
    const updatedQuestion = { ...editingQuestion, type: newType };
    
    if (newType === "multiple-choice") {
      updatedQuestion.choices = [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ];
      delete updatedQuestion.correctAnswer;
    } else if (newType === "true-false") {
      updatedQuestion.correctAnswer = true;
      delete updatedQuestion.choices;
    } else if (newType === "fill-in-blank") {
      updatedQuestion.choices = [
        { text: "", isCorrect: true },
      ];
      delete updatedQuestion.correctAnswer;
    }
    
    setEditingQuestion(updatedQuestion);
  };

  const handleAddChoice = () => {
    const newChoices = [
      ...(editingQuestion.choices || []),
      { text: "", isCorrect: false },
    ];
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = editingQuestion.choices.filter((_: any, i: number) => i !== index);
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const handleChoiceTextChange = (index: number, text: string) => {
    const newChoices = [...(editingQuestion.choices || [])];
    newChoices[index] = { ...newChoices[index], text: text };
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const handleChoiceCorrectChange = (index: number, isCorrect: boolean) => {
    const newChoices = [...editingQuestion.choices];
    newChoices[index].isCorrect = isCorrect;
    setEditingQuestion({ ...editingQuestion, choices: newChoices });
  };

  const renderQuestionPreview = (question: any) => {
    return (
      <div
        style={{
          border: "1px solid #dee2e6",
          borderRadius: "4px",
          padding: "1.5rem",
          marginBottom: "1rem",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>{question.title}</h4>
            <p style={{ margin: "0.5rem 0", fontSize: "0.9rem", color: "#666" }}>
              Type: {question.type} | Points: {question.points}
            </p>
            <p style={{ margin: "0.5rem 0" }}>{question.question}</p>
            
            {question.type === "multiple-choice" && question.choices && (
              <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
                {question.choices.map((choice: any, idx: number) => (
                  <li key={idx} style={{ marginBottom: "0.5rem" }}>
                    <span style={{ color: choice.isCorrect ? "#28a745" : "#000" }}>
                      {choice.isCorrect && "✓ "}{choice.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            
            {question.type === "true-false" && (
              <div style={{ marginTop: "1rem" }}>
                <div style={{ color: question.correctAnswer ? "#28a745" : "#000" }}>
                  {question.correctAnswer && "✓ "}True
                </div>
                <div style={{ color: !question.correctAnswer ? "#28a745" : "#000" }}>
                  {!question.correctAnswer && "✓ "}False
                </div>
              </div>
            )}
            
            {question.type === "fill-in-blank" && question.choices && (
              <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
                {question.choices.map((choice: any, idx: number) => (
                  <li key={idx} style={{ marginBottom: "0.5rem", color: "#28a745" }}>
                    Blank {idx + 1}: {choice.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Only show Edit/Delete buttons to FACULTY */}
          {isFaculty && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => handleEditQuestion(question)}
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteQuestion(question._id)}
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQuestionEditor = () => {
    if (!editingQuestion) return null;

    return (
      <div
        style={{
          border: "2px solid #007bff",
          borderRadius: "4px",
          padding: "1.5rem",
          marginBottom: "1rem",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Edit Question</h3>

        {/* Question Type Dropdown */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Question Type
          </label>
          <select
            value={editingQuestion.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="fill-in-blank">Fill in the Blank</option>
          </select>
        </div>

        {/* Title */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Title
          </label>
          <input
            type="text"
            value={editingQuestion.title}
            onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Question Text */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Question
          </label>
          <textarea
            value={editingQuestion.question}
            onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
            rows={4}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Points */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Points
          </label>
          <input
            type="number"
            value={editingQuestion.points}
            onChange={(e) => setEditingQuestion({ ...editingQuestion, points: parseInt(e.target.value) })}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Multiple Choice Options */}
        {editingQuestion.type === "multiple-choice" && (
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
              Choices
            </label>
            {editingQuestion.choices?.map((choice: any, index: number) => (
              <div key={index} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "start" }}>
                <input
                  type="checkbox"
                  checked={choice.isCorrect || false}
                  onChange={(e) => handleChoiceCorrectChange(index, e.target.checked)}
                  style={{ marginTop: "0.5rem" }}
                />
                <textarea
                  value={choice.text || ""}
                  onChange={(e) => handleChoiceTextChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  rows={2}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
                <button
                  onClick={() => handleRemoveChoice(index)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleAddChoice}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              Add Choice
            </button>
          </div>
        )}

        {/* True/False */}
        {editingQuestion.type === "true-false" && (
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
              Correct Answer
            </label>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  checked={editingQuestion.correctAnswer === true}
                  onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: true })}
                />
                <span>True</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="radio"
                  checked={editingQuestion.correctAnswer === false}
                  onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: false })}
                />
                <span>False</span>
              </label>
            </div>
          </div>
        )}

        {/* Fill in the Blank */}
        {editingQuestion.type === "fill-in-blank" && (
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
              Possible Answers (Blanks)
            </label>
            {editingQuestion.choices?.map((choice: any, index: number) => (
              <div key={index} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "start" }}>
                <textarea
                  value={choice.text || ""}
                  onChange={(e) => handleChoiceTextChange(index, e.target.value)}
                  placeholder={`Blank ${index + 1} answer`}
                  rows={2}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
                <button
                  onClick={() => handleRemoveChoice(index)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleAddChoice}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              Add Blank
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <button
            onClick={handleCancelEdit}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveQuestion}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Update Question
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Quiz Questions</h1>
        {/* Only show New Question button to FACULTY */}
        {isFaculty && (
          <button
            onClick={handleAddQuestion}
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
            <FaPlus /> New Question
          </button>
        )}
      </div>

      {/* Editor (if editing) - Only show to FACULTY */}
      {editingQuestionId && isFaculty && renderQuestionEditor()}

      {/* Questions List */}
      {questions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          {isFaculty ? (
            <p>No questions yet. Click "New Question" to add one.</p>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      ) : (
        <div>
          {questions
            .filter((q: any) => q._id !== editingQuestionId)
            .map((question: any) => (
              <div key={question._id}>
                {renderQuestionPreview(question)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}