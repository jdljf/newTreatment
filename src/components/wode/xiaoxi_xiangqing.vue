<template>
  <div class="xiaoxi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">系统消息详情</p>      
    </div>
    
    <ul class="liebiao">
      <li class="liebiao-xiang">
        <p class="biaoti">我是标题</p>
        <p class="xiangxi">大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！</p>
        <p class="shijian">2018.5.12</p> 
      </li>
      <li class="liebiao-xiang">
        <p class="biaoti wodehuifu">我的回复</p>
        <p class="xiangxi">大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！大家好，我是消息内容！</p>
        <p class="shijian">2018.5.12</p> 
      </li>
    </ul>  

    <div class="huifu">
      <input type="text" class="huifukuang" placeholder="写点什么吧！">
    </div>
  </div>
</template>

<script>
export default {
  name: "xiaoxi",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.xiaoxi {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #eee;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    margin-bottom: 0.25rem;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .liebiao {
    overflow: scroll;
    .liebiao-xiang {
      padding: 0.4rem 0.2rem;
      background: #fff;
      margin-bottom: 0.2rem;
      font-size: 0.26rem;
      .biaoti.wodehuifu {
        color: #70efb1;
      }
      .xiangxi {
        margin: 0.2rem 0 0.4rem 0;
      }
      .shijian {
        font-size: 0.2rem;
      }
    }
  }
  .huifu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.88rem;
    background: #fff;
    padding: 0.15rem 0.2rem;
    box-sizing: border-box;
    .huifukuang {
      width: 100%;
      height: 100%;
      background: #eee;
      outline: none;
      border: none;
      box-sizing: border-box;
      font-size: 0.2rem;
      padding: 0 0 0 0.15rem;
    }
  }
}
</style>
