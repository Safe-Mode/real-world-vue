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
      component: EventList,
      props: true
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
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({
                name: '404',
                params: { resource: 'event' }
              })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/NotFound.vue'),
      props: true
    },
    {
      path: './network-issue',
      name: 'network-issue',
      component: () => import('./views/NetworkIssue.vue')
    },
    {
      path: '*',
      redirect: {
        name: '404',
        params: { resource: 'page' }
      }
    },
    {
      path: '/example',
      component: () => import('./views/Example.vue')
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
