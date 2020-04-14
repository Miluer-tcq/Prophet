import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/404.vue'
import Home from './views/Home'

Vue.use(Router);

let routes = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Home,
            name: '',
            iconCls: 'el-icon-orange',//图标样式class
            leaf: true,//只有一个节点
            redirect: {path: '/Hello'},
            children: [
                {path: '/AllEvent', component: () => import('@/views/AllEvent'), name: '概览'},
                {path: '/EventInfo/:id', component: () => import('@/views/EventInfo'), name: '详情信息'},
                {path: '/UserInfo', component: () => import('@/views/UserInfo'), name: '个人信息'},
                {path: '/Hello', component: () => import('@/views/Hello'), name: '欢迎界面'}
            ]
        },
        {
            path: '/',
            component: Home,
            name: '菜单',
            children: [
                {path: '/Oneself', iconCls: 'el-icon-orange', component: () => import('@/views/Oneself'), name: '我的事件'},
                {
                    path: '/Initiate',
                    iconCls: 'el-icon-orange',
                    component: () => import('@/views/Initiate'),
                    name: '创建事件'
                },
            ]
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            hidden: true
        },
        {
            path: '*',
            hidden: true,
            redirect: {path: '/404'}
        }
    ]
});

export default routes;
