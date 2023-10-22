<script setup lang="ts">
definePageMeta({
  layout: "app",
})
const { data, status, signOut } = useAuth();
const router = useRouter()



</script>

<template>
    <UContainer>
      <h1>Home</h1>
    </UContainer>
    
</template>
 