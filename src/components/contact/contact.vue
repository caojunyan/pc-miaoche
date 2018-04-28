<template>
  <div class="about">
    <my-header ></my-header>
    <div class="title container">联系我们</div>
    <div class="address container">
      <div class="map" id="dituContent">
        <img src="./contact.png" alt="">
      </div>
      <div class="us">
          <div class="name">
            <img src="./name.png" alt="">
            <label for="">姓名：</label>
            <input type="text" placeholder="">
          </div>
        <div class="name">
          <img src="./tel.png" alt="">
          <label for="">手机号码：</label>
          <input type="text" placeholder="">
        </div>
        <div class="name">
          <img src="./email.png" alt="">
          <label for="">邮箱：</label>
          <input type="text" placeholder="">
        </div>
        <div class="name">
          <img src="./liuyan.png" alt="">
          <label for="">留言：</label>
          <input type="text" placeholder="">
        </div>
        <div class="submit">
          <span>提交</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from "../header/header"
  export default {
    methods:{

    },
    mounted(){

    },
    components:{
      myHeader
    }
  }
</script>

<style scoped lang="stylus">
  .about
    width 100%
    height 610px
    background #F1F1F1
    .title
      height 52px
      background #3D3834
      color:#fff
      font-size 16px
      line-height 52px
      padding-left 10px
      margin-top 50px
    .address
      background #fff
      margin-top 10px
      padding 20px 10px
      height 400px
      .map
        width 50%
        height 400px
        float left
        img
          margin-top 50px
      .us
        margin-top 83px
        float left
        width 358px
        height 260px
        margin-left 80px
        div
          width 100%
          margin-top 20px
          height 32px
          border 1px solid #DADADA
          line-height 32px
          padding-left 8px
          img
            vertical-align sub
          input
            border none
            outline none
            font-size 14px
            height 24px
          label
            font-size 16px
            color #999999
            margin-left 8px

          &.submit
            cursor pointer
            width 100%
            background #3D3834
            color #fff
            font-size 14px
            line-height 32px
            text-align: center
</style>
