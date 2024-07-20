<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
    <div class="px-4 py-5 sm:p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">All Tasks</h1>
      
      <div class="mb-6 flex flex-wrap gap-4">
        <!-- Search, Sort, and Order Inputs -->
      </div>

      <ul class="space-y-6">
        <li v-for="task in filteredTasks" :key="task.id" class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm transition-colors duration-300">
          <div v-if="editingTaskId === task.id">
            <div class="space-y-4">
              <!-- Edit Task Inputs -->
            </div>
            <div class="flex justify-end space-x-2 mt-4">
              <button @click="saveTask(task.id)" class="custom-button bg-green-600">Save</button>
              <button @click="cancelEdit" class="custom-button bg-gray-600">Cancel</button>
            </div>
          </div>
          <div v-else>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ task.title }}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-1">{{ task.description.title }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Time to Complete: {{ task.description.timeToBeCompleted }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Due: {{ task.dueDate }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Priority: {{ task.priority }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Category: {{ task.category }}</p>
            <ul class="mt-2 list-disc pl-5">
              <li v-for="(subtask, index) in task.subtasks" :key="index" class="text-sm text-gray-600 dark:text-gray-300">
                {{ subtask }}
              </li>
            </ul>
            <p class="mt-2 text-sm font-medium" :class="task.isCompleted ? 'text-green-600' : 'text-yellow-600'">
              {{ task.isCompleted ? "Completed" : "Incomplete" }}
            </p>
            <div class="flex justify-end space-x-2 mt-4">
              <button :disabled="task.isCompleted" @click="markTaskCompleted(task.id)" class="custom-button bg-blue-600" :class="{ 'opacity-50 cursor-not-allowed': task.isCompleted }">Mark as Completed</button>
              <button @click="deleteTask(task.id)" class="custom-button bg-red-600">Delete Task</button>
              <button @click="startEditingTask(task)" class="custom-button bg-yellow-600">Edit Task</button>
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

<style scoped>
.custom-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #45a049;
}

.custom-button.bg-green-600 {
  background-color: #4CAF50;
}

.custom-button.bg-gray-600 {
  background-color: #6B7280;
}

.custom-button.bg-blue-600 {
  background-color: #3B82F6;
}

.custom-button.bg-red-600 {
  background-color: #EF4444;
}

.custom-button.bg-yellow-600 {
  background-color: #F59E0B;
}
</style>
