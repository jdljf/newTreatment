<template>
  <div class="ceyan_jieguo">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">测验结果</p>
    </div>

    <div class="neirong">
      <div class="touming1"></div>
      <div class="touming2"></div>
      <div class="bai">
        <img class="touxiang" src="../../assets/logo.png" alt>
        <p class="mingzi">恭喜你李存华，通过考核</p>
        <p class="daqiandao">
          <span class="fenshu">92</span>
          <span class="fen">分</span>
        </p>
        <p class="tishi">本次考核答错2道题，继续努力</p>
        <p class="huode">
          获得
          <span class="yidou">20</span>医豆
        </p>
      </div>
    </div>

    <div class="anniu">
      <router-link to="/subjectDetail" query="" class="zailai">再来一次</router-link>
      <router-link to="/" class="liji">分享赚医豆</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ceyan_chenggong",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ceyan_jieguo {
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
      margin: 2rem auto 0.4rem auto;
      border-radius: 4px;
      z-index: 10;
      text-align: center;
      .mingzi {
        padding-top: 0.8rem;
        font-size: 0.29rem;
        font-weight: 600;
      }
      .daqiandao {
        font-size: 0rem;
        color: #19e889;
        padding: 0.3rem 0 0.3rem 0;
        color: #ffa320;
        .fenshu{
            font-size: 0.8rem;
        }
        .fen {
          font-size: 0.29rem;
        }
      }
      .tishi {
        font-size: 0.28rem;
        color: #ccc;
        text-align: center;
        width: 100%;
        margin-bottom: 0.5rem;
      }
      .huode {
        .yidou {
          font-size: 0.5rem;
          color: #19e889;
        }
      }
    }
  }
  .anniu{
      width: 4.8rem;
        margin: 0 auto;
        height: 0.7rem;
        line-height: 0.7rem;
        font-size: 0.28rem;
    .zailai {
        float: left;
        display: block;
        width: 1.7rem;
        height: 100%;
        text-align: center;
        color: #19e889;
        background: #fff;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid #19e889;
    }
    .liji {
        float: right;
        display: block;
        width: 2.5rem;
        height: 100%;
        text-align: center;
        color: #fff;
        background: #19e889;
        border-radius: 4px;
    }    
  }
  
}
</style>
