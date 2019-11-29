import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './../views/login'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './../views/home')
    }

  ]
})
