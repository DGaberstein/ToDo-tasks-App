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
        <button @click="incrementNumberFunctionFromStore" class="custom-button bg-indigo-600">
          Increment Count
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";

const countStore = useCounterStore();
const incrementNumberFunctionFromStore = countStore.increment;
</script>

<style scoped>
.custom-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.custom-button:hover {
  background-color: #45a049;
  transform: translateY(-0.5rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-button.bg-indigo-600 {
  background-color: #4F46E5;
}

.custom-button.bg-indigo-600:hover {
  background-color: #4338CA;
}
</style>
