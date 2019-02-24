<template>
  <div class="denglu_tuichu">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">退出登录</p>
    </div>
    <img class="tu" src="../../assets/tuichudenglu.png" alt>
    <div class="tuichu" @click="loginOut">退出登录</div>
  </div>
</template>

<script>
export default {
  name: "denglu_tuichu",
  data() {
    return {};
  },
  methods: {
    loginOut(){
      this.$messagebox.alert('确定要退出登录吗');
      // this.$store.dispatch("UserLogin", token);
      this.$store.dispatch('UserLogout')
    },
    huitui() {
      if (this.$route.query.goindex === "true") {
        this.$router.push("/");
      } else {
        this.$router.back(-1);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.denglu_tuichu {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  text-align: center;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    // border-bottom: 12px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .tu{
    display: block;
    width: 6rem;
    // height: 2.5rem;
    margin: 0.3rem auto 0.5rem auto;
  }
  .tuichu{
    margin: 0 auto;
    width: 3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    color: #ffffff;
    font-weight: 600;
    background: #19e889;
    border-radius: 2px;
    font-size: 0.3rem;
  }
}
</style>
