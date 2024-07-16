<!-- 
This file defines the Home View component of a Vue.js application.
It demonstrates how to consume and display data from a Pinia store, and how to call store functions.
-->

<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
    <div class="px-4 py-5 sm:p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Your Task Manager</h1>
      <div class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md transition-colors duration-300">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Current Count</dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ countNumber }}</dd>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md transition-colors duration-300">
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Double Count</dt>
          <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ doubleCountNumber }}</dd>
        </div>
      </div>
      <button @click="incrementNumberFunctionFromStore" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
        Increment Count
      </button>
    </div>
  </div>
</template>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import computed from Vue for reactive calculations
import { computed } from "vue";
// Import useCounterStore to access the counter store
import { useCounterStore } from "../stores/counter";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// ------------------------------------------------------------------------
// Store Access Block
// ------------------------------------------------------------------------

// Access the counter store and store it in a variable for easier reference
let countStore = useCounterStore();

// ------------------------------------------------------------------------
// Computed Properties Block
// ------------------------------------------------------------------------

// Store the 'count' variable from the store in a computed property for real-time updates
let countNumber = computed(() => countStore.count);

// Store the 'doubleCount' variable from the store
let doubleCountNumber = countStore.doubleCount;

// ------------------------------------------------------------------------
// Methods Block
// ------------------------------------------------------------------------

// Access the 'increment' function from the store to be used in the template
let incrementNumberFunctionFromStore = countStore.increment;

const userStore = useUserStore();
const { getTasksForUser } = storeToRefs(userStore);

console.log(userStore.getTasksForUser());

/*
  The incrementNumberFunctionFromStore is used to increment the count in the store.
  - It accesses the increment function from the counter store.
  - This function is called when the button in the template is clicked.
  */
</script>
