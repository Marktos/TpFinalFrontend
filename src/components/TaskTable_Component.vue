<script setup lang="ts">
import TaskCard_Component from './TaskCard_Component.vue';
import { useTaskStore } from '../stores/TaskStore';
import { reactive } from 'vue';


const taskStore = useTaskStore()
taskStore.getAllTasks()


</script>

<template>
    <div class="space-x-3">
        <button
            @click="taskStore.showAll()"
            class="inline-flex items-center gap-2 rounded-full border border-[#14843c] px-6 py-2 text-sm font-semibold text-[#14843c] transition-all hover:bg-[#14843c] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            All
        </button>
        <button
            @click="taskStore.showCompleted()"
            class="inline-flex items-center gap-2 rounded-full border border-[#14843c] px-6 py-2 text-sm font-semibold text-[#14843c] transition-all hover:bg-[#14843c] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Completed
        </button>
        <button
            @click="taskStore.showPending()"
            class="inline-flex items-center gap-2 rounded-full border border-[#14843c] px-6 py-2 text-sm font-semibold text-[#14843c] transition-all hover:bg-[#14843c] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Incompleted
        </button>
    </div>
    <table class="table-auto w-full m-2">
        <thead class="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
            <tr>
                <th class="p-2">
                    <div class="font-semibold">Task</div>
                </th>
                <th class="p-2">
                    <div class="font-semibold text-left">Description</div>
                </th>
                <th class="p-2">
                    <div class="font-semibold text-center">Action</div>
                </th>
            </tr>
        </thead>
        <tbody>
            <!-- Agrego todas las tareas -->
            <tr v-for="task in taskStore.data" :key="task.id">
                <TaskCard_Component :id="task.id" :tarea="task.tarea" :completada="task.completada" />
            </tr>
        </tbody>
    </table>
</template>