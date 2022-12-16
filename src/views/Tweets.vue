<script setup>
import Tweet from "../components/Tweet.vue"
import { getAuth } from '@firebase/auth';
import { collection, getDocs, getFirestore, orderBy, query, where } from '@firebase/firestore';
import { ref } from "vue";

const tweets = ref([])

getDocs(
    query(
        collection(getFirestore(), "tweets"),
        where("uid", "==", getAuth().currentUser.uid),
        orderBy("timestamp", "desc")
    )
).then(snapshot => tweets.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
})))
</script>

<template>
    <tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"></tweet>
</template>