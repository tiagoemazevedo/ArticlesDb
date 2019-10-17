import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import './config/bootstrap'
import './config/msg'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//temporary, update with each use with postman
//require('axios').default.headers.common['Authorization'] = 'bearer '

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')