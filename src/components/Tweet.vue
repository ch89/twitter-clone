<template>
	<div class="flex items-start border-b p-4 hover:bg-gray-100">
		<img :src="`/images/${tweet.src}`" alt="Avatar" class="w-12 rounded-full mr-4">
		<div class="flex-1">
			<div class="flex items-center">
				<span class="font-bold mr-2" v-text="tweet.name"></span>
				<span class="text-sm text-dark mr-2" v-text="tweet.handle"></span>
				<span class="text-sm text-dark" v-text="tweet.time"></span>
				<i class="fas fa-angle-down text-dark ml-auto"></i>
			</div>
			<p class="my-2" v-text="tweet.tweet"></p>
			<div class="flex justify-between items-center text-dark text-sm">
				<a href="#">
					<i class="far fa-comment mr-2"></i>
					<span v-text="tweet.comments"></span>
				</a>
				<a href="#">
					<i class="fas fa-retweet mr-2"></i>
					<span v-text="tweet.retweets"></span>
				</a>
				<a href="#">
					<i class="far fa-heart mr-2"></i>
					<span v-text="tweet.like"></span>
				</a>
				<a href="#">
					<i class="fas fa-share-square"></i>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["tweet"]
	}
</script>