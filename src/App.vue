<template>
  <div id="app">
  <!--  <my-header ></my-header>-->
    <router-view/>
    <myFooter></myFooter>
  </div>
</template>

<script>
  import myHeader from "./components/header/header"
  import myFooter from "./components/footer/footer"
  export default {
    components:{
      myHeader,
      myFooter
    }
  }
</script>

<style>
@import "common/style/reset.css";
@import "./common/style/base.css";
ul,li,p,h1,h2,h3,h4,h5,h6,dl,dt,dd {
  margin:0px;
  padding:0px;
  border:none;
  list-style:none;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background: #FF6600 !important;
  color: #fff !important;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #fff !important;
  background-color: #FF6600 !important;
}
.background .el-pager li:not(.disabled).active {
  background-color: #FF6600 !important;
  color: #fff !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #FF6600 !important;
  color: #fff !important;
}
</style>
