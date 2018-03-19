/**
 * Created by hasee on 2018/3/19.
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
})
/* eslint-enable no-new */