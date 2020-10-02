<template>
	<div id="app" class="antialiased text-gray-800 container mx-auto h-screen flex">
		<navbar></navbar>
		<div class="w-1/2 border-l border-r overflow-y-auto feed">
			<div class="flex justify-between items-center bg-white border-b p-4 sticky top-0 z-10">
				<h3 class="text-lg font-bold">Home</h3>
				<i class="far fa-star text-xl text-blue"></i>
			</div>
			<div class="border-b-8 p-4 flex items-start">
				<img src="/images/avatar2.jpg" alt="Avatar" class="w-12 rounded-full mr-4">
				<form class="flex-1" @submit.prevent="add">
					<textarea class="block w-full mb-4 focus:outline-none" placeholder="What's up doc?" v-model="tweet.content"></textarea>
					<input type="text" class="block w-full mb-4 focus:outline-none" placeholder="Image url" v-model="tweet.image">
					<div class="flex justify-between items-center">
						<div class="text-xl text-blue">
							<a href="#" class="mr-4">
								<i class="far fa-image"></i>
							</a>
							<a href="#" class="mr-4">
								<i class="fas fa-film"></i>
							</a>
							<a href="#" class="mr-4">
								<i class="far fa-chart-bar"></i>
							</a>
							<a href="#">
								<i class="far fa-smile"></i>
							</a>
						</div>
						<button class="bg-blue text-white rounded-full font-bold px-4 py-2 hover:bg-dark-blue focus:outline-none">Tweet</button>
					</div>
				</form>
			</div>
			<transition-group name="tweet" tag="div">
				<tweet v-for="tweet in tweets" :key="tweet.content" :tweet="tweet"></tweet>
			</transition-group>
		</div>
		<sidebar></sidebar>
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar"
	import Tweet from "@/components/Tweet"
	import Sidebar from "@/components/Sidebar"
	import db from "./firebase"

	export default {
		components: { Navbar, Tweet, Sidebar },
		data() {
			return {
				tweets: [],
				tweet: {
					content: "",
					image: ""
				}
			}
		},
		created() {
			db.collection("tweets").onSnapshot(snapshot => {
				this.tweets = snapshot.docs.map(doc => doc.data())
			})
		},
		methods: {
			add() {
				db.collection("tweets").add({
					name: "Ludde",
					handle: "@ludde",
					content: this.tweet.content,
					image: this.tweet.image,
					avatar: "avatar2.jpg"
				}).then(() => {
					this.tweet = {
						content: "",
						image: ""
					}
				})
			}
		}
	}
</script>

<style>
    .feed::-webkit-scrollbar {
        display: none;
    }

    .feed {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>