import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import Axios from "axios"

Vue.config.productionTip = false

Vue.prototype.$http = Axios;

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
