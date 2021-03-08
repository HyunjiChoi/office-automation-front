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
    },
    {
        path: '/confirms',
        name: 'Confirms',
        component: () => import('@/components/Confirms.vue'),
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/confirms/adjustment',
        name: 'ConfirmsAdjustment',
        component: () => import('@/components/ConfirmsAdjustment.vue'),
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/confirms/detail',
        name: 'ConfirmsDetail',
        component: () => import('@/components/ConfirmDetail.vue'),
        meta: { bodyClass: 'type-contents' },
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

const vueBodyClass = new VueBodyClass(routes);


router.beforeEach(async (to, from, next) => {
    vueBodyClass.guard(to, next);
})


export default router;
