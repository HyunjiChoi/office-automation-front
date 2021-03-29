import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import indicator from './modules/indicator'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        indicator
    },
});

export default store;
