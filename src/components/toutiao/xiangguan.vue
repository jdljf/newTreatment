<template>
  <div class="xiangguan">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">相关视频</p>
    </div>

    <div v-if="noData"  class="noData">暂时没有数据</div>
    <ul class="liebiao">
      <li class="liebiao-xiang" v-for="(aboutList, index) in aboutList">
        <img src="../../assets/kecheng.png" alt class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">{{aboutList.title}}</div>
          <div class="shangci">
            <!-- <span>时长:</span>
            <span class="riqi">{{aboutList.durationTime}}</span>-->
            <img
              @click="collectAboutVideo(aboutList._id, index)"
              :src="collecteds[index]?'/static/icon/collect-success.png': '/static/icon/collect.png'"
              class="img"
              alt
            >
          </div>
        </div>
      </li>
    </ul>

    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="30"
      v-if="!noData"
    >
      <div class="NewData">{{loadText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xiangguan",
  data() {
    return {
      collectImg: "/static/icon/collect.png",
      aboutList: [],
      collecteds: [],

      pageNum: 1,
      pageSize: 4,
      busy: false,
      noData: false,
      noNewData: false,
      loadText: "加载中"
    };
  },
  mounted() {
    this.getMoreAboutVideo();
  },
  methods: {
    loadMore: function() {
      this.busy = true;
      let that = this;
      setTimeout(() => {
        this.pageNum++;
        this.getMoreAboutVideo();
        //  this.busy = false
      }, 2000);
    },
    getMoreAboutVideo() {
      this.axios
        .get("/api/getAboutVideo", {
          params: {
            id: this.$route.query.id,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(res.data);
          if (this.pageNum == 1 && res.data.list <= 0) {
            this.busy = true;
            this.noData = true;
          } else if (this.pageNum > 1 && res.data.list <= 0) {
            (this.busy = true), (this.noNewData = true);
            this.loadText = "没有更多数据了";
          } else {
            this.busy = false;
            this.aboutList.push(...res.data.list);
            this.collecteds.push(...res.data.collecteds);
          }
        });
    },
    collectAboutVideo(id, index) {
      if (this.collecteds[index] == false) {
        this.collecteds.splice(index, 1, true);
      } else if (this.collecteds[index] == true) {
        this.collecteds.splice(index, 1, false);
      }

      this.axios
        .get("/api/wantToCollectVideo", {
          params: {
            videoId: id,
            wantCollect: this.collecteds[index]
          }
        })
        .then(res => {
          console.log(res.data);
        });
    },
    huitui() {
      if (this.$route.query.goindex === "true") {
        this.$router.push("/");
      } else {
        this.$router.back(-1);
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.xiangguan {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
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
  .noData {
    text-align: center;
    margin-top: 50%;
  }
  .liebiao {
    margin: 0 0 0rem 0rem;
    background: #fff;
    .liebiao-xiang {
      display: flex;
      padding: 0.23rem 0.3rem 0.23rem 0;
      border-bottom: 1px solid #ccc;
      margin: 0 0 0 0.2rem;
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
          font-size: 0.25rem;
          height: 0.74rem;
          line-height: 0.37rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .shangci {
          position: absolute;
          bottom: 0;
          font-size: 0.25rem;
          width: 100%;
          color: #ccc;
          .riqi {
            margin: 0 0.1rem;
          }
          .img {
            float: right;
          }
        }
      }
    }
  }
  .NewData {
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.26rem;
    }
}
</style>
