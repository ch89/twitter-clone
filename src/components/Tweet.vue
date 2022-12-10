<script setup>
import { getAuth } from "@firebase/auth";
import { arrayRemove, arrayUnion, deleteDoc, doc, getFirestore, updateDoc } from "@firebase/firestore";
import { deleteObject, getStorage, ref } from "@firebase/storage";
import moment from "moment"

const props = defineProps(["tweet"])
const { uid } = getAuth().currentUser

let remove = e => {
    deleteObject(ref(getStorage(), props.tweet.id))
    deleteDoc(doc(getFirestore(), `tweets/${props.tweet.id}`))
}

let like = e => {
    updateDoc(doc(getFirestore(), `tweets/${props.tweet.id}`), {
        likes: props.tweet.likes.includes(uid) ? arrayRemove(uid) : arrayUnion(uid)
    })
}
</script>

<template>
    <div class="border-b p-4 grid gap-4">
        <div class="flex items-center gap-4">
            <img :src="tweet.photoURL" class="w-12 h-12 rounded-full object-cover">
            <div>
                <h3 class="font-bold">{{ tweet.displayName }}</h3>
                <p class="text-sm text-gray-500">@handle · {{ moment(tweet.timestamp?.toDate()).fromNow() }}</p>
            </div>
            <button @click="remove" class="ml-auto text-gray-500 self-start">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>
        <p>{{ tweet.message }}</p>
        <img :src="tweet.photo" v-if="tweet.photo" class="w-full rounded-2xl">
        <div class="flex items-center justify-between text-gray-500">
            <button class="flex items-center gap-2">
                <i class="fa-regular fa-comment"></i>
                <span class="text-sm">2</span>
            </button>
            <button class="flex items-center gap-2">
                <i class="fa-solid fa-retweet"></i>
                <span class="text-sm">2</span>
            </button>
            <button @click="like" class="flex items-center gap-2" :class="{ 'text-red-400': tweet.likes.includes(uid) }">
                <i class="fa-heart" :class="tweet.likes.includes(uid) ? 'fa-solid' : 'fa-regular'"></i>
                <span class="text-sm">{{ tweet.likes.length }}</span>
            </button>
            <button>
                <i class="fa-solid fa-share-square"></i>
            </button>
        </div>
    </div>
</template>