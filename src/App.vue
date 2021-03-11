<template>
  <div class="custom-wrapper">
    <Left  v-if="$route.path !== '/login'" />
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
  created() {
    this.$EventBus.$on('sessionExpired', () => {
      this.$store.dispatch('deleteToken');
      this.$router.push('/login');
    });
  },
  data: () => ({
    //
  }),
});
</script>
