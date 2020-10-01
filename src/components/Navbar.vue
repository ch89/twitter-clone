<template>
	<div class="w-1/4 p-4">
		<a href="#" class="text-blue text-3xl ml-4">
			<i class="fab fa-twitter"></i>
		</a>
		<div class="my-4">
			<a href="#" v-for="(link, index) in links" :key="index" class="flex items-center p-4 rounded-full hover:text-blue hover:bg-light-blue">
				<i class="fa-fw text-2xl mr-4" :class="link.icon"></i>
				<span class="text-lg font-bold" v-text="link.title">Title</span>
			</a>
		</div>
		<!-- <button class="bg-blue text-white rounded-full font-bold p-3 w-full hover:bg-dark-blue">Tweet</button> -->
		<button class="btn">Tweet</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				links: [
					{icon: 'fas fa-home', title: 'Home', id:'home'},
					{icon: 'fas fa-hashtag', title: 'Explore', id: 'explore'},
					{icon: 'far fa-bell', title: 'Notifications', id: 'notifications'},
					{icon: 'far fa-envelope', title: 'Messages', id: 'messages'},
					{icon: 'far fa-bookmark', title: 'Bookmarks', id: 'bookmarks'},
					{icon: 'fas fa-clipboard-list', title: 'Lists', id: 'lists'},
					{icon: 'far fa-user', title: 'Profile', id: 'profile'},
					{icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'}
				],
			}
		}
	}
</script>