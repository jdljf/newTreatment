<template>
  <div class="jiangyi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">课件讲义</p>
    </div>

    <div class="neirong">
      <img class="tu" src="../../assets/kecheng.png" alt>
      <p class="xiangqing" v-for="content in handout">{{content}}</p>
      <!-- <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>-->
    </div>

    <div class="xiazai">
      <div class="anniu">下载讲义</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "jiangyi",
  data() {
    return {
      handout: []
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.getHandout();
    // this.getSubject();
  },
  methods: {
    getHandout() {
      this.axios
        .get("/api/getHandout", {
          params: {
            id: this.$route.query.id,
            index: this.$route.query.index
          }
        })
        .then(res => {
          this.handout = res.data.handout.content;
          console.log(this.handout);
        });
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
    bottom: 1.85rem;
    padding: 0.2rem;
    overflow: scroll;
    width: 100%;
    box-sizing: border-box;
    .tu {
      width: 100%;
      height: 3.5rem;
      margin-bottom: 0.1rem;
    }
    .xiangqing {
      font-size: 0.24rem;
      line-height: 0.4rem;
      text-indent: 0.5rem;
    }
  }
  .xiazai {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.85rem;
    background: #f1f1f1;
    .anniu {
      width: 2.62rem;
      height: 0.8rem;
      line-height: 0.8rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: 19e889;
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
      border-radius: 4px;
    }
  }
}
</style>
