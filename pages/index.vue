<script setup lang="ts">
definePageMeta({
  layout: "fullscreen",
})
const { data, status, signOut } = useAuth();
const router = useRouter()
const { getSetting, settingData } = useSetting();


watch(status, async (val) => {
  if(val === "authenticated") {
    await getSetting(data.value?.user.id as string);
  }
},{
  immediate:true
})

</script>

<template>
    {{ data }}
    <UButton @click="signOut">Sign Out</UButton>
</template>
 