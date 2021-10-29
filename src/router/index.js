import Vue from 'vue'
import VueRouter from 'vue-router'

import Orders from '../views/Orders.vue'
import Mainpage from '../views/Mainpage.vue'
import Dictionary from '../views/Dictionary.vue'
// import login from '../views/Login'
 




Vue.use(VueRouter)

const routes = [


  {
    path: '/',
    title: 'mainpage',
    component: Mainpage,
  },
  
  

  {
    path: '/orders',
    title: 'orders',
    component: Orders,
  },

 
  {
    path: '/dictionary',
    title: 'dictionary',
    component: Dictionary,
    
  }

   


]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  
})
 
export default router
