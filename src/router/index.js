import Vue from 'vue';
import VueRouter from 'vue-router';
import VueBodyClass from 'vue-body-class';
// import store from '@/store';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('@/components/Login.vue'),
        meta: { bodyClass: 'type-signIn' },
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

const vueBodyClass = new VueBodyClass(router);


router.beforeEach(async (to, from, next) => {
    vueBodyClass.guard(to, next);
})


export default router;
