<template>
    <div class="search container">
      <div class="search-wrapper">
        <div class="search-left">
          <input type="text" placeholder="输入手机号" v-model="subBox.phone"><span @click="appointment">免费预约</span>
        </div>
        <div class="search-right">
          <img src="./search-icon.png" alt=""><input type="text" placeholder="搜索你想要的车" v-model="carName"><span @click="search">搜索</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "search-box",
        data(){
          return{
            carName:'',
            subBox:{
              name: String(Date.parse(new Date())), //姓名
              gender: "", //性别
              phone:"", //手机号
              code: "", //验证码
              isMine: "", //是否是车主
              creditStatus: "", //信用状态 --- 字符型
              key: ""
            },
            searchCars:""
          }
        },
        methods:{
          appointment(){
            var that=this;
            var phoneReg = /^1[3|4|5|7}8][0-9]\d{4,8}$/;
            if (!phoneReg.test(this.subBox.phone) || this.subBox.phone.length != 11 || !this.subBox.phone) {
              this.$message({
                showClose: true,
                message: '手机号码输入有误',
                type: 'warming'
              });
            }else{
              this.axios.post('https://loan.api.miaoche168.com/api/customers',this.subBox).then(res=>{
                this.$message({
                  showClose: true,
                  message: '提交成功，稍后会有工作人员与您联系',
                  type: 'success'
                });
              }).catch(err=>{
                console.log(err)
              })
            }
          },
          search(){
            var carName=this.carName
            this.axios.get("https://api.miaoche168.com/api/home/screen?value="+carName).then(res=>{
              this.searchCars=res.data
              this.$emit('child-say',this.searchCars)
            }).catch(err=>{

            })
          }
        }
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
