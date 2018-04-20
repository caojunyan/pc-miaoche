<template>
  <div id="app">
    <my-header></my-header>
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
</style>
