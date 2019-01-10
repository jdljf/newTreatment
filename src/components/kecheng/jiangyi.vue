<template>
  <div class="jiangyi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">课件讲义</p>
    </div>

    <div class="box">
      <video src="/api/videos/20.mp4" class="bofang"></video>
      <!-- 暂停 -->
      <span class="iconfont icon-cha1 play"></span>

      <div class="control">
        <!-- 时间 -->
        <span class="time">0:00</span>
        <!-- 播放时长 -->
        <div class="progress-body">
          <!-- 视频总长度 -->
          <div class="durationbar">
            <!-- 缓存进度条 -->
            <div class="bufferbar"></div>
            <!-- 正在播放进度条 -->
            <div class="currentbar"></div>
            <div class="drawbar"></div>
          </div>
        </div>
        <span class="time">10:00</span>
        <!-- 音量 -->
        <span class="iconfont icon-buoumaotubiao48 volume"></span>
        <!-- 全屏 -->
        <span class="iconfont icon-quanping fullScreen"></span>
      </div>
    </div>

    <!-- <div class="neirong">
      <img class="tu" v-bind:src=" '/api' + handout.img " alt>
      <p class="xiangqing" v-for="content in handout.content">{{content}}</p>
    </div>

    <div class="xiazai">
      <div class="anniu">下载讲义</div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "jiangyi",
  data() {
    return {
      handout: {}
    };
  },
  mounted() {
    this.getHandout();
  },
  methods: {
    getHandout() {
      this.axios
        .get("/api/getHandout", {
          params: {
            id: this.$route.query.id
            // index: this.$route.query.index
          }
        })
        .then(res => {
          this.handout = res.data.handout;
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
  overflow: auto;
  .box {
    position: relative;
    height: 4rem;
    .play {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // margin:
      background: rgba(#ccc, 0.2);
      color: #fff;
      text-align: center;
      line-height: 0.8rem;
    }
    .bofang {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
    .control {
      display: flex;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: rgba($color: #fff, $alpha: 0.5);
      padding: 0 0.2rem;
      font-size: 0.22rem;
      height: 1rem;
      box-sizing: border-box;
      .time,
      .volume,
      .fullScreen {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .progress-body {
        flex: 1;
        margin: 0 0.3rem;
        display: flex;
        align-items: center;
        .durationbar {
          position: relative;
          width: 100%;
          height: 0.07rem;
          background: #000;
          border-radius: 0.1rem;
          .bufferbar {
            position: absolute;
            top: 0;
            width: 50%;
            background: #333;
            height: 100%;
            border-radius: 0.1rem;
          }
          .currentbar {
            position: absolute;
            top: 0;
            left: 0;
            width: 25%;
            background: #19e889;
            height: 100%;
            border-radius: 0.1rem;
            z-index: 5;
          }
          .drawbar {
            position: absolute;
            top: 50%;
            width: 0.3rem;
            height: 0.3rem;
            background: #fff;
            border-radius: 50%;
            z-index: 5;
            transform: translate(0, -50%);
          }
        }
      }
      .volume {
        margin: 0 0.2rem;
      }
    }
  }

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
    padding: 0.2rem;
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
    position: relative;
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
      background: #19e889;
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
      border-radius: 4px;
    }
  }
}
</style>
