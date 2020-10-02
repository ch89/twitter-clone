<template>
	<div class="flex items-start border-b p-4 hover:bg-gray-100 tweet">
		<img :src="`/images/${tweet.avatar}`" alt="Avatar" class="w-12 rounded-full mr-4">
		<div class="flex-1">
			<div class="flex items-center">
				<span class="font-bold mr-2" v-text="tweet.name"></span>
				<i class="fas fa-check-circle text-blue mr-2"></i>
				<span class="text-sm text-dark mr-2" v-text="tweet.handle"></span>
				<!-- <span class="text-sm text-dark" v-text="tweet.time"></span> -->
				<span class="text-sm text-dark">20 min</span>
				<i class="fas fa-angle-down text-dark ml-auto"></i>
			</div>
			<p class="my-2" v-text="tweet.content"></p>
			<img :src="tweet.image" alt="Image" v-if="tweet.image" class="w-full rounded-xl mb-4">
			<div class="flex justify-between items-center text-dark text-sm">
				<a href="#">
					<i class="far fa-comment mr-2"></i>
					<span>3</span>
				</a>
				<a href="#">
					<i class="fas fa-retweet mr-2"></i>
					<span>7</span>
				</a>
				<a href="#">
					<i class="far fa-heart mr-2"></i>
					<span>12</span>
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

<style scoped>
	.tweet {
		transition: 1s;
	}

	.tweet-enter, .tweet-leave-to {
		opacity: 0;
		transform: scale(1.1);
	}

	.tweet-leave-active {
		position: absolute;
	}
</style>