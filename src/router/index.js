import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/index'
import Used from '../components/used/used'
import About from '../components/about/about'
import Contact from '../components/contact/contact'
import Detail from '../components/detail/detail'
Vue.use(Router)
export default new Router({
  routes: [
    { path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta:{
        title:"首页"
      }
    },
    {
      path: '/used',
      name: 'Used',
      component: Used,
      meta:{
        title:"优选二手车"
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta:{
        title:"关于我们"
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta:{
        title:"联系我们"
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta:{
        title:"详情"
      }
    },
  ],
  scrollBehavior (to, from, savedPosition) {
   /* return { x: 0, y: 0 }*/
  }
})
