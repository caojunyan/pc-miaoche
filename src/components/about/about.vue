<template>
    <div class="about">
      <my-header ></my-header>
      <div class="title container">关于我们</div>
      <div class="address container">
        <div class="map" id="dituContent"></div>
        <div class="us">
          <p>
            武汉秒车网汽车租赁有限公司是一家致力于从事汽车消费金融的现代化多元公司，公司业务板块主要分为汽车抵押贷款，汽车融资租赁，汽车置换以租代购，后期公司将逐步发展成为集汽车维修保养，二手车经销，汽车综合超市等产业链。公司以“年轻、活力、拼搏”作为企业文化。从业至今获得良好的市场口碑。服务热线：17798219533
          </p>
        </div>
      </div>
    </div>
</template>

<script>
  import myHeader from "../header/header"
    export default {
        name: "about",
        methods:{
          map(){
            //创建和初始化地图函数：
            function initMap(){
              createMap();//创建地图
              setMapEvent();//设置地图事件
              addMapControl();//向地图添加控件
              addMarker();//向地图中添加marker
            }

            //创建地图函数：经度:114.250834
            /*纬度:30.607912*/
            function createMap(){
              var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
              var point = new BMap.Point(114.250834,30.607912);//定义一个中心点坐标
              map.centerAndZoom(point,14);//设定地图的中心点和坐标并将地图显示在地图容器中
              window.map = map;//将map变量存储在全局
            }

            //地图事件设置函数：
            function setMapEvent(){
              map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
              map.enableScrollWheelZoom();//启用地图滚轮放大缩小
              map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
              map.enableKeyboard();//启用键盘上下左右键移动地图
            }

            //地图控件添加函数：
            function addMapControl(){
              //向地图中添加缩放控件
              var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
              map.addControl(ctrl_nav);
              //向地图中添加缩略图控件
              var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
              map.addControl(ctrl_ove);
              //向地图中添加比例尺控件
              var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
              map.addControl(ctrl_sca);
            }
            //标注点数组
            var markerArr =
              [{title:"秒车网",content:"秒车网科技公司",point:"114.250834|30.607912",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}];
            //创建marker
            function addMarker(){
              for(var i=0;i<markerArr.length;i++){
                var json = markerArr[i];
                var p0 = json.point.split("|")[0];
                var p1 = json.point.split("|")[1];
                var point = new BMap.Point(p0,p1);
                var iconImg = createIcon(json.icon);
                var marker = new BMap.Marker(point,{icon:iconImg});
                var iw = createInfoWindow(i);
                var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
                marker.setLabel(label);
                map.addOverlay(marker);
                label.setStyle({
                  borderColor:"red",
                  color:"red",
                  cursor:"pointer"
                });

                (function(){
                  var index = i;
                  var _iw = createInfoWindow(i);
                  var _marker = marker;
                  _marker.addEventListener("click",function(){
                    this.openInfoWindow(_iw);
                  });
                  _iw.addEventListener("open",function(){
                    _marker.getLabel().hide();
                  })
                  _iw.addEventListener("close",function(){
                    _marker.getLabel().show();
                  })
                  label.addEventListener("click",function(){
                    _marker.openInfoWindow(_iw);
                  })
                  if(!!json.isOpen){
                    label.hide();
                    _marker.openInfoWindow(_iw);
                  }
                })()
              }
            }
            //创建InfoWindow
            function createInfoWindow(i){
              var json = markerArr[i];
              var iw = new
              BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
              return iw;
            }
            //创建一个Icon
            function createIcon(json){
              var icon = new
              BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png",
                new BMap.Size(json.w,json.h),
                {imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),
                  offset:new BMap.Size(json.x,json.h)})
              return icon;
            }
            initMap();//创建和初始化地图

          }
        },
      mounted(){
          this.map()
      },
      components:{
        myHeader
      }
    }
</script>

<style scoped lang="stylus">
.about
  width 100%
  height 610px
  background #F1F1F1
  .title
    height 52px
    background #3D3834
    color:#fff
    font-size 16px
    line-height 52px
    padding-left 10px
    margin-top 50px
  .address
    background #fff
    margin-top 10px
    padding 20px 10px
    height 400px
    .map
      width 50%
      height 400px
      float left
    .us
      width 50%
      margin-top 83px
      float right
      text-align: center
      p
        height 214px
        margin 0 auto
        width 60%
        font-size 14px
        text-align left
        text-indent 30px
        line-height 30px
        color #666
</style>
