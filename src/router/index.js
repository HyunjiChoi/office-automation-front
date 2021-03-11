import Vue from 'vue';
import VueRouter from 'vue-router';
import VueBodyClass from 'vue-body-class';
import store from '@/store';
import Login from "@/views/Login";
import Sales from "@/views/sales/Sales";
import SalesDetail from "@/views/sales/SalesDetail";
import Shipping from "@/views/shippings/Shipping";
import ShippingDetail from "@/views/shippings/ShippingDetail";
import Confirms from "@/views/confirms/Confirms";
import ConfirmDetail from "@/views/confirms/ConfirmDetail";
import ConfirmsAdjustment from "@/views/confirms/ConfirmsAdjustment";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/sales'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { bodyClass: 'type-signIn' },
    },
    {
        path: '/sales',
        name: 'Sales',
        component: Sales,
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/sales/detail',
        name: 'SalesDetail',
        component: SalesDetail,
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/shippings',
        name: 'Shipping',
        component: Shipping,
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/shippings/detail',
        name: 'ShippingsDetail',
        component: ShippingDetail,
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/confirms',
        name: 'Confirms',
        component: Confirms,
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/confirms/adjustment',
        name: 'ConfirmsAdjustment',
        component: ConfirmsAdjustment,
        meta: { bodyClass: 'type-contents' },
    },
    {
        path: '/confirms/detail',
        name: 'ConfirmsDetail',
        component: ConfirmDetail,
        meta: { bodyClass: 'type-contents' },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

const vueBodyClass = new VueBodyClass(routes);


router.beforeEach(async (to, from, next) => {
    if(!store.state.user.accessToken) {
        if(to.name !== 'Login') {
            await store.dispatch('deleteToken');
            next('/login');
            return;
        }
    }
    vueBodyClass.guard(to, next);
})


export default router;
