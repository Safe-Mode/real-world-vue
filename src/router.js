import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store/store'
import EventList from './views/EventList'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: () => import('./views/EventCreate.vue')
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: () => import('./views/EventShow.vue'),
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
          routeTo.params.event = event
          next()
        })
      }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
