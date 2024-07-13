<template>
  <div>
    <h3 class="page-heading">This Page Displays all tasks</h3>
    
    <div>
      <label for="search">Search:</label>
      <input v-model="searchQuery" @input="searchTasksHandler" type="text" id="search" />
    </div>
    
    <div>
      <label for="sort">Sort by:</label>
      <select v-model="sortCriteria.key" @change="sortTasksHandler">
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="isCompleted">Completion Status</option>
      </select>
      <select v-model="sortCriteria.order" @change="sortTasksHandler">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    <div class="container">
      <ul>
        <li v-for="task in filteredTasks" :key="task.id" class="task-item">
          <div v-if="editingTaskId === task.id">
            <input v-model="editTaskData.title" placeholder="Title" />
            <input v-model="editTaskData.description.title" placeholder="Description" />
            <input v-model="editTaskData.description.timeToBeCompleted" placeholder="Time to be Completed" />
            <input v-model="editTaskData.dueDate" type="date" placeholder="Due Date" />
            <input v-model="editTaskData.priority" placeholder="Priority" />
            <input v-model="editTaskData.category" placeholder="Category" />
            <input v-model="editTaskData.subtasks" placeholder="Subtasks (comma separated)" />
            <div class="button-group">
              <button @click="saveTask(task.id)">Save</button>
              <button @click="cancelEdit">Cancel</button>
            </div>
          </div>
          <div v-else>
            <h5>{{ task.title }}</h5>
            <h6>{{ task.description.title }}</h6>
            <h6>{{ task.description.timeToBeCompleted }}</h6>
            <h6>Due: {{ task.dueDate }}</h6>
            <h6>Priority: {{ task.priority }}</h6>
            <h6>Category: {{ task.category }}</h6>
            <ul class="extra-info">
              <li v-for="(extraInfo, index) in task.description.extraInfoRequired" :key="index">
                {{ extraInfo }}
              </li>
            </ul>
            <ul>
              <li v-for="(subtask, index) in task.subtasks" :key="index">
                {{ subtask }}
              </li>
            </ul>
            <h6>{{ task.isCompleted ? "Completed" : "Incomplete" }}</h6>
            <button :disabled="task.isCompleted" @click="markTaskCompleted(task.id)">
              Mark as Completed
            </button>
            <button @click="deleteTask(task.id)">Delete Task</button>
            <button @click="startEditingTask(task)">Edit Task</button>
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
  taskStore.editTask(updatedTask);
  editingTaskId.value = null;
};

const cancelEdit = () => {
  editingTaskId.value = null;
};
</script>

<style scoped>
.container {
  background-color: #121212;
  color: #f0f0f0;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%; /* Adjust to allow full responsiveness */
  margin: 0 auto;
}

@media (min-width: 600px) {
  .tasks-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .task-container {
    margin: 0.5rem;
    flex: 1 1 calc(50% - 1rem);
    box-sizing: border-box;
  }
}

@media (min-width: 900px) {
  .task-container {
    flex: 1 1 calc(33.33% - 1rem);
  }
}

@media (max-width: 768px) {
  .wrapper {
    padding: 0 1rem; /* Adjust padding for smaller screens */
  }
}

@media (max-width: 480px) {
  nav {
    flex-direction: column; /* Stack navigation links vertically on smaller screens */
  }
}
</style>


<!--
Summary:
This file implements a Vue.js component that displays a list of tasks from the global state managed by Pinia.js.
It allows users to mark tasks as completed, delete them, and edit them. The component leverages Pinia's state management to
interact with the tasks and provide necessary functionalities.
-->
