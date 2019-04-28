import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue2-animate/dist/vue2-animate.min.css'

Vue.config.productionTip = false

// import css
import './assets/css/custom.scss';

new Vue({
  render: h => h(App),
}).$mount('#app')
