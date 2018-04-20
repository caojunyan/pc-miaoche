<template>
    <div class="search container">
      <div class="search-wrapper">
        <div class="search-left">
          <input type="text" placeholder="输入手机号"><span>免费预约</span>
        </div>
        <div class="search-right">
          <img src="./search-icon.png" alt=""><input type="text" placeholder="搜索你想要的车"><span>搜索</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "search-box"
    }
</script>

<style scoped>
.search{

}
.search-wrapper{
  width: 100%;
  height: 45px;
}
.search-left{
  width: 482px;
  height: 100%;
  float: left;
}
.search-left>input{
  width: 318px;
  border: none;
  outline: none;
  height: 45px;
  line-height: 45px;
  padding-left: 12px;
  font-size: 14px;
  position: relative;
  top:-2px;
}
.search-left>span{
  width: 152px;
  display: inline-block;
  height: 100%;
  background: #FF6600;
  color:#fff;
  font-size: 14px;
  line-height: 45px;
  text-align: center;
  cursor: pointer;
}
.search-right{
  float: right;
  width: 646px;
  height: 100%;
  background:#fff;
  padding-left: 33px;
  line-height: 45px;
}
.search-right>img{
  width: 18px;
  height: 18px;
  position: relative;
  top:5px;
}
.search-right>input{
  border: none;
  outline: none;
  height: 100%;
  width: 447px;
  padding-left: 33px;
  position:relative;
  top:-2px;
  font-size: 14px;
}
.search-right>span{
  display: inline-block;
  width: 148px;
  height: 100%;
  line-height: 45px;
  text-align: center;
  color:#fff;
  background: #ff6600;
  font-size: 14px;
  cursor: pointer;
}
</style>
