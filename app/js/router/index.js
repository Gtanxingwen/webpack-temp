/**
 * Created by hasee on 2018/3/19.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../home/index.vue'
import '../../css/reset.scss'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Home,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // const uid = localStorage.getItem('uid') || ''
    // ios 9.3.2 不支持localStorage
    const uid = AGM_USER.uid
    if (uid) {
      next()
    } else {
      next({
        path: '/',
        name: 'home'
      })
    }
  } else {
    next()
  }
})
export default router
