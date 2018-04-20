<template>
  <div class="detail">
    <!--放大镜-->
    <div class="big-wrapper container">
      <div class="big-left">
        <div class="zoom-wrapper">
          <MyMagnify :previewImg="data.min" :zoomImg="data.max"></MyMagnify>
          <div class="zoom-list">
            <ul>
              <li>
                <img src="./sPic.png" alt="">
              </li>
              <li>
                <img src="./sPic.png" alt="">
              </li>
              <li>
                <img src="./sPic.png" alt="">
              </li>
              <li>
                <img src="./sPic.png" alt="">
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div class="big-right">

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
        }
      };
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
    .big-right
      width 50%
      height 100%
      float right
</style>
