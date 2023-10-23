

<script lang="ts" setup>
import type { FormError } from "@nuxt/ui/dist/runtime/types/form";
definePageMeta({
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: "/",
    },
    layout:'fullscreen'
  });
  const { signIn } = useAuth();
  const username = ref("");
  const password = ref("");

  const state = ref({
    username: "",
    password: "",
  })

  const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.username) errors.push({ path: 'username', message: 'Required' })
    if (!state.password) errors.push({ path: 'password', message: 'Required' })
    return errors
  }

  async function submit () {
    console.log("submitting")
    try{

      const signResp = await signIn("credentials", {
        username: state.value.username,
        password: state.value.password,
        redirect: false,
        callbackUrl: "/",
      });
      if ((signResp as any).error) throw (signResp as any).error;
      navigateTo((signResp as any).url, { external: true })
    } catch(e) {
      console.log(e)
      // reset form
      state.value.username = ""
      state.value.password = ""
    }
  }
</script>

<template>
  <UCard class=" max-w-4xl w-[90%]">
    <template #header>
      <span class="text-xl">
        Login
      </span>
    </template>
    <Form
      :validate="validate"
      :state="state"
      @submit="submit"
    >
        <UFormGroup label="Username" name="username"> 
          <UInput
            v-model="state.username"
            label="Username"
            placeholder="Enter your username"
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
        <UButton type="submit" >Login</UButton>
      
      </Form>
        <template #footer>
          <div class="flex justify-between text-xs">
            <NuxtLink href="/register"> Register</NuxtLink>
          </div>

        </template>
  </UCard>

</template>