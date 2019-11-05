import Vue from 'vue'
import App from './App.vue'
import './lib/RongIMLib-2.5.1'
import './lib/RongIMemoji'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
