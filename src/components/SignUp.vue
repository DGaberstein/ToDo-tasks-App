<template>
  <div class="main-container">
    <div class="container">
      <div class="header">
        <h1 class="title heading-2">The ToDo App</h1>
        <nav>
          <ul class="nav-links">
            <li><RouterLink to="/auth/login" class="c-white">Login</RouterLink></li>
            <li><RouterLink to="/auth/register" class="c-white">Register</RouterLink></li>
          </ul>
        </nav>
      </div>
      <div class="register-container">
        <h3 class="header-title heading-2">Register to ToDo tasks App</h3>
        <p class="header-subtitle teasing-1">Start organizing your tasks!</p>
        <form @submit.prevent="signUp">
          <div class="form">
            <!-- Email Input Field -->
            <label class="label">Email
              <input
                type="email"
                placeholder="example@gmail.com"
                id="email"
                v-model="formState.email"
                required
              />
            </label>
            <!-- Password Input Field -->
            <label class="label">Password
              <div class="password-wrapper">
                <input
                  :type="passwordVisible ? 'text' : 'password'"
                  placeholder="**********"
                  id="password"
                  v-model="formState.password"
                  required
                />
                <span class="toggle-password" @click="togglePasswordVisibility">
                  <i :class="passwordVisible ? 'icon-eye' : 'icon-eye-off'"></i>
                </span>
              </div>
            </label>
            <!-- Confirm Password Input Field -->
            <label class="label">Confirm password
              <div class="password-wrapper">
                <input
                  :type="passwordVisible ? 'text' : 'password'"
                  placeholder="**********"
                  id="confirmPassword"
                  v-model="formState.confirmPassword"
                  required
                />
                <span class="toggle-password" @click="togglePasswordVisibility">
                  <i :class="passwordVisible ? 'icon-eye' : 'icon-eye-off'"></i>
                </span>
              </div>
            </label>
            <!-- Terms and Conditions -->
            <label class="terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                v-model="formState.termsAccepted"
                required
              />
              <span class="checkbox-label">
                I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>.
              </span>
            </label>
            <!-- Container for Sign Up Button and Account Link -->
            <div class="action-container">
              <button type="submit" class="glow-on-hover">Sign Up</button>
              <p class="account-text">
                Have an account? <PersonalRouter :route="goToRoute" :buttonText="buttonText" class="glow-on-hover" />
              </p>
            </div>
          </div>
        </form>
        <!-- Display error message if any -->
        <p v-show="formState.errorMsg" class="error-msg">{{ formState.errorMsg }}</p>
        <!-- Display success message if registration is successful -->
        <p v-show="formState.successMsg" class="success-msg">{{ formState.successMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";

// ------------------------------------------------------------------------
// Reactive State Block
// ------------------------------------------------------------------------

const formState = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
  errorMsg: "",
  successMsg: "",
});

// ------------------------------------------------------------------------
// Initialization Block
// ------------------------------------------------------------------------

const router = useRouter();
const userStore = useUserStore();
const goToRoute = "/auth/login";
const buttonText = "Sign In";
const passwordVisible = ref(false);

// ------------------------------------------------------------------------
// Function to toggle password visibility
// ------------------------------------------------------------------------

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// ------------------------------------------------------------------------
// Function to validate password strength
// ------------------------------------------------------------------------

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

// ------------------------------------------------------------------------
// Function to handle user registration
// ------------------------------------------------------------------------

const signUp = () => {
  // Validate terms acceptance
  if (!formState.termsAccepted) {
    formState.errorMsg = "You must agree to the terms of service and privacy policy.";
    setTimeout(() => {
      formState.errorMsg = "";
    }, 2000);
    return;
  }
  
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
      formState.termsAccepted = false;
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
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #121212;
}

.container {
  background-color: #121212;
  color: #f0f0f0;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
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
  justify-content: center; /* Center align the navigation links */
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

.register-container {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
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

.label {
  margin-bottom: 0.5rem;
}

.password-wrapper {
  position: relative;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.toggle-password {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: black;
}

.icon-eye::before {
  content: '\f06e';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.icon-eye-off::before {
  content: '\f070';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

button {
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
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
  color: #28a745;
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
  border-radius: 4px;
}

@keyframes glowing {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}

.action-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the elements inside the action-container */
  gap: 0.5rem;
  margin-top: 1rem;
}

.account-text {
  margin-left: 1rem;
  color: #f0f0f0;
}

.account-text a {
  color: #28a745;
  text-decoration: none;
}

.account-text a:hover {
  text-decoration: underline;
}

.terms-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.checkbox-label {
  color: #f0f0f0;
}

.checkbox-label a {
  color: #28a745;
  text-decoration: none;
}

.checkbox-label a:hover {
  text-decoration: underline;
}
</style>
