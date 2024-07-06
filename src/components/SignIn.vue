<template>
  <div class="container">
    <div class="header">
      <h1 class="title">The ToDo App</h1>
      <nav>
        <ul class="nav-links">
          <!-- Display login and register links -->
          <RouterLink to="/auth/login">Login</RouterLink>
          <RouterLink to="/auth/register">Register</RouterLink>
        </ul>
      </nav>
    </div>
    <div class="login-container">
      <h3 class="header-title">Log In to ToDo App</h3>
      <form @submit.prevent="signIn">
        <div class="form">
          <!-- Email Input -->
          <label>Email
            <input id="email" type="text" v-model="formState.email" />
          </label>
          <!-- Password Input -->
          <label>Password
            <input id="password" type="password" v-model="formState.password" />
          </label>
          <!-- Submit Button -->
          <button type="submit">Log In</button>
        </div>
      </form>
      <!-- Display error message if login fails -->
      <p v-if="formState.errorMsg" class="error-msg">{{ formState.errorMsg }}</p>

      <p>
        Don't have an account?
        <!-- Redirect to registration page using PersonalRouter -->
        <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link" />
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Reactive variable to store email, password, and error messages
const formState = reactive({
  email: "",
  password: "",
  errorMsg: "", // Initialize error message
});

// Access router instance
const router = useRouter();
// Access user store
const userStore = useUserStore();
// Destructure isLoggedIn from user store with storeToRefs
const { isLoggedIn } = storeToRefs(userStore);

// Route and button text for registration link
const route = "/auth/register";
const buttonText = "Sign Up";

// Function to handle user sign-in
let signIn = async () => {
  try {
    // Call signIn method from user store
    await userStore.signIn(formState.email, formState.password);
    // Set isLoggedIn to true on successful login
    isLoggedIn.value = true;
    // Redirect user to home page or desired route
    router.push("/");
  } catch (error) {
    // Handle specific error messages
    if (error.message === "User not found" || error.message === "Password incorrect") {
      formState.errorMsg = "User not found or password incorrect";
    } else {
      // Handle other errors
      console.error("Login error:", error.message);
      formState.errorMsg = "An error occurred during login. Please try again.";
    }
    // Clear error message after 8 seconds
    setTimeout(() => {
      formState.errorMsg = "";
    }, 8000);
  }
};
</script>

<style scoped>
/* Scoped styles for SignIn.vue component */
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

.nav-links {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav-links li {
  margin: 0 0.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #28a745;
}

.nav-links a:hover {
  text-decoration: underline;
}

.login-container {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.header-title {
  text-align: center;
  margin-bottom: 1rem;
}

.form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
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
}

.sign-up-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #28a745;
  cursor: pointer;
}

.sign-up-link:hover {
  text-decoration: underline;
}
</style>
