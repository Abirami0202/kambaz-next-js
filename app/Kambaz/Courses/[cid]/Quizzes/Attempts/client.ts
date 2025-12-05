import axios from "axios";

const REMOTE_SERVER = process.env.NEXT_PUBLIC_REMOTE_SERVER || "http://localhost:4000";
const ATTEMPTS_API = `${REMOTE_SERVER}/api`;

export const findAttemptsForQuiz = async (quizId: string, userId: string) => {
  const response = await axios.get(`${ATTEMPTS_API}/quizzes/${quizId}/attempts`, {
    params: { userId }
  });
  return response.data;
};

export const getLatestAttempt = async (quizId: string, userId: string) => {
  const response = await axios.get(`${ATTEMPTS_API}/quizzes/${quizId}/attempts/latest`, {
    params: { userId }
  });
  return response.data;
};

export const getAttemptCount = async (quizId: string, userId: string) => {
  const response = await axios.get(`${ATTEMPTS_API}/quizzes/${quizId}/attempts/count`, {
    params: { userId }
  });
  return response.data;
};

export const submitAttempt = async (quizId: string, attempt: any) => {
  const response = await axios.post(`${ATTEMPTS_API}/quizzes/${quizId}/attempts`, attempt);
  return response.data;
};

export const findAttemptById = async (attemptId: string) => {
  const response = await axios.get(`${ATTEMPTS_API}/attempts/${attemptId}`);
  return response.data;
};