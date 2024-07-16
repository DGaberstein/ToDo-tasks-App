<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
    <div class="px-4 py-5 sm:p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Add New Task</h1>
      <div v-if="taskAdded" class="bg-green-100 dark:bg-green-800 border-l-4 border-green-500 text-green-700 dark:text-green-200 p-4 mb-4" role="alert">
        <p class="font-bold">Success!</p>
        <p>New task created.</p>
        <button @click="startNewTask" class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300">
          Start a New Task
        </button>
      </div>
      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title:</label>
          <input v-model="newTask.title" type="text" id="title" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label for="descriptionTitle" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description Title:</label>
          <input v-model="newTask.description.title" type="text" id="descriptionTitle" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label for="timeToBeCompleted" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Time to be Completed:</label>
          <input v-model="newTask.description.timeToBeCompleted" type="text" id="timeToBeCompleted" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date:</label>
          <input v-model="newTask.dueDate" type="date" id="dueDate" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority:</label>
          <select v-model="newTask.priority" id="priority" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
          <input v-model="newTask.category" type="text" id="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label for="subtasks" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Subtasks:</label>
          <div class="flex space-x-2">
            <input v-model="newSubtask" type="text" id="subtasks" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <button type="button" @click="addSubtask" class="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
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
        <div class="flex justify-end">
          <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
            Add Task
          </button>
        </div>
      </form>
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