<template>
  <div class="xiangguan">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">相关视频</p>
    </div>

    <ul class="liebiao">
      <li class="liebiao-xiang" v-for="(aboutList, index) in aboutList">
        <img src="../../assets/kecheng.png" alt class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">{{aboutList.title}}</div>
          <div class="shangci">
            <!-- <span>时长:</span>
            <span class="riqi">{{aboutList.durationTime}}</span>-->
            <img :src="collecteds[index]?'/static/icon/collect-success.png': '/static/icon/collect.png'" class="img" alt>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "xiangguan",
  data() {
    return {
      collectImg: '/static/icon/collect.png',
      aboutList: [],
      collecteds: []
    };
  },
  mounted() {
    this.axios
      .get("/api/getAboutVideo", {
        params: {
          id: this.$route.query.id
        }
      })
      .then(res => {
        this.aboutList = res.data.list;
        this.collecteds = res.data.collecteds
      });
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
  .liebiao {
    margin: 0 0 0.15rem 0rem;
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
}
</style>
