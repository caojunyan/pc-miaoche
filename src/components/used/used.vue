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
          <li class="comprehensive" @click="defaultSort">默认排序</li>
          <li class="carType" >
            <select name="" id="sel1" @change="selNewCar">
              <option value="" disabled selected>车型</option>
              <option value="new" >新车</option>
              <option value="used" >二手车</option>
            </select>
          </li>
          <li class="brandType" >
            <select name="" id="sel2" @change="selBrands">
              <option value="" disabled selected>品牌</option>
              <option :value=item.value v-for="(item ,index) in brands" v-model="item.value" :key="index">{{item.value}}</option>
            </select>
          </li>
          <li class="priceType" >
            <select name="" id="sel3" @change="selPrice">
              <option  disabled selected  value="">价格</option>
              <option value="0-100000" >10万以下</option>
              <option value="100000-200000" >10-20万</option>
              <option value="200000-300000" >20-30万</option>
              <option value="300000-500000" >30-50万</option>
              <option value="500000-1000000" >50万以上</option>
            </select>
          </li>
        </ul>
      </div>
      <div class="container">
        <div class="cars-content" ref="content">
          <dl v-for="(item,index) in cars" :key="index" @click="toDetail(item.id)">
            <dt>
              <img v-lazy=baseImg+item.images.data[0].url alt="" class="car-img">
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
        brands:"",
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
        this.axios.get('https://api.miaoche168.com/api/cars/list/used?include=images').then(res=>{
          this.nextUrlBase="https://api.miaoche168.com/api/cars/list/used?include=images&page="
          this.totalPage=res.data.meta.pagination.total_pages
          this.cars=res.data.data
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.$router.push({
            path:"/used",
            query:{
             type:"used"
            }
          });
          this.init()
        }).catch(err=>{
          alert("网络错误")
        })
      },
      // pageSize 改变时会触发	每页条数size
      handleSizeChange (e){
      },
      // currentPage 改变时会触发	当前页currentPage
      handleCurrentChange(pageNum){
        this.cars=""
        this.axios.get(this.nextUrlBase+pageNum).then(res=>{
          this.cars=res.data.data
          this.init()
          var min=this.$route.query.min
          var max=this.$route.query.max
          var type=this.$route.query.type
          this.currentPage=res.data.meta.pagination.current_page
          this.totalPage=res.data.meta.pagination.total_pages
          this.cars=res.data.data
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.$router.push({
            path:"/used",
            query:{
              min:min,
              max:max,
              page:pageNum,
              type:type,
              value:this.$route.query.value
            }
          });
        }).catch(err=>{
          console.log(err)
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
        var carName=localStorage.getItem('carName')
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
      // 获取品牌
      getBrands(){
        this.axios.get('https://api.miaoche168.com/api/brands?include=images').then(res=>{
          this.brands=res.data
        }).catch(err=>{
          console.log(err)
        })
      },
      // 改变品牌
      selBrands(e){
        var brandSel=e.target.value;
        this.axios.get('https://api.miaoche168.com/api/home/brands?include=images&value=' + brandSel).then(res=>{
          this.cars=res.data.data
          this.nextUrlBase='https://api.miaoche168.com/api/home/brands?include=images&value=' + brandSel+'&page='
          this.totalPage=res.data.meta.pagination.total_pages
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.init()
          this.$router.push({
            path:"/used",
            query:{
              value:brandSel,
              page: '1',
              type:"品牌"
            }
          });
        }).catch(err=>{
          console.log(err)
        })
      },
      // 新车和二手车的切换
      selNewCar(e){
        var carType=e.target.value
        this.axios.get('https://api.miaoche168.com/api/cars/list/'+carType+'?include=images').then(res=>{
          this.nextUrlBase="https://api.miaoche168.com/api/cars/list/'+carType+'?include=images&page="
          this.totalPage=res.data.meta.pagination.total_pages
          this.cars=res.data.data
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.init()
          this.$router.push({
            path:"/used",
            query:{
              value:carType,
              page:'1',
              type:"车型"
            }
          });
        }).catch(err=>{
          alert("网络错误")
        })
      },
      // 默认排序
      defaultSort(){
        this.getHomeList()
      },
      // 价格筛选
      selPrice(e){
        var min=e.target.value.split("-")[0];
        var max=e.target.value.split("-")[1];
        this.axios.get('https://api.miaoche168.com/api/cars/price/'+ min + '/' + max+'?page=1&include=images').then(res=>{
          this.nextUrlBase="https://api.miaoche168.com/api/cars/price/"+min+'/'+max+'?include=images&page='
          this.totalPage=res.data.meta.pagination.total_pages
          this.cars=res.data.data
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.init()
          this.$router.push({
            path:"/used",
            query:{
             min:min,
             max:max,
             page:'1',
             type:"价格"
            }
          });
        }).catch(err=>{
          console.log(err)
        })
        //  console.log(this.currentPage,'当前的')
      },
    },
    mounted(){
      // 获取二手车列表
     /* this.getHomeList()*/
      this.getBrands()
      // 判断是否有参数
      var query=this.$route.query
      var url=this.$route.fullPath
      var min=query.min
      var max=query.max
      var page=query.page
      var brandSel=query.value
      var carType=query.value
      if(JSON.stringify(query)=="{}"){
        this.getHomeList()
      }else if(query.type=="价格"){
        this.axios.get('https://api.miaoche168.com/api/cars/price/'+ min + '/' + max+'?include=images&page='+page).then(res=>{
          this.cars=res.data.data
          this.nextUrlBase="https://api.miaoche168.com/api/cars/price/"+min+'/'+max+'?include=images&page='
          this.totalPage=res.data.meta.pagination.total_pages
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.init()
          this.$router.push({
            path:"/used",
            query:{
              min:min,
              max:max,
              page:this.currentPage,
              type:"价格"
            }
          });
        }).catch(err=>{
          console.log(err)
        })
      }else if(query.type=="品牌"){
        this.axios.get('https://api.miaoche168.com/api/home/brands?value=' + brandSel+'&include=images&page='+page).then(res=>{
          this.cars=res.data.data
          this.nextUrlBase='https://api.miaoche168.com/api/home/brands?value=' + brandSel+'&include=images&page='
          this.totalPage=res.data.meta.pagination.total_pages
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.init()
          this.$router.push({
            path:"/used",
            query:{
              value:brandSel,
              page:this.currentPage,
              type:"品牌"
            }
          });
        }).catch(err=>{
          console.log(err)
        })
      }else if(query.type=="车型"){
        this.axios.get('https://api.miaoche168.com/api/cars/list/'+carType+'?include=images&page='+page).then(res=> {
          this.cars = res.data.data
          this.nextUrlBase ='https://api.miaoche168.com/api/cars/list/'+carType+'?include=images&page='+page
          this.totalPage = res.data.meta.pagination.total_pages
          this.total = res.data.meta.pagination.total
          this.pageSize = res.data.meta.pagination.per_page
          this.currentPage = res.data.meta.pagination.current_page
          this.init()
          this.$router.push({
            path:"/used",
            query:{
              value:carType,
              page:this.currentPage,
              type:"车型"
            }
          });
        })
      }
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
    width: 120px;
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
    overflow: hidden;
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
</style>
