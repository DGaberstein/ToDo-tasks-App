<template>
  <div class="bg-gradient-to-br from-purple-600 to-indigo-700 min-h-screen p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="p-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-6">User Profile</h1>
        <form @submit.prevent="updateProfile" class="space-y-6">
          <div class="relative">
            <input id="username" v-model="profileData.username" type="text" required class="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 placeholder-transparent">
            <label for="username" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">Username</label>
          </div>
          <div class="relative">
            <input id="email" v-model="profileData.email" type="email" required class="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 placeholder-transparent">
            <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">Email</label>
          </div>
          <div class="relative">
            <input id="password" v-model="profileData.password" type="password" class="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 placeholder-transparent">
            <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">New Password</label>
          </div>
          <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            Update Profile
          </button>
        </form>
        <p v-if="message" class="mt-6 text-sm text-gray-600">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user, profile } = storeToRefs(userStore);
const message = ref('');

const profileData = ref({
  username: '',
  email: '',
  password: ''
});

onMounted(() => {
  if (user.value && profile.value) {
    profileData.value.username = profile.value.username || '';
    profileData.value.email = user.value.email || '';
  }
});

const updateProfile = async () => {
  try {
    // Update the user and profile data
    if (profileData.value.username) {
      profile.value.username = profileData.value.username;
    }
    if (profileData.value.email) {
      user.value.email = profileData.value.email;
    }
    if (profileData.value.password) {
      user.value.password = profileData.value.password;
    }

    // Save the updated data using the store methods
    await userStore.updateUser(user.value);
    await userStore.updateProfile(profile.value);

    // Update message to indicate success
    message.value = 'Profile updated successfully';
  } catch (error) {
    message.value = 'Failed to update profile';
    console.error('Error updating profile:', error);
  }
};
</script>

<style scoped>
.user-profile {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
