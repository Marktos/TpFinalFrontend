<script setup lang="ts">
import { reactive } from 'vue';
import { useTaskStore } from '../stores/TaskStore'


const taskStore = useTaskStore()

// Guardo el valor del input
const task = reactive({
    tarea: ''
})

//Crea una tarea
const addTask = () => {
    if (task.tarea.trim() !== '') {
        taskStore.addTask({ tarea: task.tarea, completada: false });
        task.tarea = '';
    }
};
</script>

<template>
    <div class="w-full lg:w-1/3 m-1">
        <form class="w-full bg-white shadow-md p-6">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-full px-3 mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                        htmlFor="category_name">Task Name</label>
                    <input
                        class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                        v-model="task.tarea" type="text" name="taskName" id="taskName" placeholder="Task Name"
                        required />
                </div>


                <div class="w-full md:w-full px-3 mb-6">
                    <button @click="() => addTask()"
                        class="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500">Add
                        Task</button>
                </div>


            </div>
        </form>
    </div>
</template>