// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import VueLazyLoad from 'vue-lazyload'
import { Pagination, Icon,Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$ELEMENT = { size: 'big' };
Vue.use( Pagination)
Vue.use( Icon)
Vue.prototype.$message = Message;
Vue.use(VueLazyLoad,{
  error:'./static/loading.png',
  loading:'./static/loading.png'
})

import axios from 'axios'
/*Vue.use(axios);*/
Vue.prototype.axios= axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
