<template>
  <div class="bg-gradient-to-br from-purple-600 to-indigo-700 min-h-screen p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="p-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-6">About Our Task Manager</h1>
        <p class="text-lg text-gray-700 mb-8">
          Our Task Manager is designed to help you organize your work efficiently and boost your productivity. With a modern interface and powerful features, you'll be able to manage your tasks like never before.
        </p>
        <div class="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-white mb-8">
          <h2 class="text-2xl font-bold mb-2">Current Count</h2>
          <p class="text-4xl font-extrabold">{{ countStore.count }}</p>
        </div>
        <button @click="incrementNumberFunctionFromStore" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          Increment Count
        </button>
      </div>
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
