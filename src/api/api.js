import axios from './httpConfig';
import qs from 'qs';

// 获取banner图
export const getBanner=()=>{
  return  axios.get('/home/pc/banner').then(res=>{
    return res.data.data[0].url
  }).catch(err=>{
    alert("网络错误")
  })
}

// 获取首页二手车列表
export const getHomeList=()=>{

}
