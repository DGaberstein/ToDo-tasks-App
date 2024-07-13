// This file sets up a global state management system for a to-do application using Pinia.js.
// It defines a centralized store to manage the state of tasks across our Vue.js application,
// allowing us to add, complete, delete, and filter tasks by user ID.

// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import reactive from Vue to make the tasks array reactive
import { reactive, ref, computed } from "vue";

// Import defineStore from Pinia to define a new store
import { defineStore } from "pinia";

// ------------------------------------------------------------------------
// Store Definition Block
// ------------------------------------------------------------------------

// Define a new store named 'useTaskStore' using Pinia
export const useTaskStore = defineStore("taskStore", () => {
  // Initial array of tasks using reactive to keep the state reactive
  const tasks = reactive([
    {
      id: 1, 
      title: "Buy ingredients to make Tacos", 
      description: {
        title: "Go to the latin shop next to my house to buy groceries for this friday's dinner with friends", 
        timeToBeCompleted: "2 hours", 
        extraInfoRequired: ["Guacamole", "Nachos"], 
      },
      dueDate: "2024-07-14", 
      priority: "medium", 
      category: "Groceries",
      subtasks: ["Buy Guacamole", "Buy Nachos"], 
      isRecurring: false, 
      attachments: [], 
      comments: [], 
      isCompleted: true, 
      userId: 1, 
    },
    {
      id: 2, 
      title: "Clean out House", 
      description: {
        title: "Clean House by friday for friends dinner", 
        timeToBeCompleted: "1 hour", 
        extraInfoRequired: ["swap", "mop", "dust"], 
      },
      dueDate: "2024-07-15", 
      priority: "high", 
      category: "Chores", 
      subtasks: ["Swap", "Mop", "Dust"], 
      isRecurring: false, 
      attachments: [], 
      comments: [], 
      isCompleted: false, 
      userId: 2, 
    },
  ]);

  // Reactive state for search query and sort criteria
  const searchQuery = ref("");
  const sortCriteria = ref({ key: "dueDate", order: "asc" });

  // ----------------------------------------------------------------------
  // Function to add a new task
  // ----------------------------------------------------------------------
  function addTask(task) {
    tasks.push(task); // Push the new task to the tasks array
  }

  // ----------------------------------------------------------------------
  // Function to mark a task as completed
  // ----------------------------------------------------------------------
  function markTaskCompleted(taskId) {
    // Find the task by its ID
    let task = tasks.find((task) => task.id === taskId);
    // If task is found, mark it as completed
    if (task) {
      task.isCompleted = true; // Set the task's isCompleted property to true
    }
  }

  // ----------------------------------------------------------------------
  // Function to delete a task
  // ----------------------------------------------------------------------
  function deleteTask(taskId) {
    // Find the index of the task to be deleted by its ID
    let index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1); // Remove the task from the array
    }
  }

  // ----------------------------------------------------------------------
  // Function to get tasks by user ID
  // ----------------------------------------------------------------------
  function getTasksByUserId(userId) {
    return tasks.filter((task) => task.userId === userId);
  }

  // ----------------------------------------------------------------------
  // Function to edit a task
  // ----------------------------------------------------------------------
  function editTask(updatedTask) {
    let index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
    }
  }

  // ----------------------------------------------------------------------
  // Function to search tasks
  // ----------------------------------------------------------------------
  function searchTasks(query) {
    searchQuery.value = query;
  }

  // ----------------------------------------------------------------------
  // Function to sort tasks
  // ----------------------------------------------------------------------
  function sortTasks(key, order = "asc") {
    sortCriteria.value = { key, order };
    tasks.sort((a, b) => {
      if (order === "asc") return a[key] > b[key] ? 1 : -1;
      return a[key] < b[key] ? 1 : -1;
    });
  }

  // ----------------------------------------------------------------------
  // Function to filter and sort tasks
  // ----------------------------------------------------------------------
  function filterAndSortTasks() {
    let filteredTasks = tasks;
    if (searchQuery.value) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.includes(searchQuery.value) ||
        task.description.title.includes(searchQuery.value)
      );
    }
    if (sortCriteria.value.key) {
      filteredTasks.sort((a, b) => {
        if (sortCriteria.value.order === "asc") return a[sortCriteria.value.key] > b[sortCriteria.value.key] ? 1 : -1;
        return a[sortCriteria.value.key] < b[sortCriteria.value.key] ? 1 : -1;
      });
    }
    return filteredTasks;
  }

  // ----------------------------------------------------------------------
  // Return statement to export all pieces of data or functions globally
  // ----------------------------------------------------------------------
  return {
    tasks,
    searchQuery,
    sortCriteria,
    addTask,
    markTaskCompleted,
    deleteTask,
    getTasksByUserId,
    editTask,
    searchTasks,
    sortTasks,
    filterAndSortTasks,
  };
});

/*
Summary:
This file defines a Pinia store for managing tasks in a to-do application. It includes an initial set of tasks and provides 
functions to add, mark as completed, delete, edit, search, sort, and filter tasks by user ID. The state management is reactive, ensuring that 
any changes to the tasks are automatically reflected in the Vue.js components that use this store.
*/
