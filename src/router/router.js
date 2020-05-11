import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import(/* webpackChunkName: "about" */ '@/views/index.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import(/* webpackChunkName: "about" */ '@/views/layout/layout.vue'),
            children:[
                {
                    path: '/',
                    name: 'admin',
                    component: () => import(/* webpackChunkName: "about" */ '@/views/admin/admin.vue')
                },
                {
                    path: 'product',
                    name: 'product',
                    component: () => import(/* webpackChunkName: "about" */ '@/views/product/product.vue')
                },
                {
                    path: 'productStyle',
                    name: 'productStyle',
                    component: () => import(/* webpackChunkName: "about" */ '@/views/product/productStyle.vue')
                },
                {
                    path: 'banner',
                    name: 'addBaner',
                    component: () => import(/* webpackChunkName: "about" */ '@/views/banner/addBaner.vue')
                },
                {
                    path: 'details',
                    name: 'details',
                    component: () => import(/* webpackChunkName: "about" */ '@/views/details/details.vue')
                },

            ]
        },
        {
            path: '*',
            name: 'index',
            component: () => import(/* webpackChunkName: "about" */ '@/views/notFoud/notFount.vue')
        },
    ]
})
