<script setup>
import { getAuth, signOut } from '@firebase/auth';

const links = [
    { title: "Home", icon: "fa-solid fa-home" },
    { title: "Explore", icon: "fa-solid fa-hashtag" },
    { title: "Notifications", icon: "fa-regular fa-bell" },
    { title: "Messages", icon: "fa-regular fa-envelope" },
    { title: "Bookmarks", icon: "fa-regular fa-bookmark" },
    { title: "Lists", icon: "fa-solid fa-clipboard-list" },
    { title: "Profile", icon: "fa-regular fa-user" },
    { title: "More", icon: "fa-solid fa-ellipsis" },
]

const { displayName, photoURL } = getAuth().currentUser
</script>

<template>
    <div class="p-4 flex flex-col gap-4">
        <router-link to="/" class="text-3xl text-blue-400 ml-3">
            <i class="fa-brands fa-twitter"></i>
        </router-link>
        <nav>
            <router-link to="/" v-for="{ title, icon } in links" class="flex items-center gap-4 p-3 rounded-full hover:bg-gray-100 transition">
                <i :class="icon" class="fa-fw text-2xl"></i>
                <p class="text-lg font-semibold">{{ title }}</p>
            </router-link>
        </nav>
        <button class="bg-blue-400 text-white p-3 rounded-full font-bold w-3/4">Tweet</button>
        <button @click="signOut(getAuth())" class="mt-auto flex items-center gap-4 hover:bg-gray-100 transition rounded-full p-3">
            <img :src="photoURL" class="w-10 h-10 rounded-full object-cover">
            <div class="text-left min-w-0">
                <h3 class="font-bold truncate">{{ displayName }}</h3>
                <p class="text-sm text-gray-500">@handle</p>
            </div>
            <i class="fa-solid fa-ellipsis ml-auto"></i>
        </button>
    </div>
</template>