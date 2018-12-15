<template>
  <div class="qiandao_chenggong">
    <div class="neirong">
      <div class="iconfont icon-houtui icon"></div>
      <div class="gradient">
        <i class="iconfont icon-icon-test1 iconChenggong"></i>
      </div>
      <p class="chenggong">{{message}}</p>
      <p class="yidou">+{{getMedicalBeans}}医豆</p>
    </div>
    <router-link to="/" class="fanhui">返回学院</router-link>
  </div>
</template>

<script>
export default {
  name: "qiandao",
  mounted() {
    // 注意：是this.$route.query，不是this.$router.query
    this.message = this.$route.query.message,
    this.getMedicalBeans = this.$route.query.getMedicalBeans;
  },
  data() {
    return {
      message: "",
      getMedicalBeans: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.qiandao_chenggong {
  .neirong {
    position: relative;
    height: 4rem;
    background: #ffc62c;
    text-align: center;
    margin-bottom: 30%;
    overflow: hidden;
    .iconChenggong {
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
    .gradient {
      position: relative;
      width: 2rem;
      height: 2rem;
      margin: 0.7rem auto 0 auto;
      border-radius: 50%;
      background: radial-gradient(#fff, #ffc511, #ffc61a);
      .iconChenggong {
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
    .icon {
          position: absolute;
    padding: 0.2rem 0 0 0.25rem;
    color: #fff;
    font-size: 0.45rem;
    }

    .chenggong {
      margin: 0rem 0 0.02rem 0;
      font-size: 0.3rem;
      color: #fff;
    }
    .yidou {
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
    font-size: 0.29rem;
    color: #fff;
    background: #19e889;
    margin: 0 auto;
    border-radius: 4px;
  }
}
</style>
