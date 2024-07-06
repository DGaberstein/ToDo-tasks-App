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
    <div class="register-container">
      <h3 class="header-title">Register to ToDo tasks App</h3>
      <p class="header-subtitle">Start organizing your tasks!</p>
      <form @submit.prevent="signUp">
        <div class="form">
          <!-- Email Input Field -->
          <label>Email
            <input
              type="email"
              placeholder="example@gmail.com"
              id="email"
              v-model="formState.email"
              required
            />
          </label>
          <!-- Password Input Field -->
          <label>Password
            <input
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="**********"
              id="password"
              v-model="formState.password"
              required
            />
            <button type="button" @click="togglePasswordVisibility">Toggle Password</button>
          </label>
          <!-- Confirm Password Input Field -->
          <label>Confirm password
            <input
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="**********"
              id="confirmPassword"
              v-model="formState.confirmPassword"
              required
            />
          </label>
          <!-- Sign Up Button -->
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <!-- Display error message if any -->
      <p v-show="formState.errorMsg" class="error-msg">{{ formState.errorMsg }}</p>
      <!-- Display success message if registration is successful -->
      <p v-show="formState.successMsg" class="success-msg">{{ formState.successMsg }}</p>
      <p>
        Have an account?
        <!-- Redirect to login page using PersonalRouter -->
        <PersonalRouter :route="goToRoute" :buttonText="buttonText" class="sign-up-link" />
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"; // Importing reactive and ref from Vue
import { useRouter } from "vue-router"; // Importing useRouter from Vue Router
import PersonalRouter from "./PersonalRouter.vue"; // Importing PersonalRouter component
import { useUserStore } from "../stores/user"; // Importing user store

// ------------------------------------------------------------------------
// Reactive State Block
// ------------------------------------------------------------------------

// Reactive state for form inputs and messages
const formState = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  errorMsg: "",
  successMsg: "",
});

// ------------------------------------------------------------------------
// Initialization Block
// ------------------------------------------------------------------------

const router = useRouter(); // Initializing router
const userStore = useUserStore(); // Initializing user store
const goToRoute = "/auth/login"; // Defining route for redirecting
const buttonText = "Sign In"; // Defining button text
const passwordVisible = ref(false); // Reactive reference for password visibility

// ------------------------------------------------------------------------
// Function to toggle password visibility
// ------------------------------------------------------------------------

/**
 * Toggles the visibility of the password field.
 */
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

/*
  The togglePasswordVisibility function is used to toggle the visibility of the password field.
  - It flips the boolean value of passwordVisible to switch between text and password input types.
*/

// ------------------------------------------------------------------------
// Function to validate password strength
// ------------------------------------------------------------------------

/**
 * Validates the strength of the password.
 * @param {string} password - The password to validate.
 * @returns {string|null} - Returns an error message if validation fails, otherwise null.
 */
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/;
  if (!regex.test(password)) {
    return "Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and symbols.";
  }
  const dictionaryWords = ["password", "123456", "qwerty", "letmein"];
  const namePattern = /(\w+)\s+(\w+)/;
  if (dictionaryWords.includes(password.toLowerCase()) || namePattern.test(password)) {
    return "Password should not be a dictionary word or a common name.";
  }
  const previousPasswords = userStore.getPreviousPasswords();
  if (previousPasswords.includes(password)) {
    return "Password should be significantly different from previous passwords.";
  }
  return null;
};

/*
  The validatePassword function checks the password strength.
  - It uses regex to ensure the password contains uppercase, lowercase, numbers, and symbols.
  - It avoids common dictionary words or patterns.
  - It checks against previously used passwords.
*/

// ------------------------------------------------------------------------
// Function to handle user registration
// ------------------------------------------------------------------------

/**
 * Handles the user registration process.
 */
const signUp = () => {
  // Validate passwords match
  if (formState.password !== formState.confirmPassword) {
    formState.errorMsg = "Passwords do not match. Please try again.";
    setTimeout(() => {
      formState.errorMsg = "";
    }, 2000);
    return;
  }
  // Validate password strength
  const passwordError = validatePassword(formState.password);
  if (passwordError) {
    formState.errorMsg = passwordError;
    setTimeout(() => {
      formState.errorMsg = "";
    }, 5000);
    return;
  }
  try {
    if (userStore.register(formState.email, formState.password)) {
      // Clear form and show success message
      formState.email = "";
      formState.password = "";
      formState.confirmPassword = "";
      formState.errorMsg = "";
      formState.successMsg = "Registration successful!";
      setTimeout(() => {
        formState.successMsg = "";
      }, 5000);
    }
  } catch (error) {
    formState.errorMsg = error.message;
    setTimeout(() => {
      formState.errorMsg = "";
    }, 5000);
  }
};

/*
  The signUp function handles user registration.
  - It ensures passwords match and meet strength criteria.
  - It registers the user and displays success or error messages.
*/
</script>

<style scoped>
/* Scoped styles for SignUp.vue component */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #121212;
  color: #F0F0F0;
  padding: 2rem;
}
.header {
  text-align: center;
  margin-bottom: 2rem;
}
.title {
  font-size: 2rem;
  color: #28A745;
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
  color: #28A745;
}
.nav-links a:hover {
  text-decoration: underline;
}
.register-container {
  background-color: #1E1E1E;
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
.header-subtitle {
  text-align: center;
  margin-bottom: 1rem;
  color: #ccc;
}
.form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
label {
  display: grid;
  grid-template-columns: auto 1fr auto;
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
  background-color: #28A745;
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
.success-msg {
  color: #218838;
  text-align: center;
}
.sign-up-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #28A745;
  cursor: pointer;
}
.sign-up-link:hover {
  text-decoration: underline;
}
</style>