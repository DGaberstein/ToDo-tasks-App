<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
    <div class="px-4 py-5 sm:p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">All Tasks</h1>
      
      <div class="mb-4 flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Search:</label>
          <input v-model="searchQuery" @input="searchTasksHandler" type="text" id="search" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        
        <div class="flex-1 min-w-[200px]">
          <label for="sort" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
          <select v-model="sortCriteria.key" @change="sortTasksHandler" id="sort" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="isCompleted">Completion Status</option>
          </select>
        </div>
        
        <div class="flex-1 min-w-[200px]">
          <label for="order" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Order:</label>
          <select v-model="sortCriteria.order" @change="sortTasksHandler" id="order" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <ul class="space-y-4">
        <li v-for="task in filteredTasks" :key="task.id" class="bg-gray-50 dark:bg-gray-700 px-4 py-5 rounded-md transition-colors duration-300">
          <div v-if="editingTaskId === task.id">
            <input v-model="editTaskData.title" placeholder="Title" class="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
            <input v-model="editTaskData.description.title" placeholder="Description" class="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
            <input v-model="editTaskData.description.timeToBeCompleted" placeholder="Time to be Completed" class="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
            <input v-model="editTaskData.dueDate" type="date" placeholder="Due Date" class="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
            <input v-model="editTaskData.priority" placeholder="Priority" class="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
            <input v-model="editTaskData.category" placeholder="Category" class="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
            <input v-model="editTaskData.subtasks" placeholder="Subtasks (comma separated)" class="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
            <div class="flex justify-end space-x-2 mt-2">
              <button @click="saveTask(task.id)" class="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">Save</button>
              <button @click="cancelEdit" class="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-300">Cancel</button>
            </div>
          </div>
          <div v-else>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ task.title }}</h2>
            <p class="text-gray-600 dark:text-gray-300">{{ task.description.title }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Time to complete: {{ task.description.timeToBeCompleted }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Due: {{ task.dueDate }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Priority: {{ task.priority }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Category: {{ task.category }}</p>
            <ul class="mt-2">
              <li v-for="(subtask, index) in task.subtasks" :key="index" class="text-sm text-gray-600 dark:text-gray-300">
                {{ subtask }}
              </li>
            </ul>
            <p class="mt-2 text-sm font-medium" :class="task.isCompleted ? 'text-green-600' : 'text-yellow-600'">
              {{ task.isCompleted ? "Completed" : "Incomplete" }}
            </p>
            <div class="flex justify-end space-x-2 mt-2">
              <button :disabled="task.isCompleted" @click="markTaskCompleted(task.id)" class="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50">
                Mark as Completed
              </button>
              <button @click="deleteTask(task.id)" class="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">Delete Task</button>
              <button @click="startEditingTask(task)" class="px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors duration-300">Edit Task</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();
const { tasks, markTaskCompleted, deleteTask, searchTasks, sortTasks, filterAndSortTasks, editTask } = taskStore;

const searchQuery = ref("");
const sortCriteria = ref({
  key: "dueDate",
  order: "asc",
});
const editingTaskId = ref(null);
const editTaskData = ref({});

const filteredTasks = computed(() => filterAndSortTasks());

const searchTasksHandler = () => {
  searchTasks(searchQuery.value);
};

const sortTasksHandler = () => {
  sortTasks(sortCriteria.value.key, sortCriteria.value.order);
};

const startEditingTask = (task) => {
  editingTaskId.value = task.id;
  editTaskData.value = { ...task, subtasks: task.subtasks.join(", ") };
};

const saveTask = (taskId) => {
  const updatedTask = { ...editTaskData.value, subtasks: editTaskData.value.subtasks.split(", ") };
  editTask(updatedTask);
  editingTaskId.value = null;
};

const cancelEdit = () => {
  editingTaskId.value = null;
};
</script>