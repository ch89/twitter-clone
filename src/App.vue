<script setup>
import Navbar from './components/Navbar.vue';
import { ref } from "vue";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Sidebar from './components/Sidebar.vue';

const user = ref(null)

let login = async e => {
  const cred = await signInWithPopup(getAuth(), new GoogleAuthProvider)

  if(getAdditionalUserInfo(cred).isNewUser) {
    const { uid, displayName, photoURL } = cred.user

    setDoc(doc(getFirestore(), `users/${uid}`), { uid, displayName, photoURL })
  }
}

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

<style>
  .avatar {
    @apply w-12 h-12 rounded-full object-cover;
  }

  form:has(:invalid) [type="submit"] {
    @apply opacity-50 cursor-not-allowed;
  }

  .loading {
    @apply !text-transparent cursor-not-allowed grid place-items-center after:absolute after:w-4 after:h-4 after:border-2 after:border-white after:rounded-full after:border-r-transparent after:border-t-transparent after:animate-spin;
  }
</style>