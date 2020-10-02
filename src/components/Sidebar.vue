<template>
	<div class="w-1/4 p-4">
		<div class="flex items-center bg-gray-200 rounded-full px-4 py-3 mb-4">
			<i class="fas fa-search text-dark mr-2"></i>
			<input type="text" placeholder="Search Twitter" class="flex-1 bg-transparent focus:outline-none">
		</div>
		<div class="bg-gray-100 rounded-xl overflow-hidden mb-4">
			<div class="flex justify-between items-center px-4 py-3">
				<h3 class="text-lg font-bold">Trends for you</h3>
				<i class="fas fa-cog text-lg text-blue"></i>
			</div>
			<a href="#" v-for="(trend, index) in trending" :key="index" class="flex justify-between border-t px-4 py-3 hover:bg-gray-200">
				<div>
					<span class="block text-sm text-dark" v-text="trend.top"></span>
					<span class="block text-sm font-bold" v-text="trend.title"></span>
					<span class="block text-sm text-dark" v-text="trend.bottom"></span>
				</div>
			</a>
		</div>
		<div class="bg-gray-100 rounded-xl overflow-hidden">
			<h3 class="text-lg font-bold px-4 py-3">Who to Follow</h3>
			<a href="#" v-for="(friend, index) in friends" :key="index" class="flex items-center border-t px-4 py-3 hover:bg-gray-200">
				<img :src="`/images/${friend.src}`" alt="Avatar" class="w-12 rounded-full mr-4">
				<div>
					<div class="flex items-center">
						<span class="block text-sm font-bold mr-2" v-text="friend.name"></span>
						<i class="fas fa-check-circle text-blue"></i>
					</div>
					<span class="block text-sm text-dark" v-text="friend.handle"></span>
				</div>
				<button class="text-blue text-sm font-bold rounded-full border border-blue px-4 py-1 ml-auto">Follow</button>
			</a>
			<a href="#" class="block px-4 py-3 text-blue border-t hover:bg-gray-200">Show More</a>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				trending: [
        {top: 'Trending in TX', title: 'Gigi', bottom: 'Trending with: Rip Gigi'},
        {top: 'Music', title: 'We Won', bottom: '135K Tweets'},
        {top: 'Pop', title: 'Blue Ivy', bottom: '40k tweets'},
        {top: 'Trending in US', title: 'Denim Day', bottom: '40k tweets'}
      ],
      friends: [
        {src: 'avatar1.jpg', name: 'Elon Musk', handle: '@teslaBoy'},
        {src: 'avatar3.jpg', name: 'Adrian Monk', handle: '@detective:)'},
        {src: 'avatar4.jpg', name: 'Kevin Hart', handle: '@miniRock'}
      ],
			}
		}
	}
</script>