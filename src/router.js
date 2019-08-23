import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Index from './components/Index.vue'
import Users from './components/users/Users.vue'
import Roles from './components/rights/Roles.vue'
import Rights from './components/rights/Rights.vue'
import Goods from './components/produces/Goods.vue'
import GoodsAdd from './components/produces/GoodsAdd.vue'
import Categories from './components/produces/Categories.vue'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/index',
      name: 'index',
      component: Index,
      children: [{ path: '/users', name: 'users', component: Users },
        { path: '/roles', name: 'roles', component: Roles },
        { path: '/rights', name: 'rights', component: Rights },
        { path: '/goods', name: 'goods', component: Goods },
        { path: '/goods-add', name: 'goodsAdd', component: GoodsAdd },
        { path: '/categories', name: 'categories', component: Categories }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // console.log(to)
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router
