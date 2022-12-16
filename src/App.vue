<script setup>
import Navbar from './components/Navbar.vue';
import { ref } from "vue";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Sidebar from './components/Sidebar.vue';

const user = ref(null)

let login = e => signInWithPopup(getAuth(), new GoogleAuthProvider)

onAuthStateChanged(getAuth(), u => user.value = u)
</script>

<template>
  <main v-if="user" class="max-w-6xl mx-auto h-screen divide-x grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(0,2fr)] text-gray-700">
    <navbar></navbar>
    <router-view></router-view>
    <sidebar></sidebar>
  </main>
  <div v-else>
    <button @click="login">Login</button>
  </div>
</template>