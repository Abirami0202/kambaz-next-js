import axios from "axios";

const REMOTE_SERVER = process.env.NEXT_PUBLIC_REMOTE_SERVER || "http://localhost:4000";
const QUIZZES_API = `${REMOTE_SERVER}/api`;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${QUIZZES_API}/courses/${courseId}/quizzes`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/courses/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/quizzes/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/quizzes/${quizId}`, quiz);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}`);
  return response.data;
};