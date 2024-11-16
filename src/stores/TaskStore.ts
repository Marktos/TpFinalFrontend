import { defineStore } from "pinia";
import { TaskState, Task } from "../models/TaskModel";
import { createTask } from "../services/task/TaskController";

interface TaskFilterState extends TaskState {
  completed: Task[];
  pending: Task[];
  all: Task[];
}

export const useTaskStore = defineStore({
  id: "id",
  state: (): TaskFilterState => ({
    loading: false,
    data: [],
    all: [],
    completed: [],
    pending: [],
  }),
  actions: {
    addTask(task: Task) {
      //Creo la task en el back
      createTask({title: task.tarea, description: 'Incompleta'})
      
      let taskId: number = this.data.length;
      let newTask: Task = { ...task, id: taskId };
      this.data.push(newTask);
      this.all.push(newTask);
      if (newTask.completada) {
        this.completed.push(newTask);
      } else {
        this.pending.push(newTask);
      }
    },
    removeTask(task: Task) {
      this.data = this.data.filter((item) => item.id !== task.id);
      this.completed = this.completed.filter((item) => item.id !== task.id);
      this.pending = this.pending.filter((item) => item.id !== task.id);
      this.all = this.data;
    },
    changeStatus(task: Task) {
      const index = this.data.findIndex((item) => item.id === task.id);
      this.data[index].completada = !this.data[index].completada;
      if (this.data[index].completada) {
        this.completed.push(this.data[index]);
      } else {
        this.completed = this.completed.filter(
          (item) => item.id !== this.data[index].id
        );
      }
    },
    showCompleted() {
      this.data = this.completed;
    },
    showPending() {
      this.data = this.pending;
    },
    showAll() {
      this.data = this.all;
    },
  },
});
