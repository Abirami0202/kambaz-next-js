import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const MODULES_API = `${HTTP_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module
  );
  return data;
};

// NEW: Lesson functions
export const addLessonToModule = async (moduleId: string, lesson: any) => {
  const response = await axiosWithCredentials.post(
    `${MODULES_API}/${moduleId}/lessons`,
    lesson
  );
  return response.data;
};

export const deleteLessonFromModule = async (moduleId: string, lessonId: string) => {
  const response = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}/lessons/${lessonId}`
  );
  return response.data;
};

export const updateLessonInModule = async (moduleId: string, lessonId: string, lesson: any) => {
  const response = await axiosWithCredentials.put(
    `${MODULES_API}/${moduleId}/lessons/${lessonId}`,
    lesson
  );
  return response.data;
};