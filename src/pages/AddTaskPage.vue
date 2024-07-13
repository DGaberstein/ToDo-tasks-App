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
          <label for="dueDate">Due Date:</label>
          <input v-model="newTask.dueDate" type="date" id="dueDate" required />
        </div>
        <div>
          <label for="priority">Priority:</label>
          <select v-model="newTask.priority" id="priority" required>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label for="category">Category:</label>
          <input v-model="newTask.category" type="text" id="category" />
        </div>
        <div>
          <label for="subtasks">Subtasks:</label>
          <input v-model="newSubtask" type="text" id="subtasks" />
          <ul>
            <li v-for="(subtask, index) in newTask.subtasks" :key="index">
              {{ subtask }}
              <button type="button" @click="removeSubtask(index)">Remove</button>
            </li>
          </ul>
          <button type="button" @click="addSubtask">Add Subtask</button>
        </div>
        <div class="button-container">
          <button type="submit">Add Task</button>
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