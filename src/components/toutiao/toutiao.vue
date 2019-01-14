<template>
  <div class="toutiao">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">头条视讯</p>
    </div>

    <ul class="liebiao">
      <li
        class="liebiao-xiang"
        v-for="headline in headline"
        @click="gotoSubjectDetail(headline._id, headline.canStudy)"
      >
        <img v-bind:src=" '/api' + headline.img" alt class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">{{headline.title}}</div>
          <div class="shangci">
            时长:
            <span class="riqi">12分钟</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "toutiao",
  data() {
    return {
      headline: []
    };
  },
  mounted() {
    this.getHeadlineVideo();
  },
  methods: {
    getHeadlineVideo() {
      this.axios.get("/api/getHeadlineVideo").then(res => {
        console.log(res);
        this.headline = res.data.headline;
      });
    },
    gotoSubjectDetail(id, canStudy) {
      this.$router.push({
        path: "/subjectDetail",
        query: { id: id, canStudy:  canStudy}
      });
    },
    huitui() {
      if (this.$route.query.goindex === "true") {
        this.$router.push("/");
      } else {
        this.$router.push({ path: "/main" });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.toutiao {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  overflow: auto;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .liebiao {
    padding: 0 0 0.15rem 0.2rem;
    background: #fff;
    .liebiao-xiang {
      display: flex;
      padding: 0.23rem 0.3rem 0.23rem 0;
      border-bottom: 1px solid #f1f1f1;
      .zuo {
        // margin-left: 0.2rem;
        width: 1.6rem;
        height: 1.2rem;
      }
      .zhong {
        position: relative;
        // margin: 0 0.3rem 0 0.2rem;
        margin-left: 0.2rem;
        flex: 1;
        overflow: hidden;
        .kecheng-biaoti {
          font-size: 0.27rem;
          height: 0.74rem;
          line-height: 0.37rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .shangci {
          position: absolute;
          bottom: 0;
          font-size: 0.22rem;
          color: #ccc;
          .riqi {
            margin: 0 0.1rem;
          }
        }
      }
    }
  }
}
</style>
