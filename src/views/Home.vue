<script setup>
import Tweet from "../components/Tweet.vue"
import { onBeforeUnmount, ref, watchEffect } from "vue";
import { getFirestore, collection, serverTimestamp, onSnapshot, query, orderBy, doc, setDoc, where } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { ref as storageRef, getStorage, uploadString, getDownloadURL } from "firebase/storage";
import { useStore } from "vuex";

const { uid, displayName, photoURL } = getAuth().currentUser
const tweets = ref([])
const message = ref("")
const loading = ref(false)
const photo = ref(null)
const store = useStore()

let reader = new FileReader
reader.addEventListener("load", e => photo.value = reader.result)
let preview = e => reader.readAsDataURL(e.target.files[0])

let add = async e => {
  loading.value = true

  const docRef = doc(collection(getFirestore(), "tweets"))

  let data = {
    uid,
    displayName,
    photoURL,
    message: message.value,
    likes: [],
    timestamp: serverTimestamp()
  }

  if(photo.value) {
    const photoRef = storageRef(getStorage(), docRef.id)
    await uploadString(photoRef, photo.value, "data_url")
    data.photo = await getDownloadURL(photoRef)
  }

  await setDoc(docRef, data)

  message.value = ""
  photo.value = null
  loading.value = false
}

let unsubscribe

watchEffect(() => {
  if(unsubscribe) unsubscribe()
  
  unsubscribe = onSnapshot(
    query(
      collection(getFirestore(), "tweets"),
      where("uid", "in", [uid, ...store.state.follows]),
      orderBy("timestamp", "desc")
    ),
    snapshot => tweets.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  )
})

onBeforeUnmount(() => unsubscribe())
</script>

<template>
  <div class="overflow-auto scrollbar-hide">
    <header class="border-b p-4 flex items-center justify-between sticky top-0 z-10 bg-white/50 backdrop-blur">
      <h3 class="font-bold">Home</h3>
      <i class="fa-regular fa-star"></i>
    </header>
    <form @submit.prevent="add" class="border-b p-4 grid grid-cols-[auto_1fr] gap-4">
      <img :src="photoURL" class="w-12 h-12 rounded-full object-cover">
      <input required v-model.trim="message" placeholder="What's happening?" class="outline-none">
      <img :src="photo" v-if="photo" @click="photo = null" class="col-start-2 rounded-xl w-36 cursor-pointer">
      <div class="col-start-2 flex items-center gap-4 text-blue-400">
        <label class="cursor-pointer">
          <i class="fa-regular fa-image"></i>
          <input type="file" hidden @change="preview">
        </label>
        <button type="button">
          <i class="fa-solid fa-film"></i>
        </button>
        <button type="button">
          <i class="fa-regular fa-chart-bar"></i>
        </button>
        <button type="button">
          <i class="fa-regular fa-smile"></i>
        </button>
        <button type="button">
          <i class="fa-regular fa-calendar-alt"></i>
        </button>
        <button type="button">
          <i class="fa-solid fa-location-dot"></i>
        </button>
        <button type="submit" :disabled="loading" class="bg-blue-400 text-white px-4 py-2 rounded-full font-bold text-sm ml-auto" :class="{ loading }">Tweet</button>
      </div>
    </form>
    <tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"></tweet>
  </div>
</template>