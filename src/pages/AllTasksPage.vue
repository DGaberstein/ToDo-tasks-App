<!--
This file defines a Vue.js component for displaying and managing tasks in a to-do application.
By building this component, we will achieve a user interface that shows a list of all tasks,
allowing users to mark tasks as completed and delete them, leveraging global state management with Pinia.js.
-->

<template>
  <div>
    <h3 class="page-heading">This Page Displays all tasks</h3>
    
    <div class="container">
      <!-- Loop through the tasks array and render each task in a list item -->
      <ul>
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <!-- Display the title of the task -->
          <h5>{{ task.title }}</h5>
          <!-- Display the description title of the task -->
          <h6>{{ task.description.title }}</h6>
          <!-- Display the time to be completed of the task -->
          <h6>{{ task.description.timeToBeCompleted }}</h6>
          <!-- Loop through the extraInfoRequired array and render each item in a list item -->
          <ul class="extra-info">
            <li v-for="(extraInfo, index) in task.description.extraInfoRequired" :key="index">
              {{ extraInfo }}
            </li>
          </ul>
          <!-- Display whether the task is completed or incomplete -->
          <h6>{{ task.isCompleted ? "Completed" : "Incomplete" }}</h6>
          <!-- Button to mark the task as completed -->
          <button :disabled="task.isCompleted" @click="markTaskCompleted(task.id)">
            Mark as Completed
          </button>
          <!-- Button to delete the task -->
          <button @click="deleteTask(task.id)">Delete Task</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/taskStore";

const taskstore = useTaskStore();
const { tasks, deleteTask, markTaskCompleted } = taskstore;
</script>

<style scoped>
.container {
  background-color: #121212;
  color: #f0f0f0;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.task-item {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 4px;
}

.task-item h5 {
  margin-bottom: 0.5rem;
}

.task-item h6 {
  margin-bottom: 0.25rem;
}

.task-item .extra-info {
  list-style-type: none;
  margin-bottom: 0.5rem;
  padding-left: 0;
}

.task-item button {
  padding: 0.5rem 1rem;
  background-color: #00bd7e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-item button[disabled] {
  background-color: #6c757d;
  cursor: not-allowed;
}

.task-item button:hover {
  background-color: #00bd7e;
}

.page-heading {
  text-align: center;
  margin-bottom: 2rem;
  color: #00bd7e;
  margin-top: 2rem;
}
</style>

<!--
Summary:
This file implements a Vue.js component that displays a list of tasks from the global state managed by Pinia.js.
It allows users to mark tasks as completed or delete them. The component leverages Pinia's state management to
interact with the tasks and provide necessary functionalities.
-->
