<template>
  <div class="index">
    <my-header   v-on:header-index-say="indexData" ></my-header>
    <!--banner图-->
    <div id="slider-3">
      <img :src="bannerImg" alt="">
    </div>
    <div class="body">
      <div class="container">
        <!--搜索框-->
        <searchBox v-on:child-say="listenTo"></searchBox>

        <!--列表部分-->
        <div class="cars-wrapper"  >
          <!--title-->
          <div class="cars-title " v-show="usedShow">
            <h3>优选二手车</h3>
          </div>
          <div class="cars-content" ref="content">
            <dl v-for="(item,index) in cars" :key="index" @click="toDetail(item.id)">
              <dt>
                <img v-lazy=baseImg+item.imgUrl alt="" class="car-img">
                <img src="./hot.png" alt="" class="hot-img">
              </dt>
              <dd>
                <p class="cars-info">{{item.brand}} {{item.type}}</p>
                <p class="pay">
                  <span>{{item.type}}</span>
                  <i>月付{{item.monthly}}</i>
                  <b>首付{{(item.firPrice)/10000}}万</b>
                </p>
              </dd>
            </dl>
          </div>
        </div>
        <!--更多-->
        <div class="more-content" v-show="usedShow"  >
          <span @click="addMore" v-if="numShow">查看更多</span>
          <span @click="addMore" v-if="!numShow">没有更多数据了</span>
        </div>
        <!--页码-->
        <div class="page-wrapper container" v-show="!usedShow">
          <el-pagination
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            background
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
            style="text-align: center;margin-top: 40px;padding-bottom: 40px">
          </el-pagination>
        </div>
      </div>
    </div>
    <div id="top">返回</div>
  </div>
</template>

<script>
  import myHeader from "../header/header"
  import searchBox from "../searchBox/searchBox"
  export default {
    data(){
      return{
        carName:this.$route.query.carName,
        bannerImg:'',
        cars:"",
        baseImg:"https://api.miaoche168.com/",
        nextUrlBase:"",
        currentPage:1,
        totalPage:'',
        nextUrl:'',
        numShow:true,
        usedShow:true,
        total:0,
        pageSize:0,
      }
    },
    components:{
      searchBox,
      myHeader
    },
    methods:{
      indexData(indexData){
        this.usedShow=true
        this.cars=indexData.data
        this.init()
      },
      init(){
        this.$nextTick(() => {
          var cars=this.$refs.content.children
          for(var i=1;i<cars.length;i++){
            if((i+1)%3==2){
              cars[i].classList.add("middle-padding");
            }
          }
          // 返回顶部
          var btn = document.getElementById('top');
          var timer = null;
          var isTop = true;
          //获取页面可视区高度
          var clientHeight = document.documentElement.clientHeight;
          //滚动条滚动时触发
          window.onscroll = function() {
            //显示回到顶部按钮
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (osTop >= clientHeight) {
              btn.style.display = "block";
            } else {
              btn.style.display = "none";
            };
            //回到顶部过程中用户滚动滚动条，停止定时器
            if (!isTop) {
              clearInterval(timer);
            };
            isTop = false;

          };
          btn.onclick = function() {
            //设置定时器
            timer = setInterval(function(){
              //获取滚动条距离顶部高度
              var osTop = document.documentElement.scrollTop || document.body.scrollTop;
              var ispeed = Math.floor(-osTop / 7);
              document.documentElement.scrollTop = document.body.scrollTop = osTop+ispeed;
              //到达顶部，清除定时器
              if (osTop == 0) {
                clearInterval(timer);
              };
              isTop = true;

            },30);
          };
        });
      },
      // 获取banner图
      getBanner(){
        this.axios.get('https://api.miaoche168.com/api/home/pc/banner').then(res=>{
          this.bannerImg='https://api.miaoche168.com/'+res.data.data[0].url
        }).catch(err=>{
          alert("网络错误")
        })
      },
      // 获取二手车列表
      getHomeList(){
        this.axios.get('https://api.miaoche168.com/api/home/cars/used').then(res=>{
          this.nextUrlBase="https://api.miaoche168.com/api/home/cars/used?page="
          this.totalPage=res.data.meta.pagination.total_pages
          this.currentPage=res.data.meta.pagination.current_page
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.cars=res.data.data
          this.init()
          this.$router.push({
            path:"/index",
            query:{
             /* page: this.currentPage,
              type:"index",*/
            }
          });
        }).catch(err=>{
          alert("网络错误")
        })
      },
      // 查看更多
      addMore(){
        this.nextUrl='https://api.miaoche168.com/api/home/cars/used?page='+(this.currentPage+1)
        if(this.currentPage<=this.totalPage){
          this.currentPage=this.currentPage+1
          this.axios.get(this.nextUrl).then(res=>{
            for(var i=0;i<res.data.data.length;i++){
              this.cars.push(res.data.data[i])
            }
            this.init()
            this.$router.push({
              path:"/index",
              query:{
               /* page: this.currentPage,
                type:"index",*/
              }
            });
          }).catch(err=>{
            alert("网络错误")
          })
        }else{
          this.numShow=false
        }
      },
      listenTo(someData){
        if(someData.searchCars.data.length===0){
          this.usedShow=true
          this.$message({
            message:"没有找到您要的车"
          })
        }else{
          this.usedShow=false
          this.cars=someData.searchCars.data
          this.nextUrlBase="https://api.miaoche168.com/api/home/screen?include=images&value="+someData.carName+"&page="
          this.totalPage=someData.searchCars.meta.pagination.total_pages
          this.total=someData.searchCars.meta.pagination.total
          this.pageSize=someData.searchCars.meta.pagination.per_page
          this.currentPage=someData.searchCars.meta.pagination.current_page
          this.init()
          this.carName=someData.carName
          this.$router.push({
            path:"/index",
            query:{
              page: '1',
              type:"搜索",
              carName:someData.carName
            }
          });
        }
      },
      handleCurrentChange(page){
        this.axios.get(this.nextUrlBase+page).then(res=>{
          this.cars=res.data.data
          this.totalPage=res.data.meta.pagination.total_pages
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.init()
          this.$router.push({
            path:"/index",
            query:{
              page:page,
              type:"搜索",
              carName:this.carName
            }
          });
        }).catch(err=>{
          /* alert("网络错误")*/
        })
      },
      // 到详情页
      toDetail(id){
        this.$router.push({
          name: "Detail",
          query: {
            id: id
          }
        })
      }
    },
    mounted(){
      this.getBanner()
      // 判断参数
      var query=this.$route.query
      var page=query.page
      if(JSON.stringify(query)=="{}"){
        this.getHomeList()
      }else if(query.type="搜索"){
        this.usedShow=false
        this.axios.get('https://api.miaoche168.com/api/home/screen?include=images&page='+page+'&value='+this.carName).then(res=>{
          this.cars=res.data.data
          this.totalPage=res.data.meta.pagination.total_pages
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page

          this.nextUrlBase='https://api.miaoche168.com/api/home/screen?include=images'+'&value='+this.carName+"&page="
          this.$router.push({
            path:"/index",
            query:{
              page: page,
              type:"搜索",
              carName:this.carName
            }
          });
         this.init()
        })
      }else if(query.type="index"){
        this.axios.get('https://api.miaoche168.com/api/home/cars/used?include=images&page='+page).then(res=>{
             this.nextUrlBase="https://api.miaoche168.com/api/home/cars/used?page="
             this.totalPage=res.data.meta.pagination.total_pages
             this.currentPage=res.data.meta.pagination.current_page
             this.total=res.data.meta.pagination.total
             this.pageSize=res.data.meta.pagination.per_page
          this.cars=res.data.data
          this.init()
          this.$router.push({
            path:"/index",
            query:{
              /*page: this.currentPage,
              type:"index",*/
            }
          });
        }).catch(err=>{
          alert("网络错误")
        })
      }
    }

  }
</script>

<style scoped>

  /*banner*/
  #slider-3{ width: 100%; height: 322px;}/*这个是demo页面定义尺寸的样式，请根据自己幻灯片的尺寸重新定义。切莫生搬硬套。*/
  #slider-3>img{
    width: 100%;
    height: 100%;
  }

  .body{
    width: 100%;
    min-height: 500px;
    background: #F1F1F1;
    padding-top: 58px;
  }

  /*搜索结果*/
  .search-result{

  }
  .result-content{
    width: 100%;
    min-height: 20px;
    overflow: hidden;
  }
  .result-content dl{
    width: 357px;
    height: 264px;
    background: #fff;
    padding: 16px;
    text-decoration: none;
    margin-top: 17px;
    float: left;
    cursor: pointer;
  }
  .result-content dt{
    width: 100%;
    height: 180px;
    border-bottom: 1px solid #DADADA;
    text-align: center;
    position: relative;
    overflow: hidden;
  }








  /*cars*/
  .cars-wrapper{
    width: 100%;
  }
  /*title*/
  .cars-title{
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    border-right: 4px solid #ff6600;
    border-left: 4px solid #ff6600;
    text-align: center;
    margin-top: 30px;
  }
  .cars-title>h3{
    font-size: 24px;
    height: 60px;
    font-weight: normal;
    line-height: 60px;
  }
  /*车辆*/
  .cars-content{
    width: 100%;
    min-height: 20px;
    overflow: hidden;
  }
  .cars-content dl{
    width: 357px;
    height: 264px;
    background: #fff;
    padding: 16px;
    text-decoration: none;
    margin-top: 17px;
    float: left;
    cursor: pointer;
  }
  .cars-content dt{
    width: 100%;
    height: 180px;
    border-bottom: 1px solid #DADADA;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .car-img{
    text-align: center;
    width: 240px;
    margin-left: 54px;
    margin-top: -20px;
  }
  .hot-img{
    position: absolute;
    top:4px;
    left:15px;
    width: 53px;
  }
  .cars-info{
    height: 57px;
    line-height: 57px;
    font-size: 16px;
    font-weight: bold;
    color:#666;
    overflow: hidden;
    text-align: left;
  }
  .pay{
    height: 20px;
    line-height: 20px;
    color:#666666;
    font-size: 14px;
    text-align: left;
  }
  .pay>span{
    display: inline-block;
    width: 156px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
    white-space: nowrap;
  }
  .pay>b{
    display: inline-block;
    float: right;
    font-size: 16px;
    color:#ff6600;
  }
  .pay>i{
    float: right;
    margin-left: 3px;
    font-size: 14px;
    color:#fff;
    text-align: center;
    background: #ff6600;
    width: 88px;
    height: 25px;
    border-radius: 15px;
    line-height: 25px;
    font-style: normal;
    position: relative;
    top:-2px;
  }
  .middle-padding{
    margin-left: 15px;
    margin-right: 15px;
  }
  .more-content{
    height: 200px;
    padding-top: 47px;
    text-align: center;
  }
  .more-content>span{
    width: 245px;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    border: 1px solid #A6A6A6;
    color:#A6A6A6;
    cursor: pointer;
  }
  /*返回顶部*/
  #top{
    position: fixed;
    bottom:20px;
    right:20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 50px;
    background: #FF6600;
    cursor: pointer;
  }


</style>
