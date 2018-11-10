<template>
  <div class="qiandao">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">活动签到</p>      
    </div>

    <div class="neirong">
      <div class="touming1"></div>
      <div class="touming2"></div>
      <div class="bai">
        
        <img class="touxiang" src="../../assets/logo.png" alt="">
        <p class="mingzi">李村花</p>
        <p class="daqiandao">签到</p>
        <p class="tishi">通过本次签到，您可以获得神秘礼物哦！</p>
      </div>
    </div>

    <router-link to="/signInSucc" class="liji">立即签到</router-link>
  </div>
</template>

<script>
export default {
  name: "qiandao",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.qiandao {
  font-size: 0.25rem;
  position: fixed;
  height: 100%;
  background: #eee;
  width: 100%;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .neirong {
    position: relative;
    .touxiang {
      position: absolute;
      width: 1rem;
      height: 1rem;
      top: 0;
      left: 50%;
      -webkit-transform: translate(0, -50%);
      transform: translate(-50%, -50%);
      border: 2px solid #fff;
      background: #fff;
      border-radius: 50%;
      border: 5px solid #fff;
    }
    .touming1 {
      position: absolute;
      background: rgba($color: #fff, $alpha: 0.6);
      left: 0;
      right: 0;
      top: -0.4rem;
      width: 4rem;
      height: 3rem;
      margin: 0 auto;
      border-radius: 4px;
    }
    .touming2 {
      position: absolute;
      top: -0.2rem;
      left: 0;
      right: 0;
      width: 4.5rem;
      height: 3rem;
      margin: 0 auto;
      background: rgba($color: #fff, $alpha: 0.6);
      z-index: 1;
      border-radius: 4px;
    }
    .bai {
      position: relative;
      background: #fff;
      width: 4.8rem;
      height: 5.3rem;
      margin: 2rem auto 1rem auto;
      border-radius: 4px;
      z-index: 10;
      text-align: center;
      .mingzi {
        padding-top: 0.8rem;
      }
      .daqiandao {
        font-size: 1.3rem;
        color: #19e889;
        padding: 0.5rem 0 0 0;
      }
      .tishi {
        position: absolute;
        bottom: 0.6rem;
        text-align: center;
        font-size: 0.2rem;
        width: 100%;
      }
    }
  }
  .liji {
    display: block;
    width: 2.5rem;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    background: #19e889;
    margin: 0 auto;
    border-radius: 4px;
  }
}
</style>
