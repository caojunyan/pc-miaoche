<template>
  <div class="used">
    <my-header  v-on:header-say="headerData"></my-header>
    <div class="search">
      <searchBox v-on:child-say="listenTo"></searchBox>
    </div>
    <!--车-->
    <div class="wrapper-container ">
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
  import myHeader from '../header/header'
  export default {
    name: "used",
    data(){
      return{
        carName:this.$route.query.carName,
        cars:"",
        baseImg:"https://api.miaoche168.com/",
        nextUrlBase:"",
        currentPage:1,
        totalPage:'',
        nextUrl:'',
        total:0,
        pageSize:0,
        brands:"",
      }
    },
    components:{
      searchBox,
      myHeader,
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
      headerData(headerData){
        this.cars=headerData.data
        this.totalPage=headerData.meta.pagination.total_pages
        this.total=headerData.meta.pagination.total
        this.pageSize=headerData.meta.pagination.per_page
        this.currentPage=headerData.meta.pagination.current_page
        this.init()
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
      // currentPage 改变时会触发	当前页currentPage
      handleCurrentChange(pageNum){
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
              value:this.$route.query.value,
              carName:this.carName
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
        if(someData.searchCars.data.length===0){
          this.$message({
            message:"没有找到您要的车"
          })
        }else{
          this.cars=someData.searchCars.data
          this.nextUrlBase="https://api.miaoche168.com/api/home/screen?include=images&value="+someData.carName+"&page="
          this.totalPage=someData.searchCars.meta.pagination.total_pages
          this.total=someData.searchCars.meta.pagination.total
          this.pageSize=someData.searchCars.meta.pagination.per_page
          this.currentPage=someData.searchCars.meta.pagination.current_page
          this.init()
          this.carName=someData.carName
          this.$router.push({
            path:"/used",
            query:{
              page: '1',
              type:"搜索",
              carName:someData.carName
            }
          });
        }
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
          this.nextUrlBase="https://api.miaoche168.com/api/cars/list/"+carType+"?include=images&page="
          this.totalPage=res.data.meta.pagination.total_pages
          this.cars=res.data.data
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.init()
          this.$router.push({
            path:"/used",
            query:{
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
        this.axios.get('https://api.miaoche168.com/api/cars/list/'+query.value+'?include=images&page='+page).then(res=>{
          this.nextUrlBase='https://api.miaoche168.com/api/cars/list/'+query.value+'?include=images&page='
          this.totalPage=res.data.meta.pagination.total_pages
          this.cars=res.data.data
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.$router.push({
            path:"/used",
            query:{
              type:"车型",
              page:this.currentPage,
            }
          });
          this.init()
        }).catch(err=>{
          console.log(err)
        })
      }else if(query.type=="搜索"){
        this.axios.get('https://api.miaoche168.com/api/home/screen?include=images&page='+page+'&value='+this.carName).then(res=>{
          this.cars=res.data.data
          this.nextUrlBase='https://api.miaoche168.com/api/home/screen?include=images&value='+this.carName+'&page='
          this.totalPage=res.data.meta.pagination.total_pages
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.currentPage=res.data.meta.pagination.current_page
          this.$router.push({
            path:"/used",
            query:{
              page: page,
              type:"搜索",
              carName:this.carName
            }
          });
          this.init()
        })
      }else if(query.type="used"){
        this.axios.get('https://api.miaoche168.com/api/cars/list/used?include=images&page='+page).then(res=>{
          this.cars=res.data.data
          this.nextUrlBase="https://api.miaoche168.com/api/cars/list/used?include=images&page="
          this.init()
          this.currentPage=res.data.meta.pagination.current_page
          this.totalPage=res.data.meta.pagination.total_pages
          this.cars=res.data.data
          this.total=res.data.meta.pagination.total
          this.pageSize=res.data.meta.pagination.per_page
          this.$router.push({
            path:"/used",
            query:{
              page:page,
              type:'used'
            }
          });
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .used{
    background: #F1F1F1;
  }
  .search{
    margin-top: 30px;
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


  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #FF6600;
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color: #fff;
    background-color: #FF6600;
  }
  .background .el-pager li:not(.disabled).active {
    background-color: #FF6600;
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FF6600;
    color: #fff;
  }
</style>
