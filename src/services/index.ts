import { Login, CreateUser, Logout } from "./auth/AuthController";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "./task/TaskController";

export const API = {
  //Auth
  Login,
  CreateUser,
  Logout,

  //Tasks
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
};
