<template>
<div class="header">
  <ul >
    <li @click="toIndex">
      <router-link to="/index">首页</router-link>
    </li>
    <li @click="toUsed">
      <router-link to="/used">优选二手车</router-link>
    </li>
    <li>
      <router-link to="/about">关于我们</router-link>
    </li>
    <li>
      <router-link to="/contact">联系我们</router-link>
    </li>
  </ul>
</div>
</template>

<script>
    export default {
      methods:{
        data(){
          return{
            initData:"",
            indexData:""
          }
        },
        toUsed(){
          this.axios.get('https://api.miaoche168.com/api/cars/list/used?include=images').then(res=>{
           this.initData=res.data
            this.$emit('header-say',this.initData)
          }).catch(err=>{
            alert("网络错误")
          })
        },
        toIndex(){
          this.axios.get('https://api.miaoche168.com/api/home/cars/used').then(res=>{
            this.indexData=res.data
            this.$emit('header-index-say',this.indexData)
          }).catch(err=>{
            alert("网络错误")
          })
        },
      }
    }
</script>

<style scoped lang="stylus">
.header
  width 100%
  height 70px
  background #3D3834
  ul
    width 750px
    margin 0 auto
    height 100%
    li
      width 187px
      height 100%
      float left
      a
        display inline-block
        width 187px
        height 100%
        line-height 70px
        color #fff;
        text-align: center
        font-size 18px;
        letter-spacing 3px;
        &.router-link-exact-active
          background #64605D
</style>
