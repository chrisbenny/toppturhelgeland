import Vue from 'vue'
import Router from 'vue-router'
import Turkart from '@/components/Turkart'
import Kart from '@/components/Kart'
import Tur from '@/components/Tur'
import Turer from '@/components/Turer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Turer
    },
    {
      path: '/turer',
      name: 'turer',
      component: Turer
    },
    {
      path: '/kart',
      name: 'kart',
      component: Kart
    },
    {
      path: '/tur/:id',
      name: 'tur',
      component: Tur,
      props: (route) => ({ id: route.params.id })
    },
    {
      path: '/tur/turkart/:id',
      name: 'turkart',
      component: Turkart,
      props: (route) => ({ id: route.params.id })
    }
  ]
})
