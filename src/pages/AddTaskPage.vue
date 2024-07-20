<template>
  <div class="bg-gradient-to-br from-purple-600 to-indigo-700 min-h-screen p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="px-8 py-6">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-6">Add New Task</h1>
        
        <!-- Success Alert -->
        <div v-if="taskAdded" class="bg-green-100 dark:bg-green-800 border-l-4 border-green-500 text-green-700 dark:text-green-200 p-4 mb-4" role="alert">
          <p class="font-bold">Success!</p>
          <p>New task created.</p>
          <button @click="startNewTask" class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold tracking-wide hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            Start a New Task
          </button>
        </div>
        
        <!-- Task Form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Title Field -->
          <div class="relative">
            <input v-model="newTask.title" type="text" id="title" required class="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 placeholder-transparent">
            <label for="title" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">Title</label>
          </div>

          <!-- Description Title Field -->
          <div class="relative">
            <input v-model="newTask.description.title" type="text" id="descriptionTitle" required class="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 placeholder-transparent">
            <label for="descriptionTitle" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">Description Title</label>
          </div>

          <!-- Time to Be Completed Field -->
          <div class="relative">
            <input v-model="newTask.description.timeToBeCompleted" type="text" id="timeToBeCompleted" required class="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 placeholder-transparent">
            <label for="timeToBeCompleted" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">Time to be Completed</label>
          </div>

          <!-- Due Date Field -->
          <div class="relative">
            <input v-model="newTask.dueDate" type="date" id="dueDate" required class="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 placeholder-transparent">
            <label for="dueDate" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">Due Date</label>
          </div>

          <!-- Priority Field -->
          <div class="relative">
            <select v-model="newTask.priority" id="priority" required class="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 placeholder-transparent">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <label for="priority" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">Priority</label>
          </div>

          <!-- Category Field -->
          <div class="relative">
            <input v-model="newTask.category" type="text" id="category" class="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 placeholder-transparent">
            <label for="category" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">Category</label>
          </div>

          <!-- Subtasks Section -->
          <div class="relative">
            <label for="subtasks" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Subtasks:</label>
            <div class="flex space-x-2">
              <input v-model="newSubtask" type="text" id="subtasks" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <button type="button" @click="addSubtask" class="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold tracking-wide hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                Add Subtask
              </button>
            </div>
            <ul class="mt-2 space-y-2">
              <li v-for="(subtask, index) in newTask.subtasks" :key="index" class="flex items-center space-x-2">
                <span class="text-gray-700 dark:text-gray-300">{{ subtask }}</span>
                <button type="button" @click="removeSubtask(index)" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors duration-300">
                  Remove
                </button>
              </li>
            </ul>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();
const { addTask } = taskStore;

const newTask = reactive({
  id: Date.now(),
  title: "",
  description: {
    timeToBeCompleted: "",
    title: "",
    extraInfoRequired: [],
  },
  dueDate: "",
  priority: "medium",
  category: "",
  subtasks: [],
  isCompleted: false,
});

const newSubtask = ref("");
const taskAdded = ref(false);

const handleSubmit = () => {
  const taskToAdd = JSON.parse(JSON.stringify(newTask));
  taskToAdd.id = Date.now();
  addTask(taskToAdd);
  taskAdded.value = true;
};

const addSubtask = () => {
  if (newSubtask.value.trim()) {
    newTask.subtasks.push(newSubtask.value.trim());
    newSubtask.value = "";
  }
};

const removeSubtask = (index) => {
  newTask.subtasks.splice(index, 1);
};

const resetForm = () => {
  newTask.title = "";
  newTask.description.title = "";
  newTask.description.timeToBeCompleted = "";
  newTask.description.extraInfoRequired = [];
  newTask.dueDate = "";
  newTask.priority = "medium";
  newTask.category = "";
  newTask.subtasks = [];
};

const startNewTask = () => {
  resetForm();
  taskAdded.value = false;
};
</script>

<style scoped>
input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:focus,
select:focus {
  border-color: #4F46E5;
  outline: none;
}

button {
  background-color: #4F46E5;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #4338CA;
  transform: translateY(-0.5rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button.bg-green-600 {
  background-color: #4CAF50;
}

button.bg-green-600:hover {
  background-color: #45a049;
}

button.bg-indigo-600 {
  background-color: #4F46E5;
}

button.bg-indigo-600:hover {
  background-color: #4338CA;
}
</style>
