// This file sets up a global state management system for user authentication and profile management using Pinia.js.
// It defines a centralized store to manage the state of user-related data across our Vue.js application,
// allowing us to register, sign in, sign out, and retrieve tasks associated with the logged-in user.

// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import ref from Vue to create reactive references
import { ref } from "vue";
// Import ref from Vue to create reactive references
import { defineStore } from 'pinia';
// Import useTaskStore to access tasks related to the user
import { useTaskStore } from './taskStore';

// Define a new store named 'useUserStore' using Pinia
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null,
    isLoggedIn: false,
    previousPasswords: [],
    message: '',
  }),

  actions: {
    /**
     * Fetches user and profile data from local storage and updates the state.
     */
    fetchUser() {
      this.user = JSON.parse(localStorage.getItem('user')) || null;
      this.profile = JSON.parse(localStorage.getItem('profile')) || null;
      this.previousPasswords = JSON.parse(localStorage.getItem('previousPasswords')) || [];
      if (this.user) {
        this.isLoggedIn = true;
      }
      console.log('User data fetched:', {
        user: this.user,
        profile: this.profile,
        isLoggedIn: this.isLoggedIn,
      });
    },

    /**
     * Registers a new user and saves the user and profile data to local storage.
     * @param {string} email
     * @param {string} password
     * @throws
     */
    register(email, password) {
      const existingUser = JSON.parse(localStorage.getItem('user'));
      if (existingUser && existingUser.email === email) {
        this.message = 'User already exists with this email.';
        console.error(this.message);
        throw new Error(this.message);
      }

      const newUser = { id: Date.now(), email, password };
      this.user = newUser;
      localStorage.setItem('user', JSON.stringify(newUser));

      const newProfile = { user_id: newUser.id, username: email };
      this.profile = newProfile;
      localStorage.setItem('profile', JSON.stringify(newProfile));

      this.previousPasswords.push(password);
      localStorage.setItem('previousPasswords', JSON.stringify(this.previousPasswords));

      this.message = 'Account successfully created.';
      console.log(this.message, { newUser, newProfile });
      return true;
    },

    /**
     * Signs in a user by validating their credentials and updating the state.
     * @param {string} email
     * @param {string} password
     * @throws 
     */
    signIn(email, password) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log('Trying to sign in with:', { email, password });
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        this.user = storedUser;
        this.profile = JSON.parse(localStorage.getItem('profile')) || null;
        this.isLoggedIn = true;
        this.message = 'Successfully signed in.';
        console.log(this.message, { user: this.user, profile: this.profile });
        return true;
      } else {
        this.message = 'User not found or password incorrect.';
        console.error(this.message);
        throw new Error(this.message);
      }
    },

    /**
     * Signs out the current user and clears the user and profile data from state and local storage.
     */
    signOut() {
      this.user = null;
      this.profile = null;
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
      this.message = 'Successfully signed out.';
      console.log(this.message);
    },

    /**
     * Retrieves tasks for the current user by their user ID.
     * @returns {Array}
     */
    getTasksForUser() {
      const taskStore = useTaskStore();
      return taskStore.getTasksByUserId(this.user?.id);
    },

    /**
     * Retrieves the previous passwords of the user.
     * @returns {Array}
     */
    getPreviousPasswords() {
      return this.previousPasswords;
    },
  },
});
