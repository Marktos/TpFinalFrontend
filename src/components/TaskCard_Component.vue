<script setup lang="ts">
import type {Task}  from '../models/TaskModel';
import { defineProps } from 'vue';
import { useTaskStore } from '../stores/TaskStore';

const props = defineProps<Task>()
const taskStore = useTaskStore()




</script>


<template>
    <td class="text-center">{{ props.id }}</td>
                <td>{{ props.tarea }}</td>
                <td class="p-2">
                    <div class="flex justify-center">
                        <a href="#"
                            @click="taskStore.removeTask(props)"
                            class="rounded-md hover:bg-blue-100 text-blue-600 p-2 flex justify-between items-center">
                            <span>Remove</span>
                        </a>
                        <button
                            @click="taskStore.changeStatus(props)"
                            :class="props.completada ? 'hover:bg-green-100 text-green-600' : 'hover:bg-red-100 text-red-600'"
                            class="rounded-md p-2 flex justify-between items-center">
                            <span>{{props.completada ? 'Completed' : 'Incompleted'}}</span>
                        </button>
                    </div>
                </td>
</template>