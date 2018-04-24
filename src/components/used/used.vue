<template>
    <div class="used">
      <div class="search">
        <searchBox v-on:child-say="listenTo"></searchBox>
      </div>
      <div class="search-result container" v-if="!usedShow">
        <div class="result-content" ref="result">
          <dl v-for="(item,index) in searchResult" :key="index" @click="toDetail(item.id)">
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
        <div class="page-wrapper container">
          <el-pagination
            @current-change="searchhandleCurrentChange"
            :current-page="searchcurrentPage"
            background
            :page-size="searchpageSize"
            layout="prev, pager, next"
            :total="searchtotal"
            style="text-align: center;margin-top: 40px;padding-bottom: 40px">
          </el-pagination>
        </div>
      </div>
      <!--车-->
      <div class="wrapper-container " v-if="usedShow">
        <div class="sorting-box container">
          <ul>
            <li class="comprehensive">默认排序</li>
            <li class="carType" >
              <select name="" id="sel1" >
                <option value="" disabled selected>车型</option>
                <option value="新车" >新车</option>
                <option value="二手车" >二手车</option>
              </select>
            </li>
            <li class="brandType" >
              <select name="" id="sel2" @click="selectFocus()">
                <option value="" disabled selected @click="selectClick()">品牌</option>
                <option value="新车" @click="selectClick()">日产</option>
                <option value="二手车" @click="selectClick()">福特</option>
                <option value="二手车" @click="selectClick()">福特</option>
                <option value="二手车" @click="selectClick()">福特</option>
                <option value="二手车" @click="selectClick()">福特</option>
                <option value="二手车" @click="selectClick()">福特</option>
                <option value="二手车" @click="selectClick()">福特</option>
                <option value="二手车" @click="selectClick()">福特</option>

              </select>
            </li>
            <li class="priceType" >
              <select name="" id="sel3">
                <option value="" disabled selected >价格</option>
                <option value="新车" >10万以下</option>
                <option value="二手车" >10-20万</option>
                <option value="二手车" >20-30万</option>
                <option value="二手车" >30-40万</option>
                <option value="二手车" >30-40万</option>
                <option value="二手车" >30-40万</option>
              </select>
            </li>
          </ul>
        </div>
        <div class="container">
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
        <div class="page-wrapper container">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            background
            :page-size="pageSize"
            layout="prev, pager, next"
            :total=" total"
            style="text-align: center;margin-top: 40px;padding-bottom: 40px">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import searchBox from "../searchBox/searchBox"
export default {
  name: "used",
  data(){
    return{
      cars:"",
      baseImg:"https://api.miaoche168.com/",
      nextUrlBase:"",
      currentPage:1,
      totalPage:'',
      nextUrl:'',
      total:0,
      pageSize:0,
      usedShow:true,

      searchResult:"",
      searchnextUrlBase:"",
      searchcurrentPage:1,
      searchtotalPage:'',
      searchnextUrl:'',
      searchtotal:0,
      searchpageSize:0,
    }
  },
  components:{
    searchBox
  },
  methods:{
   init(){
     this.$nextTick(() => {
       var cars=this.$refs.content.children
       for(var i=1;i<cars.length;i++){
         if((i+1)%3==2){
           cars[i].classList.add("middle-padding");
         }
       }

     });
   },
   getHomeList(){
      this.axios.get('https://api.miaoche168.com/api/cars/list/used').then(res=>{
        this.nextUrlBase="https://api.miaoche168.com/api/cars/list/used?page="
        this.totalPage=res.data.meta.pagination.total_pages
        this.cars=res.data.data
        this.total=res.data.meta.pagination.total
        this.pageSize=res.data.meta.pagination.per_page
        this.init()
      }).catch(err=>{
        alert("网络错误")
      })
    },
    // pageSize 改变时会触发	每页条数size
   handleSizeChange (e){
    console.log(e)
    },
    // currentPage 改变时会触发	当前页currentPage
   handleCurrentChange(pageNum){
     this.cars=""
     this.axios.get(this.nextUrlBase+pageNum).then(res=>{
         this.cars=res.data.data
          this.init()
     }).catch(err=>{
       console.log(err)
      /* alert("网络错误")*/
     })
    },
    toDetail(id){

      this.$router.push({
        name: "Detail",
        query: {
          id: id
        }
      })
    },

    listenTo(someData){
      if(someData.data.length===0){
        this.usedShow=true
        this.$message({
          message:"没有找到您要的车"
        })
      }else{
        this.usedShow=false
        this.searchResult=someData.data
        this.searchnextUrlBase="https://api.miaoche168.com/api/home/screen?page="
        this.searchtotalPage=someData.meta.pagination.total_pages
        this.searchtotal=someData.meta.pagination.total
        this.searchpageSize=someData.meta.pagination.per_page
        this.$nextTick(() => {
          var cars = this.$refs.result.children
          for (var i = 1; i < cars.length; i++) {
            if ((i + 1) % 3 == 2) {
              cars[i].classList.add("middle-padding");
            }
          }
        })
      }
    },
    searchhandleCurrentChange(page){
     console.log(4)
      var carName=localStorage.getItem('carName')
      console.log(this.searchnextUrlBase+page+'&value='+carName)
      this.axios.get(this.searchnextUrlBase+page+'&value='+carName).then(res=>{
        this.searchResult=""
        this.searchResult=res.data.data
        this.$nextTick(() => {
          var cars = this.$refs.result.children
          for (var i = 1; i < cars.length; i++) {
            if ((i + 1) % 3 == 2) {
              cars[i].classList.add("middle-padding");
            }
          }
        })
      }).catch(err=>{
        console.log(err)
        /* alert("网络错误")*/
      })
    },


    selectFocus(){
        document.getElementById("sel2").setAttribute("size","5");
      },
   selectClick(){
      document.getElementById("sel2").removeAttribute("size");
      document.getElementById("sel2").blur();
      this.setAttribute("selected","");
  }
},
  mounted(){
    // 获取二手车列表
    this.getHomeList()
  }

}
</script>

<style scoped>
  .used{
    padding-top: 44px;
    background: #F1F1F1;
  }
  .sorting-box{
    height: 40px;
    background: #3D3834;
    margin-top: 20px;
  }
  .sorting-box ul{
    width: 100%;
    padding-left: 10px;
    height: 100%;
  }
  .sorting-box ul li{
    float: left;
    width: 140px;
    padding-left: 5px;
    padding-right: 5px;
    height: 40px;
    line-height: 40px;
    color:#fff;
    margin-left: 20px;
    position: relative;
    cursor: pointer;
  }
  .sorting-box ul li.comprehensive{
    width: 60px;
  }
  .sorting-box ul li select{
    width: 130px;
    height: 30px;
    outline: none;
    position: absolute;
    z-index: 1;
    margin-left: 40px;
    padding-left: 10px;
    top:5px;

  }
  .sorting-box ul li select option{
    outline: none;
    width: 100%;
    height: 30px;
  }




  .search-price>input{
    width: 70px;
    height: 25px;
    outline: none;
    border: none;
    padding-left: 5px;
  }
  .sorting-box ul li.sorting-page{
    float: right;
    padding-right: 40px;
    position: relative;
  }



  .cars-content{
    width: 100%;
    min-height: 500px;
    overflow: hidden;
  }
  .cars-content dl{
    width: 357px;
    height: 264px;
    background: #fff;
    padding: 16px;
    text-decoration: none;
    margin-top: 30px;
    float: left;
    cursor: pointer;
  }
  .cars-content dt{
    width: 100%;
    height: 180px;
    border-bottom: 1px solid #DADADA;
    text-align: center;
    position: relative;
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
  .el-pagination.is-background .el-pager li{
    border: 1px solid #999999;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #FF6600;
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
    margin-top: 30px;
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
</style>
