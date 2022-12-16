<script setup>
import Tweet from "../components/Tweet.vue"
import { onBeforeUnmount, ref } from "vue"
import { collection, getFirestore, onSnapshot, query, where } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const tweets = ref([])

const unsubscribe = onSnapshot(
    query(
        collection(getFirestore(), "tweets"),
        where("likes", "array-contains", getAuth().currentUser.uid)
    ),
    snapshot => tweets.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
)

onBeforeUnmount(unsubscribe)
</script>

<template>
    <tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"></tweet>
</template>