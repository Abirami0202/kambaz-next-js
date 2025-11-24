import axios from "axios";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE}/api` || "http://localhost:4000/api";

export const fetchModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/courses/${courseId}/modules`);
  return response.data;
};

export const createModule = async (courseId: string, module: any) => {
  const response = await axios.post(`${API_BASE}/courses/${courseId}/modules`, module);
  return response.data;
};

export const deleteModule = async (moduleId: string) => {
  const response = await axios.delete(`${API_BASE}/modules/${moduleId}`);
  return response.data;
};

export const updateModule = async (moduleId: string, module: any) => {
  const response = await axios.put(`${API_BASE}/modules/${moduleId}`, module);
  return response.data;
};

export const addLessonToModule = async (moduleId: string, lesson: any) => {
  const response = await axios.post(`${API_BASE}/modules/${moduleId}/lessons`, lesson);
  return response.data;
};

export const deleteLessonFromModule = async (moduleId: string, lessonId: string) => {
  const response = await axios.delete(`${API_BASE}/modules/${moduleId}/lessons/${lessonId}`);
  return response.data;
};

export const updateLessonInModule = async (moduleId: string, lessonId: string, lesson: any) => {
  const response = await axios.put(`${API_BASE}/modules/${moduleId}/lessons/${lessonId}`, lesson);
  return response.data;
};