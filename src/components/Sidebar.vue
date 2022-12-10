<script setup>
const trends = ["Kalmar Slott", "Ironman", "Shopping"]

const users = [
    { name: "Kalle Anka satt på en planka och det då va", avatar: "/images/avatar1.jpg" },
    { name: "Pelle", avatar: "/images/avatar2.jpg" },
    { name: "Nisse", avatar: "/images/avatar3.jpg" },
]
</script>

<template>
    <div class="p-4 flex flex-col gap-4">
        <div class="bg-gray-100 text-gray-500 px-4 py-3 rounded-full flex items-center gap-4">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input placeholder="Search Twitter" class="bg-transparent outline-none">
        </div>
        <div class="bg-gray-100 rounded-2xl overflow-hidden">
            <header class="p-4 flex items-center justify-between">
                <h3 class="font-bold">Trends for you</h3>
                <button class="text-blue-400">
                    <i class="fa-solid fa-gear"></i>
                </button>
            </header>
            <div v-for="trend in trends" class="p-4 flex items-center justify-between hover:bg-gray-200 transition cursor-pointer">
                <div>
                    <p class="text-sm text-gray-500">Trending in Sweden</p>
                    <h3 class="font-bold">{{ trend }}</h3>
                </div>
                <button class="text-gray-500">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            <footer class="p-4 text-sm text-blue-400 hover:bg-gray-200 transition cursor-pointer">Show more</footer>
        </div>
        <div class="bg-gray-100 rounded-2xl overflow-hidden">
            <header class="p-4 font-bold">Who to follow</header>
            <div v-for="{ name, avatar } in users" class="p-4 flex items-center gap-4 hover:bg-gray-200 transition cursor-pointer">
                <img :src="avatar" class="w-12 h-12 rounded-full object-cover">
                <div class="min-w-0">
                    <h3 class="font-bold truncate">{{ name }}</h3>
                    <p class="text-sm text-gray-500">@handle</p>
                </div>
                <button class="bg-blue-400 text-white text-sm px-3 py-1 rounded-full ml-auto">Follow</button>
            </div>
            <footer class="p-4 text-sm text-blue-400 hover:bg-gray-200 transition cursor-pointer">Show more</footer>
        </div>
    </div>
</template>