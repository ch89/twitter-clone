<script setup>
import { getAuth } from '@firebase/auth';
import moment from 'moment';
import { useRouter } from "vue-router";
import { ref } from "vue";
import { collection, getCountFromServer, getFirestore, query, where } from '@firebase/firestore';

const { uid, displayName, photoURL, metadata: { creationTime } } = getAuth().currentUser
const router = useRouter()
const count = ref(0)

const links = [
  { title: "Tweets", name: "tweets" },
  { title: "Tweets & replies", name: "replies" },
  { title: "Media", name: "media" },
  { title: "Likes", name: "likes" },
]

getCountFromServer(
  query(
    collection(getFirestore(), "tweets"),
    where("uid", "==", uid)
  )
).then(snapshot => count.value = snapshot.data().count)
</script>

<template>
  <div class="overflow-auto scrollbar-hide">
    <header class="p-4 border-b flex items-center gap-4 sticky top-0 z-10 bg-white/50 backdrop-blur">
      <button @click="router.back">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <h3 class="font-bold">{{ displayName }}</h3>
      <p class="ml-auto text-sm text-gray-500">{{ count }} Tweets</p>
    </header>
    <div class="relative">
      <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" class="h-48 w-full object-cover">
      <img :src="photoURL" class="w-32 h-32 rounded-full object-cover absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white">
      <div class="p-4 flex justify-between items-start">
        <div>
          <h3 class="font-bold">{{ displayName }}</h3>
          <p class="text-sm text-gray-500">@handle</p>
          <p class="text-sm text-gray-500">
            <i class="fa-regular fa-calendar-alt"></i> Joined {{ moment(creationTime).format("MMMM YYYY") }}
          </p>
          <span class="text-sm text-gray-500 mr-2">2 Following</span>
          <span class="text-sm text-gray-500">3 Followers</span>
        </div>
        <button class="bg-blue-400 text-white px-4 py-2 rounded-full font-semibold text-sm">Edit profile</button>
      </div>
      <nav class="border-b grid grid-flow-col text-sm text-center text-gray-500">
        <router-link :to="{ name }" v-for="{ title, name } in links" class="p-4 hover:bg-gray-100 transition">{{ title }}</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
  .router-link-exact-active {
    @apply border-b-4 border-blue-400;
  }
</style>