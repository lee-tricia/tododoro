import Vue from 'vue'
import App from './App.vue'

import vueInsomnia from "vue-insomnia";
Vue.use(vueInsomnia);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
