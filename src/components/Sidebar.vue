<script setup>
import { getAuth } from '@firebase/auth';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, query, setDoc, where } from '@firebase/firestore';
import { onBeforeUnmount, ref, computed } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()
const trends = ["Kalmar Slott", "Ironman", "Shopping"]
const users = ref([])
const follows = computed(() => store.state.follows)
const { uid } = getAuth().currentUser

let follow = id => {
    if(follows.value.includes(id)) {
        deleteDoc(doc(getFirestore(), `users/${uid}/follows/${id}`))
    }
    else {
        setDoc(doc(getFirestore(), `users/${uid}/follows/${id}`), {})
    }
}

const followsSubscription = onSnapshot(
    collection(getFirestore(), `users/${uid}/follows`),
    snapshot => store.commit("follows", snapshot.docs.map(doc => doc.id))
)

const usersSubscription = onSnapshot(
    query(
        collection(getFirestore(), "users"),
        where("uid", "!=", uid)
    ),
    snapshot => users.value = snapshot.docs.map(doc => doc.data())
)

onBeforeUnmount(() => {
    followsSubscription()
    usersSubscription()
})
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
            <div @click="router.push(`/profile/${uid}`)" v-for="{ uid, displayName, photoURL } in users" class="p-4 flex items-center gap-4 hover:bg-gray-200 transition cursor-pointer">
                <img :src="photoURL" class="w-12 h-12 rounded-full object-cover">
                <div class="min-w-0">
                    <h3 class="font-bold truncate">{{ displayName }}</h3>
                    <p class="text-sm text-gray-500">@handle</p>
                </div>
                <button @click.stop="follow(uid)" class="border text-sm px-3 py-1 rounded-full ml-auto" :class="follows.includes(uid) ? 'border-gray-300' : 'bg-blue-400 text-white'">
                    {{ follows.includes(uid) ? "Following" : "Follow" }}
                </button>
            </div>
            <footer class="p-4 text-sm text-blue-400 hover:bg-gray-200 transition cursor-pointer">Show more</footer>
        </div>
    </div>
</template>