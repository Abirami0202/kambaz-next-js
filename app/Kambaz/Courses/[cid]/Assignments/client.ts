import axios from "axios";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE}/api` || "http://localhost:4000/api";

export const fetchAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/courses/${courseId}/assignments`);
  return response.data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const response = await axios.post(`${API_BASE}/courses/${courseId}/assignments`, assignment);
  return response.data;
};

export const fetchAssignmentById = async (assignmentId: string) => {
  const response = await axios.get(`${API_BASE}/assignments/${assignmentId}`);
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${API_BASE}/assignments/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignmentId: string, assignment: any) => {
  const response = await axios.put(`${API_BASE}/assignments/${assignmentId}`, assignment);
  return response.data;
}; 
