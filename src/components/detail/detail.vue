<template>
  <div class="detail">
    <!--放大镜-->
    <div class="big-wrapper container">
      <div class="big-left">
        <div class="zoom-wrapper" width="600" height="348">
         <!-- <img-zoom :src=baseImg+baseImgUrl width="600" height="348" :bigsrc=baseImg+maxImg :configs="configs"></img-zoom>-->
          <pic-zoom :url=baseImg+baseImgUrl :scale="3"></pic-zoom>
        </div>
        <div class="zoom-list">
          <i class="backward el-icon-arrow-left" :class="state==1?'disabled':'undisabled'" @click="rightMove"></i>
          <i class="forward el-icon-arrow-right" :class="state==0?'disabled':'undisabled'" @click="leftMove"></i>
          <!-- <a class="backward" :class="state==0?'disabled':'undisabled'" @click="rightMove"><</a>-->
          <!-- <a class="forward" :class="state==1?'disabled':'undisabled'" @click="leftMove">></a>-->
          <ul :style="'left:'+MoveLeft+'px'">
            <li v-for="(item,i) in list" :key="i" @mouseover="mouseMover(i)" @mouseout="mouseOut(i)">
              <img :src=baseImg+item alt="">
            </li>
          </ul>
        </div>n

      </div>
      <div class="big-right">
        <h1>{{leftConfig.type}}</h1>
        <div class="price">
          <span>￥{{(leftConfig.total)/10000}}万</span>
          <div class="save">
            <p class="save-money">为您节省 <b>{{(((leftConfig.newCarPrice)/10000)-((leftConfig.total)/10000)).toFixed(2)}}</b> 万</p>
            <p class="new-car">新车价：{{(leftConfig.newCarPrice)/10000}}万</p>
          </div>
        </div>
        <div class="info">
          <dl v-for="(item,index) in leftInfo" v-if="index==0||index==1||index==10">
            <dt>{{item.value}}</dt>
            <dd>{{item.name}}</dd>
          </dl>
        </div>
        <div class="buy">
          <dl>
            <dt>首付</dt>
            <dd>{{((leftConfig.firPrice)/10000)}}万</dd>
          </dl>
          <dl>
            <dt>月供</dt>
            <dd>{{leftConfig.monthly}}元</dd>
          </dl>
          <dl>
            <dt>期数</dt>
            <dd>12期</dd>
          </dl>
        </div>
        <div class="tel-wrapper">
          <span>讯车况电话：17762426950</span>
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
              <li  v-for="item in config.baseCan">
                <b>{{item.name}}</b>
                <span>{{item.value}}</span>
              </li>
            </ul>
          </div>
          <!--底盘参数-->
          <div class="di">
            <h3>底盘参数</h3>
            <ul>
              <li  v-for="item in config.planCan">
                <b>{{item.name}}</b>
                <span>{{item.value}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="can-right">
          <!--发动机参数-->
          <div class="engine">
            <h3>发动机参数</h3>
            <ul>
              <li  v-for="item in config.engineCan">
                <b>{{item.name}}</b>
                <span>{{item.value}}</span>
              </li>

            </ul>
          </div>
          <!--车轮制动-->
          <div class="zhidong">
            <h3>车轮制动</h3>
            <ul>
              <li v-for="item in config.zhiCan">
                <b>{{item.name}}</b>
                <span>{{item.value}}</span>
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
    <div class="img-content container" ref="info">
      <div class="one" v-for="item in graphic">
        <img :src=baseImg+item.imgURL  alt="">
        <div class="info-wrapper">
          <div>
            <b>{{item.title}}</b>
            <p>
              {{item.text}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--比较-->
    <div class="compare container">
      <div class="miao">
        <h4>在秒车网买车</h4>
        <div class="advantage">
          <b>首付低</b>
          <p>低至０首付</p>
          <p> 包购置税，送首年保险</p>
          <p>免验车费，装饰费等杂费 杂费</p>
        </div>
        <div class="advantage">
          <b>月供低</b>
          <p>首年抵月供，还款无压力</p>
        </div>
        <div class="advantage">
          <b>门槛低放贷快</b>
          <p>在线审核，简单快捷</p>
          <p>最快1小时审批，高通过率</p>
        </div>

      </div>
      <div class="other">
        <h4>其他贷款买车</h4>
        <div class="disadvantage">
          <b>首付高</b>
          <p>首付3成起</p>
          <p>另购购置税，保险</p>
          <p> 以及验车费，装饰费等杂费</p>
        </div>
        <div class="disadvantage">
          <b>月供高</b>
          <p>每月还款压力大，造成资金紧张。</p>
        </div>
        <div class="disadvantage">
          <b>门槛高放贷慢</b>
          <p>各种纸质证明，流程复杂</p>
          <p>  审批时间长，通过率低</p>
        </div>
      </div>
      <img src="./vs.png" alt="">
    </div>
    <!--购车流程-->
    <div class="process container">
      <h1>购车流程</h1>
      <div class="pro">
        <div class="step">
          <dl>
            <dt>
              <img src="./yuyue.png" alt="">
            </dt>
            <dd>
              <b>在线预约</b>
              <p>留下您的联系方式和看车时间，预约成功后销售会与您联系。</p>
            </dd>
          </dl>
        </div>
        <img src="./next.png" alt="" class="step-img">
        <div class="step">
          <dl>
            <dt>
              <img src="./xinyong.png" alt="">
            </dt>
            <dd>
              <b>信用评估</b>
              <p>秒车网工作人员会即时与您取得联系，并对根据您的信用来评估购车方案。</p>
            </dd>
          </dl>
        </div>
        <img src="./next.png" alt="" class="step-img">
        <div class="step">
          <dl>
            <dt>
              <img src="./xieyi.png" alt="">
            </dt>
            <dd>
              <b>签订协议</b>
              <p>秒车网工作人员会与您签订购车协议，并核实相关个人信息。</p>
            </dd>
          </dl>
        </div>
        <img src="./next.png" alt="" class="step-img">
        <div class="step">
          <dl>
            <dt>
              <img src="./tiche.png" alt="">
            </dt>
            <dd>
              <b>坐等提车</b>
              <p>秒车网会为您办理保险及上牌手续，收到提车通知后即可到指定门店提车。</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 /* import imgZoom from 'vue2.0-zoom'*/
 import PicZoom from 'vue-piczoom'
  export default {
    data() {
      return {
        list:[
        ],
        configs: {
          width:600,
          height:348,
          maskWidth:100,
          maskHeight:100,
          maskColor:'red',
          maskOpacity:0.2
        },
        state:1,
        LIWIDTH:125,//每个li的宽
        OFFSET:0,//起始left,用作修正left值
        moved:0,
        baseImg:"https://api.miaoche168.com/",
        MoveLeft:'',//向左移动
        maxImg:'',//放大后的图片链接
        baseImgUrl:'',//第一张默认图片链接
        graphic: [
          {
            imgURL: '',
            title: '',
            text: ''
          },
          {
            imgURL: '',
            title: '',
            text: ''
          },
          {
            imgURL: '',
            title: '',
            text: ''
          }
        ],
        config:{
          baseCan:"",
          engineCan:"",
          planCan:"",
          zhiCan:""
        },
        leftConfig:"",
        leftInfo:"",
        bigImg:""
      };
    },
    methods:{
      leftMove(){
        if(this.state==1){
          this.moved++
          this.MoveLeft=-this.LIWIDTH*this.moved+this.OFFSET
          let listLength=this.list.length
          if(listLength-this.moved==5){
            this.state=0
          }
        }
      },
      rightMove(){
        if(this.state == 0){
          this.moved--
          this.MoveLeft=-this.LIWIDTH*this.moved+this.OFFSET
          for(let i in this.list){
            if(this.moved==0){
              this.state=1
            }
          }
        }
      },
      mouseMover(i){
        this.maxImg=this.list[i]
        this.baseImgUrl=this.list[i]
      },
      mouseOut(i){
      },
//      详情图
      init(){
        var infos=this.$refs.info
        var ones=infos.getElementsByClassName("one")
        for(var i=0;i<ones.length;i++){
          if((i+1)%2==0){
            ones[i].style.display='block'
            var Left=ones[i].getElementsByClassName("info-wrapper")
            Left[0].classList.add('left1')
          }
        }

      },
      // 获取信息
      getDetail(){
        var id=this.$route.query.id
        // 获取文案信息
        this.axios.get('https://api.miaoche168.com/api/cars/'+id+'/graphics').then(res=>{
          this.graphic[0].title=res.data.data[0].top_title
          this.graphic[0].text= res.data.data[0].top_content
          this.graphic[1].title=res.data.data[0].mid_title
          this.graphic[1].text= res.data.data[0].mid_content
          this.graphic[2].title=res.data.data[0].sub_title
          this.graphic[2].text= res.data.data[0].sub_content
        })
        // 获取文案图片
        this.axios.get('https://api.miaoche168.com/api/cars/'+id+'/banners').then(res=>{
          this.graphic[0].imgURL=res.data.data[0].url
          this.graphic[1].imgURL=res.data.data[1].url
          this.graphic[2].imgURL=res.data.data[2].url
        })
        // 获取车辆配置
        this.axios.get('https://api.miaoche168.com/api/car/'+id+'/a/config').then(res=>{
          this.config=res.data
          this.config.baseCan=this.config.configuration[0].children
          this.config.engineCan=this.config.configuration[1].children
          this.config.planCan=this.config.configuration[2].children
          this.config.zhiCan=this.config.configuration[3].children
          this.leftConfig=res.data.car
          this.leftInfo=res.data.basicCon
        })
        // 获取车辆展示图片
          this.axios.get('https://api.miaoche168.com/api/cars/'+id+'/images?state=wx_rowImg').then(res=>{
            for(var i=0;i<res.data.data.length;i++){
              this.list.push(res.data.data[i].url)
              this.baseImgUrl=this.list[0]
            }
          })
      }
    },
    mounted(){
      this.getDetail()
      this.init()
      for(var key in this.list){
        console.log(this.list[key])
      }
      //设置默认第一张图片
      if(this.list){
        for(let i in this.list){
          if(i<=4) this.state=-1//如果图片少于6张，不允许左右切换
          else{
            this.state=1
          }
        }
      }else{
        console.log('没图片')
      }
    },
    components: {
      /*imgZoom*/
      PicZoom
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
      height 468px
      background #fff
      .big-left
        width 620px
        height 100%
        padding 10px
        box-sizing border-box
        float left
        .zoom-wrapper
          text-align: center
          height 348px
        .zoom-list
          width:100%
          height:60px
          overflow:hidden
          position:relative
          margin-top 25px
          .backward
            position:absolute
            top:15px;
            left:0;
            border-radius 50%
            width: 30px;
            height:30px;
            display:inline-block;
            line-height:30px
            border:1px solid #ddd;
            z-index:20
            text-align: center
            &:hover
              cursor: pointer;
          .forward
            position:absolute
            top:15px;
            right:0px;
            width: 30px;
            height:30px;
            line-height:30px
            border-radius 50%
            border:1px solid #ddd;
            background-color:#fff;
            z-index:20
            text-align: center
            &:hover
              cursor: pointer;
          .disabled
            background-color:#999;
            color #fff
          .undisabled
            background-color:#fff;
          ul
            float:left
            display:inline-block
            height:60px;
            overflow:hidden
            position:absolute
            li
              float:left
              margin-left 20px
              width 103px
              height 100%
              &:first-child
                margin-left:0px
              img
                height:60px;
                width:103px;
      .big-right
        width 580px
        height 100%
        float left
        padding 10px
        box-sizing border-box
        h1
          font-size 24px
          height 60px
          line-height 60px
          font-weight normal
          padding-left 67px
        .price
          width 100%
          height 96px
          background #F4F4F4
          display flex
          justify-content space-between
          padding-left 67px
          box-sizing border-box
          padding-right 67px
          span
            display inline-block
            color #FF6600
            font-size 30px
            font-weight bold
            line-height 96px
          .save
            height 50px
            margin-top 30px
            p
              height 20px
              line-height 20px
              color #333333
              font-size 16px
              letter-spacing 2px
              text-align: center
            .save-money
              font-size 18px
              line-height 10px
              b
                font-size 22px
                font-weight normal
            .new-car
              text-decoration line-through
              text-line-through-color #ff6600
        .info
          width 100%
          margin-top 20px
          box-sizing border-box
          height 59px
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
          height 79px
          background #F4F4F4
          display flex
          justify-content space-around
          margin-top 10px
          dl
            width 33.3%
            text-align: center
            font-size 18px
            color #666666
            height 25px
            line-height 25px
            margin-top 14px
            dt dd
              font-size 20px
              color #666
              font-weight normal
        .tel-wrapper
          width 100%
          height 86px
          margin-top 30px
          span
            color #ff6600
            font-size 18px
            text-align: center
            width 100%
            display inline-block
            height 70px
            border 1px solid #ff6600
            line-height 70px
    .intro-wrapper
      min-height 830px
      background #fff
      margin-top 20px
      box-sizing border-box
      padding-left 140px
      padding-right 140px
      h1
        font-size 26px
        width 100%
        text-align: center
        height 80px
        line-height 80px
        font-weight normal
        border-bottom 1px solid #EEEEEE
        color #666666
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
      margin-top 20px
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
      display table
      .one
        width 100%
        height 350px
        display: flex;
        img
          width 50%
          height 100%
        .info-wrapper
          width 50%
          padding 0 40px
          box-sizing border-box
          display flex
          height 100%
          align-items center
          div
            width 100%
            text-align: center
            b
              font-size 22px
              color #666666
              font-weight normal
              display inline-block
              width 100%
              text-align: center
              height 30px
              line-height 30px
            p
              font-size 18px
              color #6C6C6C
              padding-left 20px
              padding-right 20px
              line-height 30px
        .left1
          float left
    .compare
      position relative
      height 550px
      background #fff
      margin-top 20px
      box-sizing border-box
      .miao
        width 50%
        float left
        text-align: center
        height 100%
        h4
          width 380px
          height 50px
          color #fff
          background #FF6600
          font-size 16px
          line-height 50px
          text-align: center
          margin 0 auto
          margin-top 50px
        .advantage
          width 380px
          margin 0 auto
          margin-top 40px
          b
            color #FF6600
            font-size 18px
            padding-bottom 20px
            display inline-block
          p
            font-size 16px
            height 25px
            line-height 25px
            color #7D7477
      .other
        width 50%
        float right
        text-align: center
        background #DADADA
        height 100%
        h4
          width 380px
          height 50px
          color #fff
          background #666666
          font-size 16px
          line-height 50px
          text-align: center
          margin 0 auto
          margin-top 50px
        .disadvantage
          width 380px
          margin 0 auto
          margin-top 40px
          b
            color #666666
            font-size 18px
            padding-bottom 20px
            display inline-block
          p
            font-size 16px
            height 25px
            line-height 25px
            color #7D7477
      img
        position absolute
        top 50px
        left 575px
    .process
      height 464px
      background #fff
      box-sizing border-box
      padding 70px
      margin-top 20px
      h1
        width 100%
        text-align: center
        height 40px
        line-height 40px
        color #666666
        font-size 26px
        font-weight normal
      .pro
        display flex
        justify-content space-between
        padding-top 70px
        .step-img
          width 56px
          height 15px
          position relative
          top 31px
        .step
          width 180px
          text-align: center
          img
            width 80px
            height 80px
          b
            display inline-block
            height 70px
            line-height 70px
            font-size 16px
            font-weight normal
            color #333333
          p
            font-size 14px
            line-height 20px
            color #333333
            text-align left
</style>
