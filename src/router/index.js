import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile/:uid',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      children: [
        {
          path: "",
          name: "tweets",
          component: () => import("../views/Tweets.vue")
        },
        {
          path: "replies",
          name: "replies",
          component: () => import("../views/Replies.vue")
        },
        {
          path: "media",
          name: "media",
          component: () => import("../views/Media.vue")
        },
        {
          path: "likes",
          name: "likes",
          component: () => import("../views/Likes.vue")
        }
      ]
    }
  ]
})

export default router
