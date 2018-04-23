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
    <!--车辆介绍-->
    <div class="intro-wrapper container">
        <h1>车辆介绍</h1>
        <div class="can-wrapper">
          <div class="can-left">
            <!--基本参数-->
            <div class="base">
              <h3>基本参数</h3>
              <ul>
                <li>
                  <b>车型</b>
                  <span>三行车</span>
                </li>
                <li>
                  <b>车辆颜色</b>
                  <span>其他</span>
                </li>
                <li>
                  <b>变速箱</b>
                  <span>手自一体变速箱</span>
                </li>
                <li>
                  <b>变速箱档位</b>
                  <span>无极当</span>
                </li>
                <li>
                  <b>车门数</b>
                  <span>四门</span>
                </li>
                <li>
                  <b>座位数</b>
                  <span>5座</span>
                </li>
                <li>
                  <b>长*款*高(mm*mm*mm)</b>
                  <span>4900*1820*1450</span>
                </li>
                <li>
                  <b>行李箱容积（L）</b>
                  <span>425</span>
                </li>
                <li>
                  <b>轮毂材料</b>
                  <span>425</span>
                </li>
                <li>
                  <b>轴距(mm)</b>
                  <span>2820</span>
                </li>
                <li>
                  <b>整备质量（kg）</b>
                  <span>1690</span>
                </li>
              </ul>
            </div>
            <!--底盘参数-->
            <div class="di">
              <h3>底盘参数</h3>
              <ul>
                <li>
                  <b>驱动方式</b>
                  <span>发顺丰</span>
                </li>
                <li>
                  <b>转向系统</b>
                  <span>发顺丰</span>
                </li>
                <li>
                  <b>前悬挂</b>
                  <span>发顺丰</span>
                </li>
                <li>
                  <b>后悬挂</b>
                  <span>发顺丰</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="can-right">
          <!--发动机参数-->
          <div class="engine">
            <h3>发动机参数</h3>
            <ul>
              <li>
                <b>百公里油耗(L)</b>
                <span></span>
              </li>
              <li>
                <b>排量(L)</b>
                <span>1.8</span>
              </li>
              <li>
                <b>油箱容积(L)</b>
                <span>400-1530</span>
              </li>
              <li>
                <b>进气形式</b>
                <span>涡轮增压</span>
              </li>
              <li>
                <b>最大扭矩(N·m)</b>
                <span>250</span>
              </li>
              <li>
                <b>燃油</b>
                <span>汽油</span>
              </li>
              <li>
                <b>燃油标号</b>
                <span>汽油</span>
              </li>
              <li>
                <b>排放标准</b>
                <span>国V</span>
              </li>
              <li>
                <b>功率(kw)</b>
                <span>118</span>
              </li>
              <li>
                <b>最高车速(km/h)</b>
                <span>110</span>
              </li>
              <li>
                <b>官方0-100km/h加速(s)</b>
                <span></span>
              </li>
            </ul>
          </div>
          <!--车轮制动-->
          <div class="zhidong">
            <h3>车轮制动</h3>
            <ul>
              <li>
                <b>前制动</b>
                <span>前置驱动</span>
              </li>
              <li>
                <b>后制动</b>
                <span>前置驱动</span>
              </li>
              <li>
                <b>前轮胎规格（mm）</b>
                <span>前置驱动</span>
              </li>
              <li>
                <b>后轮胎规格（mm）</b>
                <span>前置驱动</span>
              </li>
            </ul>
          </div>
        </div>
        </div>
    </div>
    <!--图片介绍-->
    <div class="img-wrapper container">
      <h1 class="img-title">
        图片介绍
      </h1>
    </div>
    <!--图片-->
    <div class="img-content container">
      <div class="one">
        <img src="./one-img.png" alt="">
        <div>
          <b>时尚驾驶座</b>
          <p>
            接近于自然光线的月光白氛围灯，能更好的还原内饰材质的真实质感，同时打造宁静柔和的座舱氛围。
          </p>
        </div>
      </div>
      <div class="one">
        <img src="./one-img.png" alt="">
        <div>
          <b>时尚驾驶座</b>
          <p>
            接近于自然光线的月光白氛围灯，能更好的还原内饰材质的真实质感，同时打造宁静柔和的座舱氛围。
          </p>
        </div>
      </div>
      <div class="one">
        <img src="./one-img.png" alt="">
        <div>
          <b>时尚驾驶座</b>
          <p>
            接近于自然光线的月光白氛围灯，能更好的还原内饰材质的真实质感，同时打造宁静柔和的座舱氛围。
          </p>
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
          {imgUrl:require('./car1.jpg')},
          {imgUrl:require('./car2.png')},
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
        width 50%
        height 100%
        float left
        h1
          font-size 26px
          height 95px
          line-height 95px
        .price
          width 536px
          height 97px
          background #F4F4F4
          display flex
          justify-content space-between
          padding-left 30px
          padding-right 30px
          span
            display inline-block
            color #FF6600
            font-size 30px
            font-weight bold
            line-height 97px
          .save
            height 50px
            margin-top 30px
            p
              height 20px
              line-height 20px
              text-align left
              color #333333
              font-size 16px
              letter-spacing 2px

        .info
          width 100%
          margin-top 20px
          height 40px
          padding-top 3px
          padding-bottom 3px
          display flex
          justify-content space-around
          dl
            width 22%
            height 100%
            border-right 1px solid #DADADA
            color #666666
            font-size 16px
            text-align: center
            dt
              height 23px
              line-height 23px
            dd
              height 23px
              line-height 23px
        .info dl:last-child
          border-right none
        .buy
          width 100%
          height 97px
          background #F4F4F4
          display flex
          justify-content space-around
          margin-top 20px
          dl
            width 33.3%
            text-align: center
            font-size 20px
            color #666666
            height 25px
            line-height 25px
            margin-top 23px
    .intro-wrapper
      min-height 830px
      background #fff
      margin-top 30px
      box-sizing border-box
      padding-left 140px
      padding-right 140px
      h1
        font-size 26px
        width 100%
        color #666666
        text-align: center
        height 80px
        line-height 80px
        font-weight normal
        border-bottom 1px solid #EEEEEE

      .can-wrapper
        width 100%
        box-sizing border-box
        height 100%
        .can-left
          float left
          width 46%
          .base
            margin-top 20px
          .di
            margin-top 20px
          h3
            height 40px
            line-height 40px
            width 100%
            border-bottom 1px solid #EEEEEE
            font-size 18px
            font-weight normal
          ul
            width 100%
            li
              width 100%
              height 40px
              line-height 40px
              border-bottom 1px solid #eee
              font-size 14px
              b
                font-weight normal
                float left
              span
                float right
        .can-right
          float right
          width 46%
          .engine
            margin-top 20px
          .zhidong
            margin-top 20px
          h3
            height 40px
            line-height 40px
            width 100%
            border-bottom 1px solid #EEEEEE
            font-size 18px
            font-weight normal
          ul
            width 100%
            li
              width 100%
              height 40px
              line-height 40px
              border-bottom 1px solid #eee
              font-size 14px
              b
                font-weight normal
                float left
              span
                float right
    .img-wrapper
        height 80px
        background #fff
        margin-top 30px
        h1
          text-align: center
          height 80px
          line-height 80px
          font-size 26px
          color #666666
          font-weight normal
    .img-content
      min-height 200px
      background #fff
      margin-top 15px
      .one
        width 100%
        height 350px
        img
          width 50%
          height 100%
        div
          width 50%
          height 350px
          float right
          display table-cell
          vertical-align:middle;
          text-align: center
          b
            font-size 22px
            color #666666
            font-weight normal
            display inline-block
            width 100%
            text-align: center
          p
            font-size 18px
            color #666666
            padding-left 20px
            padding-right 20px
            text-align left


</style>
