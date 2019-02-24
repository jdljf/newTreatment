<template>
  <div class="jiangyi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">关于我们</p>
    </div>

    <div class="neirong">
      <img class="tu" src="../../assets/aboutUs.jpg" alt>
      <p class="xiangqing" v-for="content in content">{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "jiangyi",
  data() {
    return {
      content: []
    };
  },
  mounted() {
    this.getAboutUs();
  },
  methods: {
    getAboutUs() {
      this.axios.get("/api/getAboutUs").then(res => {
        if (res.data.err_code == 200) {
          this.content = res.data.aboutUs.content;
          console.log(this.about);
        }
      });
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
.jiangyi {
  position: relative;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    border-bottom: 5px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .neirong {
    position: fixed;
    top: 0.82rem;
    bottom: 0rem;
    left: 0;
    right: 0;
    padding: 0.2rem;
    overflow: scroll;
    .tu {
      width: 100%;
      height: 3.5rem;
      margin-bottom: 0.1rem;
    }
    .xiangqing {
      font-size: 0.27rem;
      line-height: 0.4rem;
      text-indent: 0.5rem;
      padding-bottom: 0.1rem;
    }
  }
}
</style>
