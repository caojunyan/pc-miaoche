<template>
  <div class="detail">
    <!--放大镜-->
    <div class="big-wrapper container">
      <div class="big-left">
        <div class="zoom-wrapper">
          <MyMagnify :previewImg="data.min" :zoomImg="data.max"></MyMagnify>
          <div class="zoom-list">
            <i class="backward el-icon-arrow-left" :class="state==0?'disabled':'undisabled'" @click="rightMove"></i>
            <i class="forward el-icon-arrow-right" :class="state==1?'disabled':'undisabled'" @click="leftMove"></i>
           <!-- <a class="backward" :class="state==0?'disabled':'undisabled'" @click="rightMove"><</a>-->
           <!-- <a class="forward" :class="state==1?'disabled':'undisabled'" @click="leftMove">></a>-->
            <ul :style="'left:'+MoveLeft+'px'">
              <li v-for="(item,i) in list" :key="i" @mouseover="mouseMover(i)" @mouseout="mouseOut(i)">
                <img :src="item.imgUrl" alt="">
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div class="big-right">
        <h1>思域2016款 220TURBO CVT尊贵版</h1>
        <div class="price">
          <span>￥23.58万</span>
          <div class="save">
            <p>为您节省15.39万</p>
            <p>新车价：35.9万+3.07万（购置税）</p>
          </div>
        </div>
        <div class="info">
          <dl>
            <dt>2013-06</dt>
            <dd>首次上牌</dd>
          </dl>
          <dl>
            <dt>7.00万公里</dt>
            <dd>行驶里程</dd>
          </dl>
          <dl>
            <dt>武汉</dt>
            <dd>所在地</dd>
          </dl>
          <dl>
            <dt>国四</dt>
            <dd>排放标准</dd>
          </dl>
        </div>
        <div class="buy">
          <dl>
            <dt>首付</dt>
            <dd>0.89万</dd>
          </dl>
          <dl>
            <dt>月供</dt>
            <dd>2398元</dd>
          </dl>
          <dl>
            <dt>期数</dt>
            <dd>12期</dd>
          </dl>
        </div>
        <div class="tel-wrapper">
          <span>讯车况电话：17762426950</span>
        </div>
        <div class="after-wrapper">
          <span>一年后</span>
          <b>尾款购车72100元</b>
          <i>尾款也可分期2499元X36个月</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MyMagnify from "../big/big";
  export default {
    data() {
      return {
        data: {
          min:
            "https://img.alicdn.com/imgextra/i3/2857774462/TB21fgcwwNlpuFjy0FfXXX3CpXa_!!2857774462.jpg_430x430q90.jpg",
          max:
            "https://img.alicdn.com/imgextra/i3/2857774462/TB21fgcwwNlpuFjy0FfXXX3CpXa_!!2857774462.jpg"
        },
        list:[
          {imgUrl:require('./product-s1-l.jpg')},
          {imgUrl:require('./product-s4-l.jpg')},
          {imgUrl:require('./product-s3-l.jpg')},
          {imgUrl:require('./product-s4-l.jpg')},
          {imgUrl:require('./product-s1-l.jpg')},
          {imgUrl:require('./product-s4-l.jpg')},
          {imgUrl:require('./product-s3-l.jpg')},
          {imgUrl:require('./product-s3-l.jpg')},
          {imgUrl:require('./product-s4-l.jpg')},
          {imgUrl:require('./product-s1-l.jpg')},
          {imgUrl:require('./mPic.png')},

        ],
        state:0,
        LIWIDTH:90,//每个li的宽
        OFFSET:20,//起始left,用作修正left值
        moved:0,
        MoveLeft:''//向左移动
      };
    },
    methods:{
      leftMove(){
        if(this.state==0){
          this.moved++
          this.MoveLeft=-this.LIWIDTH*this.moved+this.OFFSET
            let listLength=this.list.length
            if(listLength-this.moved==6){
              this.state=1
          }
        }
      },
      rightMove(){
        if(this.state == 1){
          this.moved--
          this.MoveLeft=-this.LIWIDTH*this.moved+this.OFFSET
          for(let i in this.list){
            console.log(i)
            if(this.moved==0){
              this.state=0
            }
          }
        }
      },
      mouseMover(i){
        console.log(this.list[i].imgUrl)
        this.data.min=this.list[i].imgUrl
        this.data.max=this.list[i].imgUrl
      },
      mouseOut(i){
        this.data.min=this.list[i].imgUrl
        this.data.max=this.list[i].imgUrl
      }
    },
    mounted(){
      //设置默认第一张图片
      if(this.list){
        for(let i in this.list){
          if(i<=5) this.state=-1//如果图片少于6张，不允许左右切换
          else{
            this.state=0
          }
        }
        this.data.max=this.list[0].imgUrl
        this.data.min=this.list[0].imgUrl
      }else{
        console.log('没图片')
      }
    },
    components: {
      MyMagnify
    }
  }
</script>
<style lang="stylus">
  .detail
    width 100%
    min-height 800px
    background #F1F1F1
    padding-top 30px
    .big-wrapper
      height 600px
      background #fff
      .big-left
        width 50%
        height 100%
        float left
        .zoom-wrapper
          text-align: center
          height 450px
        .zoom-list
          width:100%
          height:67px
          overflow:hidden
          position:relative
          margin-top 25px
          .backward
            position:absolute
            top:0;
            left:0;
            width: 17px;
            height:65px;
            display:inline-block;
            line-height:65px
            border:1px solid #ddd;
            z-index:20
            &:hover
              cursor: pointer;
          .forward
            position:absolute
            top:0;
            right:20px;
            width: 17px;
            height:65px;
            line-height:65px
            border:1px solid #ddd;
            background-color:#fff;
            z-index:20
            &:hover
              cursor: pointer;
          .disabled
            background-color:#999;
          .undisabled
            background-color:#fff;
          ul
            float:left
            display:inline-block
            height:65px;
            overflow:hidden
            position:absolute
            left:17px
            li
              float:left
              margin-right 10px
              &:first-child
                margin-left:0px
              img
                height:67px;
                width:80px;
                padding 1
             /* img:hover
                border:2px solid red;*/
      .big-right
        background red
        width 50%
        height 100%
        float left
</style>
