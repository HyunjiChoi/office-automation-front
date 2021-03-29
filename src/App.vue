<template>
  <div class="custom-wrapper">
    <Left  v-if="$route.path !== '/login'" />
    <router-view></router-view>
    <div id="indicatorContainer" v-if="showLoader">
      <svg id="indicator" viewBox="0 0 100 100">
        <circle id="circle" cx="50" cy="50" r="45"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Left from '@/components/Left'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'App',
  components: {
    Left,
  },
  created() {
    this.$EventBus.$on('sessionExpired', () => {
      this.$store.dispatch('deleteToken');
      this.$router.push('/login');
    });
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(['showLoader'])
  }
});
</script>

<style>
#indicatorContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}
#indicator {
  width: 100px;
  height: 100px;
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  animation: spin 1s linear infinite;
}

#circle {
  fill: none;
  stroke: rgba(255,255,255,0.5);
  stroke-linecap: round;
  stroke-width: 4;
  animation: draw 3s ease-in-out infinite;
}

@keyframes draw {
  0% { stroke-dasharray: 20, 282.6;}
  50% { stroke-dasharray: 200, 282.6; }
  100% { stroke-dasharray: 20, 282.6; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
