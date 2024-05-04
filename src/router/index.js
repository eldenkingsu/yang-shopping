import Vue from 'vue'
import VueRouter from 'vue-router'

import Pay from '@/views/pay/index.vue'
import Login from '@/views/login'
import MyOrder from '@/views/myorder'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'
import ProDetail from '@/views/prodetail'
import store from '@/store'

const Layout = () => import('@/views/layout')
const User = () => import('@/views/layout/user.vue')
const Cart = () => import('@/views/layout/cart.vue')
const Home = () => import('@/views/layout/home.vue')
const CateGory = () => import('@/views/layout/category.vue')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 独立单独展示为一级路由
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      // 配置二级路由
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: CateGory },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/pay', component: Pay },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参需要知道是那个商品
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/myorder', component: MyOrder }
  ]
})
// 全局前置导航首位
// to:到那里去，完整路由信息（路径，参数）
// from：从哪来，
// next（）直接放行到to路径 否则拦截到next里面配置的路径

// 定义数组，专门用户需要权限才能访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 判断是否为权限页面，若是权限页面弹出提示框请先登录，负责放行
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  // 是权限页面，判断用户是否存在登录taken
  const token = store.getters.token
  if (token) {
    next()
  } else {
    // console.log(token)
    setInterval(() => { next('/login') }, 1000)
  }
})

export default router
