<template>
  <div class="custom-wrapper">
    <Left  v-if="$route.path !== '/'" />
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Left from '@/components/Left'

export default Vue.extend({
  name: 'App',
  components: {
    Left,
  },
  data: () => ({
    //
  }),
});
</script>
