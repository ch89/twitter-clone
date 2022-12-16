import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";
import './assets/main.css'

initializeApp({
    apiKey: "AIzaSyDwlTFOzsz5OZkMIU5taGsovrVbrAUarR4",
    authDomain: "twitter-clone-47d57.firebaseapp.com",
    projectId: "twitter-clone-47d57",
    storageBucket: "twitter-clone-47d57.appspot.com",
    messagingSenderId: "1032717073410",
    appId: "1:1032717073410:web:4145ca8ec2c72b96143b1b"
})

const app = createApp(App)

app.use(router).use(store)

app.mount('#app')
