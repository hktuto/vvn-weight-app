<script setup lang="ts">
import type { FormError } from "@nuxt/ui/dist/runtime/types/form";
  definePageMeta({
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: "/",
    },
    layout:'fullscreen'
  });
  import { ref } from "vue";
  const router = useRouter();
  const { signIn } = useAuth();

  const state = ref({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.username) errors.push({ path: 'username', message: 'Required' })
    if (!state.email) errors.push({ path: 'email', message: 'Required' })
    if (!state.password) errors.push({ path: 'password', message: 'Required' })
    if(state.password !== state.confirmPassword) errors.push({ path: 'confirmPassword', message: 'Passwords do not match' })
    return errors
  }
  
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
          username: state.value.username,
          password: state.value.password,
          email: state.value.email,
        }),
      };
  
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error(resp.statusText);
  
      const user = await resp.json();
  
      const signResp = await signIn("credentials", {
        username: state.value.username,
        password: state.value.password,
        redirect: false,
        callbackUrl: "/",
      });
      if ((signResp as any).error) throw (signResp as any).error;
      
      // TODO: show notification
      router.push({
        path:'/setting'
      });
  
    } catch (e) {
      alert((e as any).message);
    } finally {
      // Reset form fields
      state.value.username = "";
      state.value.password = "";
      state.value.email = "";
      state.value.confirmPassword = "";
      
    }
  };
  </script>


<template>
  <UCard class="max-w-4xl w-[90%]">
    <template #header>
      <span class="text-xl">
        Register
      </span>
    </template>
    <Form
      :validate="validate"
      :state="state"
      @submit="register"
    >
      <UFormGroup label="Username" name="username">
        <UInput
          v-model="state.username"
          label="Username"
          placeholder="Enter your username"
        />
      </UFormGroup>
      <UFormGroup label="Email" name="email">
        <UInput
          v-model="state.email"
          label="Email"
          placeholder="Enter your email"
        />
        </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
      </UFormGroup>
      <UFormGroup label="Confirm Password" name="confirmPassword">
        <UInput
          v-model="state.confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
        />
      </UFormGroup>
      <UButton type="submit">Register</UButton>
    </Form>
    <template #footer>
      <div class="flex justify-center  text-xs">
        <NuxtLink href="/login">Already have an account? Login</NuxtLink>
      </div>
    </template>
  </UCard>
    
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