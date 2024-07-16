<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header class="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <nav class="flex items-center space-x-10">
              <RouterLink to="/" class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">Home</RouterLink>
              <RouterLink to="/about" class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">About</RouterLink>
              <RouterLink to="/all-tasks" class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">All Tasks</RouterLink>
              <RouterLink to="/completed-tasks" class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">Completed Tasks</RouterLink>
              <RouterLink to="/add-task" class="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">Add New Task</RouterLink>
            </nav>
            <div class="flex items-center">
              <ThemeToggle class="mr-4" />
              <button @click="handleSignOut" class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300">Sign Out</button>
            </div>
          </div>
        </div>
      </header>
  
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <slot></slot>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/user';
  import ThemeToggle from './ThemeToggle.vue';
  
  const router = useRouter();
  const userStore = useUserStore();
  
  const handleSignOut = async () => {
    try {
      await userStore.signOut();
      router.push({ path: "/auth/login" });
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  </script>
  