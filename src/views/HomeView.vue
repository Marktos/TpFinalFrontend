<script setup lang="ts">
import Loading_Component from '../components/Loading_Component.vue';
import TaskForm_Component from '../components/TaskForm_Component.vue';
import TaskTable_Component from '../components/TaskTable_Component.vue';
import { useSesionStore } from '../stores/AuthSesionStore';
import { useTaskStore } from '../stores/TaskStore';

const sesionStore = useSesionStore()
const taskStore = useTaskStore()
</script>

<template>
    <div class="bg-gray-100">
        <div class="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between">
            <div class="flex items-center space-x-2 text-gray-400">
                <span class="text-green-700 tracking-wider font-thin text-md"><a href="#">Home</a></span>
                <span>/</span>
                <span class="tracking-wide text-md">
                    <span class="text-base">Tasks</span>
                </span>
                <span>/</span>
            </div>
            <button
                @click="sesionStore.logout"
                class="inline-flex items-center gap-2 rounded border border-[#FF0029] px-6 py-2 text-sm font-semibold text-[#FF0029] transition-all hover:bg-[#FF0029] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Logout
            </button>
        </div>
        <div class="header my-3 h-12 px-10 flex justify-start items-start">
            <Loading_Component v-if="taskStore.loading || sesionStore.loading"/>
            <h1 v-else class="font-medium text-2xl mt-5">All Tasks</h1>
        </div>
        <div class="flex flex-col mx-3 mt-6 lg:flex-row">
            <TaskForm_Component />
            <div class="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
                <div class="overflow-x-auto rounded-lg p-3">
                    <TaskTable_Component />
                </div>
            </div>

        </div>

    </div>
</template>
