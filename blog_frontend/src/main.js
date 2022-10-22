import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './service/api'
import moment from 'moment'

Vue.prototype.$axios = axios;  // 全局注册 ->  在其他组件中不用重复引用Axios，直接this.$axios执行axios方法
Vue.config.productionTip = false  // 阻止 vue 在启动时生成生产提示
Vue.prototype.$moment = moment
// 路由全局前置钩子 （路由改变前
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem("loginResult")) { //判断本地是否存在access_token
      next();  // 目前处于登录状态，执行下一步
    } else {
      if (to.path === '/login') {
        next();
      } else {
        next({
          path: '/login'  // 目前处于 未登录状态，跳转到 login
        })
      }
    }
  }
  else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/login") {  // 要跳转的目的路由 是 login
    if (localStorage.getItem("loginResult")) {
      next({
        path: from.fullPath  // 中断当前导航(to- login) 并跳转到 from路由
      });
    } else {
      next();
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
