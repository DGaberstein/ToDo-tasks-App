// This file sets up the routing configuration for a Vue.js application using Vue Router.
// It defines the routes and their corresponding components, including nested routes for authentication pages.

// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import createRouter and createWebHistory from vue-router to set up the router
import { createRouter, createWebHistory } from "vue-router";
// Import page components for routing
import HomePage from "../pages/HomePage.vue";
import AboutPage from "../pages/AboutPage.vue";
import AllTasksPage from "../pages/AllTasksPage.vue";
import CompletedTasksPage from "../pages/CompletedTasksPage.vue";
import AddTaskPage from "../pages/AddTaskPage.vue";
import AuthPage from "../pages/AuthPage.vue";
import UserProfilePage from "../pages/UserProfile.vue";
// Import components for nested routes
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";

// ------------------------------------------------------------------------
// Router Configuration Block
// ------------------------------------------------------------------------

// Create a new router instance
const router = createRouter({
  // Use createWebHistory for history mode routing
  history: createWebHistory(import.meta.env.BASE_URL),
  // Define the routes for the application
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
    },
    {
      path: "/all-tasks",
      name: "all tasks page",
      component: AllTasksPage,
    },
    {
      path: "/completed-tasks",
      name: "completed tasks page",
      component: CompletedTasksPage,
    },
    {
      path: "/add-task",
      name: "add new task page",
      component: AddTaskPage,
    },
    {
      path: "/profile",
      name: "user profile",
      component: UserProfilePage,
    },
    // Nested routes for authentication
    {
      path: "/auth", // Parent path for authentication routes
      name: "Parent structure for nested routes, only using a RouterView",
      component: AuthPage,
      // Define the nested routes
      children: [
        // Nested Route #1 for login
        {
          path: "login",
          name: "Login Nested Route",
          component: SignIn,
        },
        // Nested Route #2 for register
        {
          path: "register",
          name: "Register Nested Route",
          component: SignUp,
        },
      ],
    },
  ],
});

// Export the router instance
export default router;

/*
Summary:
This file defines the routing configuration for a Vue.js application. It includes routes for home, about, all tasks, completed tasks, and add task pages. It also sets up nested routes for authentication (login and register) under the "/auth" path. The router is configured using createRouter and createWebHistory from vue-router.
*/
