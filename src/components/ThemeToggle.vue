<template>
    <button
      @click="toggleTheme"
      class="relative inline-flex items-center h-8 w-16 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span class="sr-only">Toggle theme</span>
      <span
        :class="`${
          darkMode.value ? 'translate-x-9' : 'translate-x-1'
        } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out`"
      >
        <component :is="darkMode.value ? Moon : Sun" class="h-4 w-4 m-1" :class="darkMode.value ? 'text-gray-700' : 'text-yellow-500'" />
      </span>
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Moon, Sun } from 'lucide-vue-next';
  
  const darkMode = ref(false);
  
  const toggleTheme = () => {
    const newMode = !darkMode.value;
    darkMode.value = newMode;
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };
  
  onMounted(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    darkMode.value = isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
  });
  </script>
  