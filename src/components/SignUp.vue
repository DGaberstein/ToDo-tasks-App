<template>
  <div class="container">
    <div class="header">
      <h1 class="title heading-2">The ToDo App</h1>
      <nav>
        <ul class="nav-links">
          <RouterLink to="/auth/login" class="c-white">Login</RouterLink>
          <RouterLink to="/auth/register" class="c-white">Register</RouterLink>
        </ul>
      </nav>
    </div>
    <div class="register-container">
      <h3 class="header-title heading-2">Register to ToDo tasks App</h3>
      <p class="header-subtitle teasing-1">Start organizing your tasks!</p>
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
          <button type="submit" class="glow-on-hover">Sign Up</button>
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
/* Existing styles for SignUp.vue component */
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

body {
  background: black;
  text-align: center;
  padding: 50px;
  box-sizing: border-box;
}

.btn {
  font-size: 1em;
  line-height: 1em;
  letter-spacing: 0.04em;
  display: inline-block;
}

.btn--svg {
  position: relative;
  height: 42px;
  width: 190px;
  overflow: hidden;
  border-radius: 21px;
}

.btn--svg:hover .btn--svg__circle circle {
  transform: scale(0);
}

.btn--svg:hover .btn--svg__label {
  color: #fff;
}

.btn--svg:hover .btn--svg__border--left path,
.btn--svg:hover .btn--svg__border--right path {
  stroke-dasharray: 61.8204345703 61.8204345703;
  stroke-dashoffset: 0;
  transition-delay: 0.25s;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  transition-property: stroke-dashoffset;
}

.btn--svg__label {
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
  color: black;
  z-index: 3;
  width: 100%;
  transition: color 0.5s ease-in-out;
}

.btn--svg__circle circle {
  transition: transform 0.5s ease-in-out;
  transform: scale(1.1);
  transform-origin: 50% 50%;
}

.btn--svg__border--left path,
.btn--svg__border--right path {
  stroke-dasharray: 61.8204345703 61.8204345703;
  transition-duration: 0s;
  transition-timing-function: ease-in-out;
  transition-property: stroke-dashoffset;
  transition-delay: 0.5s;
}

.btn--svg__border--left path {
  stroke-dashoffset: -61.8204345703;
}

.btn--svg__border--right path {
  stroke-dashoffset: 61.8204345703;
}

.btn--svg svg,
.btn--svg__label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 50% 50%;
}

.c-white {
  color: white;
}

.trailer {
  margin-bottom: 40px;
}

.trailer--nano {
  margin-bottom: 10px;
}

a {
  position: relative;
  text-decoration: none;
  color: #28A745;
}

a:after {
  content: "";
  height: 1px;
  bottom: -4px;
  position: absolute;
  left: 5%;
  right: 95%;
  background: #28A745;
  transition: right 0.25s ease-in-out;
}

a:hover:after {
  right: 5%;
}

.teasing-1,
.heading-2 {
  font-family: sans-serif;
  letter-spacing: 0.04em;
  font-weight: 400;
  text-rendering: optimizeLegibility;
}

/* Existing styles for SignUp.vue component */

/* Add the new button style */
.glow-on-hover {
  width: 220px;
  height: 50px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}

.glow-on-hover:before {
  content: '';
  background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity .3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:active {
  color: #000;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}
</style>
