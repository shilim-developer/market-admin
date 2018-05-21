import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/containers/Main'
import Welcome from '@/containers/Welcome'
import Login from '@/containers/Login'
import ClassifyList from '@/containers/classify/ClassifyList'
import GoodList from '@/containers/good/GoodList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/classifyList',
          name: 'classifyList',
          component: ClassifyList
        },
        {
          path: '/goodList',
          name: 'goodList',
          component: GoodList
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})
