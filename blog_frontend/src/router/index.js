import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/:id',
    name: 'Content',
    component: () => import("../views/Content.vue")  // 异步的加载方式  ->  保证首页的加载速度
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import("../views/Publish.vue"),
    meta: { requireAuth: true }  // 添加该字段：表示进入该路由 需要登录
  },
  {
    path: '/login',
    name:"Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: '/signup',
    name:"SignUp",
    component: () => import("../views/SignUp.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
