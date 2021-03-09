import Vue from 'vue';
import VueRouter from 'vue-router';
import VueBodyClass from 'vue-body-class';
// import store from '@/store';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: { bodyClass: 'type-signIn' },
    },
    {
        path: '/confirms',
        name: 'Confirms',
        component: () => import('@/views/confirms/Confirms.vue'),
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/confirms/adjustment',
        name: 'ConfirmsAdjustment',
        component: () => import('@/views/confirms/ConfirmsAdjustment.vue'),
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/confirms/detail',
        name: 'ConfirmsDetail',
        component: () => import('@/views/confirms/ConfirmDetail.vue'),
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/sales',
        name: 'Sales',
        component: () => import('@/views/sales/Sales.vue'),
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/sales/detail',
        name: 'SalesDetail',
        component: () => import('@/views/sales/SalesDetail.vue'),
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/shippings',
        name: 'Shipping',
        component: () => import('@/views/shippings/Shipping.vue'),
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/shippings/detail',
        name: 'ShippingDetail',
        component: () => import('@/views/shippings/ShippingDetail.vue'),
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
