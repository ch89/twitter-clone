<script setup>
import { getAuth } from "@firebase/auth";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "@firebase/firestore";
import { deleteObject, getStorage, ref as storageRef } from "@firebase/storage";
import { ref, onBeforeUnmount } from "vue";
import moment from "moment"

const props = defineProps(["tweet"])
const { uid, photoURL, displayName } = getAuth().currentUser
const show = ref(false)
const comments = ref([])
const message = ref("")
const loading = ref(false)

let add = async e => {
    loading.value = true
    
    await addDoc(collection(getFirestore(), `tweets/${props.tweet.id}/comments`), {
        displayName,
        photoURL,
        message: message.value,
        timestamp: serverTimestamp()
    })

    message.value = ""
    loading.value = false
}

const unsubscribe = onSnapshot(
    query(
        collection(getFirestore(), `tweets/${props.tweet.id}/comments`),
        orderBy("timestamp")
    ),
    snapshot => comments.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
)

let remove = e => {
    deleteObject(storageRef(getStorage(), props.tweet.id))
    deleteDoc(doc(getFirestore(), `tweets/${props.tweet.id}`))
}

let like = e => {
    updateDoc(doc(getFirestore(), `tweets/${props.tweet.id}`), {
        likes: props.tweet.likes.includes(uid) ? arrayRemove(uid) : arrayUnion(uid)
    })
}

onBeforeUnmount(unsubscribe)
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
            <button @click="show = true" class="flex items-center gap-2">
                <i class="fa-regular fa-comment"></i>
                <span class="text-sm">{{ comments.length }}</span>
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
    <div v-show="show" class="bg-black/50 fixed inset-0 z-30 backdrop-blur-sm grid place-items-center">
        <div class="bg-white p-4 rounded-2xl w-[36rem]">
            <button @click="show = false" class="mb-4">
                <i class="fa-solid fa-times"></i>
            </button>
            <div v-for="comment in comments" class="flex gap-4 mb-2">
                <div class="flex flex-col items-center gap-2 shrink-0">
                    <img :src="comment.photoURL" class="avatar" @click="deleteDoc(doc(getFirestore(), `tweets/${tweet.id}/comments/${comment.id}`))">
                    <div class="w-0.5 bg-gray-300 flex-1"></div>
                </div>
                <div>
                    <h3 class="font-bold">
                        {{ comment.displayName }}
                        <span class="font-normal text-sm text-gray-500">
                            {{ moment(comment.timestamp?.toDate()).fromNow() }}
                        </span>
                    </h3>
                    <p>{{ comment.message }}</p>
                    <p class="text-sm py-2">Replying to <span class="text-blue-400">@{{ comment.displayName }}</span></p>
                </div>
            </div>
            <form @submit.prevent="add" class="flex items-center gap-4">
                <img :src="photoURL" class="avatar">
                <input v-model.trim="message" required placeholder="Tweet your reply" class="flex-1 outline-none">
                <button type="submit" :disabled="loading" :class="{ loading }" class="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-bold">Reply</button>
            </form>
        </div>
    </div>
</template>