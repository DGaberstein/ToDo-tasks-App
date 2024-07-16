<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
    <div class="px-4 py-5 sm:p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Completed Tasks</h1>
      <ul class="space-y-4">
        <li v-for="task in completedTasks" :key="task.id" class="bg-gray-50 dark:bg-gray-700 px-4 py-5 rounded-md transition-colors duration-300">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ task.title }}</h2>
          <p class="text-gray-600 dark:text-gray-300">{{ task.description.title }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Time to complete: {{ task.description.timeToBeCompleted }}</p>
          <ul class="mt-2">
            <li v-for="(extraInfo, index) in task.description.extraInfoRequired" :key="index" class="text-sm text-gray-600 dark:text-gray-300">
              {{ extraInfo }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();
const { tasks } = taskStore;

const completedTasks = computed(() => tasks.filter((task) => task.isCompleted));
</script>