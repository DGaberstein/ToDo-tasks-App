<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <template v-if="!isLoggedIn">
            <!-- If the user is not logged in, the navigation will be handled by SignIn and SignUp components -->
          </template>
          <template v-else>
            <!-- If the user is logged in, show these links -->
            <RouterLink to="/" class="nav-link">Home</RouterLink>
            <RouterLink to="/about" class="nav-link">About</RouterLink>
            <RouterLink to="/all-tasks" class="nav-link">All Tasks</RouterLink>
            <RouterLink to="/completed-tasks" class="nav-link">Completed Tasks</RouterLink>
            <RouterLink to="/add-task" class="nav-link">Add New Task</RouterLink>
            <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
            <button @click="handleSignOut" class="sign-out-button">Sign Out</button>
          </template>
        </nav>
        <!-- Toggle button for dark mode -->
        <ThemeToggle />
      </div>
    </header>

    <!-- Main content section to avoid overlap with header -->
    <main>
      <!-- RouterView to display the current route's component -->
      <RouterView />
    </main>
  </div>
</template>

<script setup>
// Import the necessary components and functions
import HelloWorld from "./components/HelloWorld.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "../src/stores/user";
import AppLayout from './components/AppLayout.vue';

// Initialize router and store
const router = useRouter();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);
const isUserloggedIn = ref(false);

onMounted(() => {
  try {
    userStore.fetchUser();
    if (!user.value) {
      router.push({ path: "/auth/login" });
    } else {
      isUserloggedIn.value = true;
      router.push({ path: "/" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

const handleSignOut = () => {
  try {
    userStore.signOut();
    router.push({ path: "/auth/login" });
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
</script>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #181818;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

nav {
  display: flex;
  gap: 15px;
}

.nav-link {
  color: #edf2f7; 
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #4a5568; 
  color: #e2e8f0; 
}

.sign-out-button {
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.sign-out-button:hover {
  background-color: #c53030;
  transform: scale(1.05);
}

/* Ensure RouterView is not overlapping with the header */
main {
  padding-top: 70px;
}
</style>
