<!-- 
This file defines the Home View component of a Vue.js application.
It demonstrates how to consume and display data from a Pinia store, and how to call store functions.
-->

<template>
  <div class="bg-gradient-to-br from-purple-600 to-indigo-700 min-h-screen p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="p-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-6">Welcome to Your Task Manager</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-white">
            <h2 class="text-2xl font-bold mb-2">Current Count</h2>
            <p class="text-4xl font-extrabold">{{ countNumber }}</p>
          </div>
          <div class="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
            <h2 class="text-2xl font-bold mb-2">Double Count</h2>
            <p class="text-4xl font-extrabold">{{ doubleCountNumber }}</p>
          </div>
        </div>
        <button @click="incrementNumberFunctionFromStore" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          Increment Count
        </button>
      </div>
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
