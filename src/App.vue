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
				<form class="flex-1">
					<textarea class="block w-full mb-4 focus:outline-none" placeholder="What's up doc?"></textarea>
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
			<tweet v-for="(tweet, index) in tweets" :key="index" :tweet="tweet"></tweet>
		</div>
		<div class="w-1/4">Sidebar</div>
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar"
	import Tweet from "@/components/Tweet"

	export default {
		components: { Navbar, Tweet },
		data() {
			return {
				tweets: [
        {src: 'avatar1.jpg', name: 'Elon Musk', handle: '@teslaBoy', time: '20 min', tweet: 'Should I just quarantine on mars??', comments: '1,000', retweets: '550', like: '1,000,003'},
        {src: 'avatar2.jpg', name: 'Kevin Hart', handle: '@miniRock', time: '55 min', tweet: 'Should me and the rock do another sub-par movie together????', comments: '2,030', retweets: '50', like: '20,003'},
        {src: 'avatar3.jpg', name: 'Elon Musk', handle: '@teslaBoy', time: '1.4 hr', tweet: 'Haha just made a flame thrower. Shld I sell them?', comments: '100,000', retweets: '1,000,002', like: '5,000,003'},
        {src: 'avatar4.jpg', name: 'Elon Musk', handle: '@teslaBoy', time: '1.4 hr', tweet: 'Just did something crazyyyyyyy', comments: '100,500', retweets: '1,000,032', like: '5,000,103'}
      ]
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