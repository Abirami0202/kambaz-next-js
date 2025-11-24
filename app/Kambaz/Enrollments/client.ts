import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE}/api` || "http://localhost:4000/api";
const ENROLLMENTS_API = `${API_BASE}/users`;

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${userId}/courses/${courseId}`);
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${userId}/courses/${courseId}`);
  return response.data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}/${userId}/enrollments`);
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${API_BASE}/courses/${courseId}/users`);
  return response.data;
}; 
