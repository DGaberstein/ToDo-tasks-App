<!--
This file defines a Vue.js component for displaying completed tasks in a to-do application.
By building this component, we will achieve a user interface that shows a list of tasks marked as completed, leveraging global state management with Pinia.js.
-->

<template>
  <div class="container">
    <h4 class="page-heading">This Page Displays Completed Tasks</h4>
    <ul class="tasks-list">
      <!-- Loop through the completedTasks array and render each task -->
      <li v-for="task in completedTasks" v-bind:key="task.id" class="task-container">
        <!-- Display the title of the task -->
        <h5>{{ task.title }}</h5>
        <!-- Display the description title of the task -->
        <h6>{{ task.description.title }}</h6>
        <!-- Display the time to be completed of the task -->
        <h6>{{ task.description.timeToBeCompleted }}</h6>
        <!-- Loop through the extraInfoRequired array and render each item in a list item -->
        <ul class="extra-info-list">
          <li v-for="(extraInfo, index) in task.description.extraInfoRequired" v-bind:key="index" class="extra-info-item">
            {{ extraInfo }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import computed from Vue to create a computed property
import { computed } from "vue";
// Import the useTaskStore function from taskStore to interact with the task store
import { useTaskStore } from "../stores/taskStore";

// ------------------------------------------------------------------------
// Store Access Block
// ------------------------------------------------------------------------

// Use the task store by saving it in a variable
const taskstore = useTaskStore();

// Destructure all the possible pieces of data that we want out of this
const { tasks } = taskstore;

// ------------------------------------------------------------------------
// Computed Properties Block
// ------------------------------------------------------------------------

// Computed property to filter completed tasks
let completedTasks = computed(() => tasks.filter((task) => task.isCompleted));

/*
  The completedTasks computed property filters the tasks array to include only the tasks that are marked as completed.
  - It uses the filter method to iterate over the tasks array.
  - For each task, it checks if the isCompleted property is true.
  - The resulting array contains only the tasks that are completed.
  */
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #121212;
  color: #f0f0f0;
  padding: 2rem;
}

.page-heading {
  text-align: center;
  margin-bottom: 2rem;
  color: #00bd7e;
  margin-top: 2rem;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.task-container {
  background-color: #1e1e1e;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.extra-info-list {
  list-style-type: none;
  padding: 0;
}

.extra-info-item {
  margin: 0.5rem 0;
}

h5, h6 {
  margin: 0.5rem 0;
}

h5 {
  color: #00bd7e;
}

h6 {
  color: #00bd7e;
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
</style>