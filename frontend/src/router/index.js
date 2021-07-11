import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home.vue'
import about from '../pages/about.vue'
import toys from '../pages/toy-app.vue'
import dashboard from '../pages/dashboard.vue'
import toyDetails from '../pages/toy-details.vue'
import userDetails from '../pages/user-details.vue'
import reviews from '../pages/reviews-all.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/about',
        name: 'about',
        component: about
    },
    {
        path: '/toy',
        name: 'toy',
        component: toys
    },
    {
        path: '/toy/:toyId',
        name: 'toyDetails',
        component: toyDetails
   },
   {
      path: '/user/:userId',
      name: 'userDetails',
      component: userDetails
  },
   {
      path: '/reviews',
      name: 'reviews',
      component: reviews
  },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
    },
]

const router = new VueRouter({
    routes
})

export default router