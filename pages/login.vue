<script lang="ts" setup>
definePageMeta({
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: "/",
    },
  });
  const { signIn } = useAuth();
  const username = ref("");
  const password = ref("");

  async function login () {
    const signResp = await signIn("credentials", {
        username: username.value,
        password: password.value,
        redirect: true,
        callbackUrl: "/",
      });
      if ((signResp as any).error) throw (signResp as any).error;
      navigateTo((signResp as any).url, { external: true })
  }
</script>

<template>
    <div class="loginContainer">

        <form @submit.prevent="login">
            <input v-model="username" type="text" id="username" />
            <input v-model="password" type="password" id="password" />
            <button type="submit">Login</button>
        </form>
        <button @click="$router.push({path:'/register'})">
            Register
        </button>
    </div>

</template>