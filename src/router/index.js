import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
      {
        path: '/',
        name: 'ShoppingList',
        component: () => import( '../views/ShoppingList.vue')
      },
      {
        path: '/historic',
        name: 'Historic',
        component: () => import( '../views/Historic.vue')
      },
      {
        path: '/graphs',
        name: 'Graphs',
        component: () => import( '../views/Graphs.vue')
      },
]

const router = new VueRouter({
  routes
})

export default router
