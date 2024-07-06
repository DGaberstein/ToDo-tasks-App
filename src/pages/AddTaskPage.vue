<!--
This file defines a Vue.js component for adding a new task to a to-do application.
By building this component, we will achieve a user interface that allows users to input details for a new task and add it to the global state managed by Pinia.js.
-->

<template>
  <div>
    <h3 class="page-heading">Add New Task</h3>
    <div v-if="taskAdded">
      <p>Yay! New task created.</p>
      <button @click="startNewTask">Start a New Task</button>
    </div>
    <div v-else>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="title">Title:</label>
          <input v-model="newTask.title" type="text" id="title" required />
        </div>
        <div>
          <label for="descriptionTitle">Description Title:</label>
          <input v-model="newTask.description.title" type="text" id="descriptionTitle" required />
        </div>
        <div>
          <label for="timeToBeCompleted">Time to be Completed:</label>
          <input v-model="newTask.description.timeToBeCompleted" type="text" id="timeToBeCompleted" required />
        </div>
        <div>
          <label for="extraInfo">Extra Info Required:</label>
          <input v-model="newExtraInfo" type="text" id="extraInfo" />
          <ul>
            <li v-for="(info, index) in newTask.description.extraInfoRequired" :key="index">
              {{ info }}
              <button type="button" @click="removeExtraInfo(index)">Remove</button>
            </li>
          </ul>
        </div>
        <!-- Adjusted placement for Add Task and Add Info -->
        <div class="button-container">
          <button type="button" @click="addExtraInfo">Add Info</button>
          <button type="submit">Add Task</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// Importing reactive and ref from Vue for reactivity and references
import { reactive, ref } from "vue";
// Importing the useTaskStore function from taskStore to interact with the task store
import { useTaskStore } from "../stores/taskStore";

// Use the task store
const taskStore = useTaskStore();
const { addTask } = taskStore;
// Reactive object for the new task
const newTask = reactive({
  id: Date.now(),
  title: "",
  description: {
    timeToBeCompleted: "",
    title: "",
    extraInfoRequired: [],
  },
  isCompleted: false,
});
 // Reference for new extra info input
const newExtraInfo = ref("");
const taskAdded = ref(false);

// ------------------------------------------------------------------------
// Methods Block
// ------------------------------------------------------------------------

// Function to handle form submission
const handleSubmit = () => {
  const taskToAdd = JSON.parse(JSON.stringify(newTask));
  taskToAdd.id = Date.now();
  addTask(taskToAdd);
  taskAdded.value = true;
};

/*
  The handleSubmit function handles the form submission process.
  - It creates a deep copy of the newTask object to avoid any reactivity issues.
  - It updates the id of the taskToAdd to ensure it is unique by setting it to the current timestamp.
  - It calls the addTask function from the task store to add the new task to the global state.
  - It sets taskAdded to true to indicate that a task has been successfully added.
  */

// Function to add extra info
const addExtraInfo = () => {
  if (newExtraInfo.value.trim()) {
    newTask.description.extraInfoRequired.push(newExtraInfo.value.trim());
    newExtraInfo.value = "";
  }
};

/*
  The addExtraInfo function adds an extra information item to the new task's description.
  - It checks if the newExtraInfo input value is not empty after trimming whitespace.
  - If valid, it pushes the trimmed value to the extraInfoRequired array of the new task's description.
  - It then clears the newExtraInfo input field.
  */

// Function to remove extra info
const removeExtraInfo = (index) => {
  newTask.description.extraInfoRequired.splice(index, 1);
};

/*
  The removeExtraInfo function removes an extra information item from the new task's description.
  - It takes an index as a parameter.
  - It removes the item at the specified index from the extraInfoRequired array using the splice method.
  */

// Function to reset the form
const resetForm = () => {
  newTask.title = "";
  newTask.description.title = "";
  newTask.description.timeToBeCompleted = "";
  newTask.description.extraInfoRequired = [];
};

/*
  The resetForm function resets all the fields of the new task form to their initial states.
  - It clears the title field by setting newTask.title to an empty string.
  - It clears the description title field by setting newTask.description.title to an empty string.
  - It clears the time to be completed field by setting newTask.description.timeToBeCompleted to an empty string.
  - It clears the extra info required array by setting newTask.description.extraInfoRequired to an empty array.
  */

// Function to start a new task submission
const startNewTask = () => {
  resetForm(); 
  taskAdded.value = false;
};

/*
  The startNewTask function resets the form and prepares it for a new task submission.
  - It calls the resetForm function to clear all form fields.
  - It sets taskAdded to false to hide the success message and display the form again.
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

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  color: #28a745;
}

.form-container {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.header-title {
  text-align: center;
  margin-bottom: 0.5rem;
}

.form {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

label {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.error-msg {
  color: red;
  text-align: center;
  margin-bottom: 1rem;
}

.success-msg {
  color: #218838;
  text-align: center;
  margin-bottom: 1rem;
}

.page-heading {
  text-align: center;
  margin-bottom: 2rem;
  color: #00bd7e;
  margin-top: 2rem;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.button-container button {
  flex: 1;
  margin: 0 5px;
}

.info-container {
  background-color: #2b2b2b;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>