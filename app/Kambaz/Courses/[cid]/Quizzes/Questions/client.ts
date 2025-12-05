import axios from "axios";

const REMOTE_SERVER = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
const QUESTIONS_API = `${REMOTE_SERVER}/api`;

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUESTIONS_API}/quizzes/${quizId}/questions`);
  return response.data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const response = await axios.post(
    `${QUESTIONS_API}/quizzes/${quizId}/questions`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUESTIONS_API}/questions/${questionId}`);
  return response.data;
};

export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axios.put(`${QUESTIONS_API}/questions/${questionId}`, question);
  return response.data;
};

export const findQuestionById = async (questionId: string) => {
  const response = await axios.get(`${QUESTIONS_API}/questions/${questionId}`);
  return response.data;
};