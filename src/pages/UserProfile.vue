<template>
  <div class="user-profile">
    <h1>User Profile</h1>
    <form @submit.prevent="updateProfile">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="profileData.username" type="text" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="profileData.email" type="email" required>
      </div>
      <div>
        <label for="password">New Password:</label>
        <input id="password" v-model="profileData.password" type="password">
      </div>
      <button type="submit">Update Profile</button>
    </form>
    <p v-if="message">{{ message }}</p>
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
