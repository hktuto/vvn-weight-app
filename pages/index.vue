<script setup lang="ts">
definePageMeta({
  layout: "fullscreen",
})
const { data, status, signOut } = useAuth();



</script>

<template>
    {{ data }}
    {{ status }}
</template>
 