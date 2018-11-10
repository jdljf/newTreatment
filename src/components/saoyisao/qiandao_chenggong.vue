<template>
  <div class="qiandao_chenggong">
    <div class="neirong">
      <div class="iconfont icon-houtui icon"></div>
      <div class="gradient">
        <i class="iconfont icon-icon-test1 iconChenggong"></i>
      </div>      
      <p class="chenggong">签到成功</p>
      <!-- <p class="chenggong">提交成功</p>k -->
      <p class="yidou">+5医豆</p>
    </div>
    <!-- <router-link class="fanhui">返回学院</router-link> -->
    <span class="fanhui">返回学院</span>

    <div class="kk"></div>
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
.qiandao_chenggong {
  .neirong{
    position: relative;
    height: 4rem;
    background: #ffc62c;
    text-align: center;    
    margin-bottom: 30%;
    overflow: hidden;
    .iconChenggong{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #2bff3f;
        font-size: 0.7rem;
        width: 1.3rem;
        height: 1.3rem;
        line-height: 1.3rem;
        border-radius: 50%;
        background: #e5ec24;
        border: 6px solid #f3ff2c;
      }
    .gradient{
      position: relative;
      width: 2rem;
      height: 2rem;
      margin: 0.1rem auto 0 auto;
      border-radius: 50%;
      background: radial-gradient(#fff,#FFC511,#FFC61A);
      .iconChenggong{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #2bff3f;
        font-size: 0.7rem;
        width: 1.3rem;
        height: 1.3rem;
        line-height: 1.3rem;
        border-radius: 50%;
        background: #e5ec24;
        border: 6px solid #f3ff2c;
      }
    }
    .icon{
      position: absolute;
      padding: 0.1rem 0 0 0.25rem;     
    }
    
    .chenggong{
      margin: 0.5rem 0 0.02rem 0;
      font-size: 0.3rem;
      color: #fff;
    }
    .yidou{
      font-size: 0.12rem;
      color: #f4f4f4;
    }
  }
  .fanhui {
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
  .kk{
    background: radial-gradient(red, green, blue);
  }
}
</style>
