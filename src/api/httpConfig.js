import axios from 'axios';
import qs from 'qs';

import router from '../router/index'


axios.defaults.timeout = 10000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = 'https://api.miaoche168.com/api'; //配置接口地址
//axios.defaults.withCredentials = true;   //表示跨域请求时是否需要使用凭证




export default axios;
