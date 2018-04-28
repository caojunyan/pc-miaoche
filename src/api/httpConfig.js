import axios from 'axios';
import qs from 'qs';

import router from '../router/index'


axios.defaults.timeout = 10000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = 'https://api.miaoche168.com/api'; //配置接口地址
//axios.defaults.withCredentials = true;   //表示跨域请求时是否需要使用凭证

//POST传参序列化
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if (config.method === 'post' && config.url != "https://api.miaoche168.com/api/ocr") {
    config.data = qs.stringify(config.data);
  }
  if (localStorage.getItem('user_token')) {
    config.headers.Authorization = `Bearer ` + localStorage.getItem('user_token');
  }
  return config;
}, (error) => {
  //alert("错误的传参");
  return Promise.reject(error);
});

//抓取错误
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          Message.error({
            message: '验证过期，请重新登录'
          });
          localStorage.clear();
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 403:
          Message.error({
            message: '暂无该权限，若有误请联系人事修改权限'
          });
          break;
        case 404:
          Message.error({
            message: '请求不存在，请联系管理员'
          });
          break;
        case 500:
          Message.error('链接服务器失败，请重新尝试');
          break;
        case 422:
          Message.erroro('添加失败')
          break;
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });

export default axios;
