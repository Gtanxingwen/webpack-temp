/**
 * Created by hasee on 2018/3/19.
 */
import Vue from "vue"
import Router from "vue-router"
import Home from "../home/index.vue"
import "../../css/reset.scss"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    }
  ],
})
