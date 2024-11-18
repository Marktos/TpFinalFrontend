import { defineStore } from "pinia";
import { TaskState, Task } from "../models/TaskModel";
import { CreateTask } from "../models/TaskRequestModels";
import { API } from "../services";

interface TaskFilterState extends TaskState {
  completed: Task[];
  pending: Task[];
  all: Task[];
}

// creamos nuestro store de tareas
export const useTaskStore = defineStore({
  id: "tasks",
  state: (): TaskFilterState => ({
    loading: false,
    data: [],
    all: [],
    completed: [],
    pending: [],
  }),
  actions: {
    async addTask(task: Task) {
      this.loading = true;
      try {
        let apiTask: CreateTask = {
          title: task.tarea,
          description: task.completada ? "Completada" : "Incompleta",
        };
        const response = await API.createTask(apiTask);
        if (response.status === 201) {
          let taskId: number = response.data.id!;
          let newTask: Task = { ...task, id: taskId };
          this.data.push(newTask);

          console.info(`Tarea creada`);
          this.all.push(newTask);
          await this.getAllTasks();
        }
      } catch (e) {
        console.error(`Error al realizar la peticion: ${e}`);
        this.loading = false;
      }
    },

    async getAllTasks() {
      if (this.loading === false) {
        this.loading = true;
      }
      try {
        const response = await API.getTasks();
        if (response.status === 200) {
          response.data.forEach((task) => {
            const retrievedTask: Task = {
              id: task.id!,
              tarea: task.title!, //
              completada: task.description === "Completada" ? true : false, //
            };
            this.data.push(retrievedTask);
            this.all.push(retrievedTask);
          });

          const uniqueTasks = this.all.filter(
            (task, index, self) =>
              self.findIndex((t) => t.id === task.id) === index
          );
          this.data = uniqueTasks;
          this.all = uniqueTasks;
          this.completed = uniqueTasks.filter((task) => task.completada);
          this.pending = uniqueTasks.filter((task) => !task.completada);
          console.info(`Todas las tareas obtenidas`);
          this.loading = false;
        }
      } catch (e) {
        console.error(`Error al realizar la peticion: ${e}`);
        this.loading = false; // paramos el loading
      }
    },

    async removeTask(task: Task) {
      this.loading = true;
      try {
        const response = await API.deleteTask(task.id!);
        if (response.status === 200) {
          console.info(`Tarea eliminada`);
        }
      } catch (e) {
        console.error(`Error al realizar la peticion: ${e}`);
        this.loading = false;
      }
      this.data = this.data.filter((t) => t.id !== task.id);
      this.all = this.all.filter((t) => t.id !== task.id);
      await this.getAllTasks();
    },
    async changeStatus(task: Task) {
      this.loading = true;
      const index = this.data.findIndex((item) => item.id === task.id);
      this.data[index].completada = !this.data[index].completada;
      const apiToBeUpdateTask: CreateTask = {
        title: this.data[index].tarea,
        description: this.data[index].completada ? "Completada" : "Incompleta",
      };
      try {
        await API.updateTask(task.id!, apiToBeUpdateTask);
        console.info(`Tarea Actualizada ${task}`);
        this.loading = false;
      } catch (e) {
        console.error(`Error al realizar la peticion: ${e}`);
        this.loading = false;
      }

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
