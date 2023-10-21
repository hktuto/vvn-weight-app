<script setup lang="ts">
const { data, status, signOut } = useAuth();

const { data: users } = useFetch("/api/users");


</script>

<template>
    WELCOME TO MY APP
    <p>DATA: {{ JSON.stringify(data) }}</p>
    users: {{ users }}
    data: {{ data }}
    <p>AUTH STATUS: {{ status }}</p>
    <button @click="() => signOut()">
     SIGN OUT
  </button>
</template>
 