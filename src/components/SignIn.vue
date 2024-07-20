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
      <div class="login-container">
        <h3 class="header-title heading-2">Log In to ToDo App</h3>
        <form @submit.prevent="signIn">
          <div class="form">
            <!-- Email Input Field -->
            <label class="label" for="email">Email
              <input
                type="email"
                placeholder="example@gmail.com"
                id="email"
                v-model="formState.email"
                required
              />
            </label>
            <!-- Password Input Field -->
            <label class="label" for="password">Password
              <div class="password-wrapper">
                <input
                  :type="passwordVisible ? 'text' : 'password'"
                  placeholder="**********"
                  id="password"
                  v-model="formState.password"
                  aria-label="Password"
                  required
                />
                <span 
                  class="toggle-password"
                  @click="togglePasswordVisibility"
                  aria-label="Toggle password visibility"
                >
                  <i :class="passwordVisible ? 'icon-eye' : 'icon-eye-off'"></i>
                </span>
              </div>
            </label>
            <!-- Submit Button -->
            <button type="submit" class="glow-on-hover">Log In</button>
          </div>
        </form>
        <!-- Display error message if login fails -->
        <p v-if="formState.errorMsg" class="error-msg">{{ formState.errorMsg }}</p>
        <!-- Account creation link -->
        <p class="account-text">
          Don't have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="glow-on-hover" />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Reactive state block for form fields and error messages
const formState = reactive({
  email: "",
  password: "",
  errorMsg: "",
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

// Reactive variable for password visibility
const passwordVisible = ref(false);

// Function to toggle password visibility
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// Function to handle user sign-in
const signIn = async () => {
  try {
    await userStore.signIn(formState.email, formState.password);
    isLoggedIn.value = true;
    router.push("/");
  } catch (error) {
    formState.errorMsg = error.message.includes("User not found") || error.message.includes("Password incorrect")
      ? "User not found or password incorrect"
      : "An error occurred during login. Please try again.";
    setTimeout(() => {
      formState.errorMsg = "";
    }, 8000);
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin: 0;
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
  margin-top: 2rem;
  width: 100%;
  max-width: 400px;
}

.header-title {
  text-align: center;
  margin-bottom: 0.5rem;
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

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #2a2a2a;
  color: #f0f0f0;
}

.toggle-password {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: black;
}

.icon-eye,
.icon-eye-off {
  font-size: 1.25rem;
  color: #ccc;
}

.icon-eye:hover,
.icon-eye-off:hover {
  color: white;
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

.account-text {
  text-align: center;
  margin-top: 1rem;
  color: #f0f0f0;
}

.account-text a {
  color: #28a745;
  text-decoration: none;
}

.account-text a:hover {
  text-decoration: underline;
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

.c-white {
  color: white;
}
</style>
