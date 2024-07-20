<template>
  <div class="bg-gradient-to-br from-purple-600 to-indigo-700 min-h-screen p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="p-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-6">Completed Tasks</h1>
        <ul class="space-y-4">
          <li v-for="task in completedTasks" :key="task.id" class="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <h2 class="text-2xl font-bold mb-2">{{ task.title }}</h2>
            <p class="text-lg mb-2">{{ task.description.title }}</p>
            <p class="text-sm mb-2">Time to complete: {{ task.description.timeToBeCompleted }}</p>
            <ul class="list-disc list-inside">
              <li v-for="(extraInfo, index) in task.description.extraInfoRequired" :key="index" class="text-sm">
                {{ extraInfo }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
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