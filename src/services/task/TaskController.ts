import { apiInstance } from "../api";
import type { APIResponse } from "../../models/ApiResponseModel";
import { TaskApiResponse } from "../../models/TaskApiResponseModel";
import { CreateTask } from "../../models/TaskRequestModels";

//Crea una task
export async function createTask(task: CreateTask) {
  return await apiInstance.post<APIResponse<TaskApiResponse>>("/todo", task);
}

// Recibe todas las tasks
export async function getTasks() {
  return await apiInstance.get<APIResponse<TaskApiResponse[]>>("/todo");
}

// Recibe una task
export async function getTask(id: number) {
  return await apiInstance.get<APIResponse<TaskApiResponse>>(`/todo/${id}`);
}

// Actualiza una task
export async function updateTask(id: number, task: CreateTask) {
  return await apiInstance.put<APIResponse<TaskApiResponse>>(
    `/todo/${id}`,
    task
  );
}

// Borra una task
export function deleteTask(id: number) {
  return apiInstance.delete(`/todo/${id}`);
}
