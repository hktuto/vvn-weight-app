<script setup lang="ts">
  definePageMeta({
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: "/",
    },
  });
  import { ref } from "vue";
  const router = useRouter();
  const { signIn } = useAuth();
  
  const username = ref("");
  const age = ref(0);
  const password = ref("");
  const firstName = ref("");
  const lastName = ref("");
  
  const register = async () => {
    try {
      // do register
      let url = "/api/register";
      let options = {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value,
          age: age.value,
        }),
      };
  
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error(resp.statusText);
  
      const user = await resp.json();
  
      const signResp = await signIn("credentials", {
        username: username.value,
        password: password.value,
        redirect: false,
        callbackUrl: "/",
      });
      if ((signResp as any).error) throw (signResp as any).error;
  
      return navigateTo((signResp as any).url, { external: true })
  
    } catch (e) {
      alert((e as any).message);
    } finally {
      // Reset form fields
      username.value = "";
      age.value = 0;
      password.value = "";
      firstName.value = "";
      lastName.value = "";
    }
  };
  </script>


<template>
    <button @click="router.back()">BACK</button>
    <form @submit.prevent="register" class="form-container">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input v-model="firstName" type="text" id="firstName" />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input v-model="lastName" type="text" id="lastName" />
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input v-model="age" type="number" id="age" />
      </div>
      <div class="form-group">
        <button type="submit">Register</button>
      </div>
    </form>
  </template>
  
  
  <style scoped>
  .form-container {
    display: grid;
    grid-template-columns: max-content auto;
    gap: 8px;
    align-items: center;
    width: 400px;
    margin: 32px;
  }
  
  .form-group {
    display: contents; /* Allow the label and input to be displayed inline */
  }
  
  .form-group label {
    text-align: right;
    padding-right: 8px;
  }
  
  .form-group input {
    width: 100%; /* Occupy full width of the column */
  }
  </style>