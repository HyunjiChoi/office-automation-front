import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

Vue.config.productionTip = false


// Css
import "@/assets/css/common.css";
import "@/assets/css/semantic.min.css";

// Js
// import '@/assets/js/semantic.min';

Vue.config.errorHandler = (err) => {
  console.log(err)
  if (!err.message) return;
};

Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.mixin({
  methods: {
    moveMenu(path) {
      if (this.$route.path !== path) this.$router.push(path);
    }
  }
})
