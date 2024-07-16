<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
    <div class="px-4 py-5 sm:p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Our Task Manager</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        Our Task Manager is designed to help you organize your work efficiently and boost your productivity.
      </p>
      <div class="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md transition-colors duration-300">
        <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Current Count</dt>
        <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ countStore.count }}</dd>
      </div>
      <button @click="incrementNumberFunctionFromStore" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
        Increment Count
      </button>
    </div>
  </div>
</template>

<script setup>
//import { computed } from "vue";
import { useCounterStore } from "../stores/counter";
// 2nd wa
// A bit easier because we can store the access of the store inside a variable which we then reference easier (take a look at the example with the vaar name 'countNumber')
let countStore = useCounterStore();

// -----
// -----
// Consuming a piece of state that happens to be a function
// How do we do it ?
let incrementNumberFunctionFromStore = countStore.increment;
</script>
