<template>
  <div class="bg-gradient-to-br from-purple-600 to-indigo-700 min-h-screen p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="p-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-6">Welcome to the Task Manager</h1>
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
        <button @click="incrementNumberFunctionFromStore" class="custom-button bg-indigo-600 hover:bg-indigo-700">
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
const countStore = useCounterStore();

// ------------------------------------------------------------------------
// Computed Properties Block
// ------------------------------------------------------------------------

// Store the 'count' variable from the store in a computed property for real-time updates
const countNumber = computed(() => countStore.count);

// Store the 'doubleCount' variable from the store
const doubleCountNumber = computed(() => countStore.doubleCount);

// ------------------------------------------------------------------------
// Methods Block
// ------------------------------------------------------------------------

// Access the 'increment' function from the store to be used in the template
const incrementNumberFunctionFromStore = countStore.increment;

const userStore = useUserStore();
const { getTasksForUser } = storeToRefs(userStore);

console.log(userStore.getTasksForUser());
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
