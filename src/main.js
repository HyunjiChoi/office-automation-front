import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false


// Css
import "@/assets/css/common.css";
import "@/assets/css/semantic.min.css";

// Js
// import '@/assets/js/semantic.min';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
