<template>
  <header>
    <div class="wrapper">
      <nav>
        <template v-if="!isLoggedIn">
          <!-- If the user is not logged in, the navigation will be handled by SignIn and SignUp components -->
        </template>
        <template v-else>
          <!-- If the user is logged in, show these links -->
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/all-tasks">All Tasks</RouterLink>
          <RouterLink to="/completed-tasks">Completed Tasks</RouterLink>
          <RouterLink to="/add-task">Add New Task</RouterLink>
          <RouterLink to="/profile">Profile</RouterLink>
          <button @click="handleSignOut">Sign Out</button>
        </template>
      </nav>
      <!-- Toggle button for dark mode -->
      <ThemeToggle />
    </div>
  </header>

  <!-- RouterView to display the current route's component -->
  <RouterView />
</template>

<script setup>

// Import the HelloWorld component
import HelloWorld from "./components/HelloWorld.vue";
// Import ref, onMounted, and onBeforeMount from Vue
import { ref, onMounted } from "vue";
// Import storeToRefs from Pinia to keep reactivity
import { storeToRefs } from "pinia";
// Import useRouter from vue-router for navigation
import { useRouter } from "vue-router";
// Import useUserStore to access user-related data and actions
import { useUserStore } from "../src/stores/user";
// App Layout / AppLayout
import AppLayout from './components/AppLayout.vue';

// ------------------------------------------------------------------------
// Variable Definition Block
// ------------------------------------------------------------------------

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();
// Destructure the variable 'user' and 'isLoggedIn' out of the store, keeping their reactivity using storeToRefs
const { user, isLoggedIn } = storeToRefs(userStore);
// Reactive variable to hide/show elements based on user login status
const isUserloggedIn = ref(false);

// Using the onMounted lifecycle hook to perform actions when the component is mounted
// onMounted(() => {
//   try {
//     // Fetch the user data from the store on mount
//     userStore.fetchUser();
//   } catch (error) {
//     console.error("Error fetching user data:", error.message);
//   }
// });

// Using the onMounted lifecycle hook to perform actions when the component is mounted
onMounted(() => {
  console.log("hello calling function");
  try {
    // Fetch the user data from the store
    userStore.fetchUser();
    // Check if the user is stored in localStorage
    if (!user.value) {
      // If no user is found, redirect to login page
      router.push({ path: "/auth/login" });
    } else {
      // If user is found, update the reactive variable and redirect to home
      isUserloggedIn.value = true;
      router.push({ path: "/" });
    }
  } catch (error) {
    console.log(error);
  }
});


/**
 * Signs out the user and redirects to the login page.
 */
const handleSignOut =  () => {
  try {
    userStore.signOut();
    router.push({ path: "/auth/login" });
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

/*
  The handleSignOut function is used to log out the current user.
  - It calls the signOut function from the user store to clear user data.
  - It redirects the user to the login page.
*/

// ------------------------------------------------------------------------
// Additional Lifecycle Hooks (Placeholder for onBeforeMount, onUpdated)
// ------------------------------------------------------------------------

// Additional lifecycle hooks such as onBeforeMount and onUpdated can be added here if needed.
</script>

<!-- 
What is storeToRefs?
In order to extract properties from the store while keeping its reactivity, you need to use storeToRefs(). It will create refs for every reactive property. This is useful when you are only using state from the store but not calling any action. Note you can destructure actions directly from the store as they are bound to the store itself too.
Link: https://pinia.vuejs.org/core-concepts/
-->
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>