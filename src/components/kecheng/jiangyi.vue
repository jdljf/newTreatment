<template>
  <div class="jiangyi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">课件讲义</p>
    </div>
    <!-- <div class="box" ref="box" @click="changeControl">
      <div class="videoBox">
        <video
          src="/api/videos/20.mp4"
          class="bofang"
          ref="video"
          webkit-playsinline
          playsinline
          @timeupdate="timeUpdate"
        ></video>
      </div>

      <span @click="playOrPause" v-show="!isPlay" class="iconfont icon-cha1 play"></span>
      <div class="control" :class="{showControl: showControl}">
        <span class="time">{{currentTime}}</span>
        <div class="progress-body" ref="progress">
          <div
            @touchstart.stop="drawbarDown"
            @touchend.stop="drawbarUp"
            @touchmove.stop="drawbarMove"
            class="durationbar"
            ref="durationbar"
          >
            <div class="bufferbar" ref="bufferbar"></div>
            <div class="currentbar" ref="currentbar"></div>
            <div class="drawbar" ref="drawbar"></div>
          </div>
        </div>
        <span class="time">{{endTime}}</span>
        <span @click.stop="changeVolumnControl" class="iconfont icon-buoumaotubiao48 volume"></span>
        </div>
        <span @click="fullScreen" class="iconfont icon-quanping fullScreen"></span>
      </div>

      <div class="volume-body" v-show="showVolumnControl" ref="vDurationbar">
        <div
          @touchstart.stop="vDrawbarDown"
          @touchend.stop="vDrawbarUp"
          @touchmove.stop="vDrawbarMove"
          class="vDurationbar"
          ref="vDurationbar"
        >
          <div class="vCurrentbar" ref="vCurrentbar"></div>
          <div class="vDrawbar" ref="vDrawbar"></div>
        </div>
      </div>
    </div> -->
    <div class="neirong">
      <img class="tu" v-bind:src=" '/api' + handout.img " alt>
      <p class="xiangqing" v-for="content in handout.content">{{content}}</p>
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
      handout: {},
      isFullScreen: false,
      currentTime: "0:00",
      endTime: "",
      isPlay: false,
      showControl: false,
      progressDrag: false,
      soundDrage: false,
      soundPercent: 0,
      showVolumnControl: false
    };
  },
  mounted() {
    this.getHandout();
    this.$nextTick(() => {
      // this.$refs.video.load();
      // this.buffer()
      this.$refs.video.onloadedmetadata = e => {
        console.log(e);
        this.endTime = this.getTime(this.$refs.video.duration);
        this.buffer();
        this.updatesound(null, 35)
      };
      // this.timeUpdate()
    });
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
    // 时间少于10在前面补零
    // zeroFill(num) {
    //   if (num < 10) {
    //     num = "0" + num;
    //   }
    //   return num;
    // },
    // // 处理秒数为时分秒 h:m:s
    // getTime(num) {
    //   let m = this.zeroFill(Math.floor(num / 60)),
    //     s = this.zeroFill(Math.floor(num % 60)),
    //     h = this.zeroFill(Math.floor(m / 60)),
    //     time = "" + h + ":" + m + ":" + s + "";
    //   return time;
    // },
    // // 点击屏幕显示控制条或者播放
    // changeControl() {
    //   event.stopPropagation();
    //   console.log("点击了屏幕");

    //   if (!this.showControl) {
    //     this.showControl = true;
    //   } else if (this.showControl) {
    //     if (this.showVolumnControl) {
    //       this.showVolumnControl = false;
    //     } else {
    //       if (this.$refs.video.paused) {
    //         this.$refs.video.play();
    //         this.isPlay = true;
    //         this.showControl = false;
    //       } else {
    //         this.$refs.video.pause();
    //         this.isPlay = false;
    //       }
    //     }
    //   }

    //   return false;
    // },
    // // 播放或者暂停
    // playOrPause() {
    //   event.stopPropagation();
    //   console.log("点击了按钮");

    //   this.showControl = false;
    //   if (this.$refs.video.paused) {
    //     this.$refs.video.play();
    //     this.isPlay = true;
    //   } else {
    //     this.$refs.video.pause();
    //     this.isPlay = false;
    //     // this.buffer()
    //   }
    //   return false;
    // },
    // firstPoint(e) {
    //   return e.touches ? e.touches[0] : e;
    // },
    // drawbarDown(e) {
    //   // console.log(this.$refs.box.offsetTop);
    //   console.log(this.firstPoint(e).clientX);

    //   console.log(this.$refs.box.offsetLeft);
    //   this.progressDrag = true;
    //   if (!this.isFullScreen) {
    //     this.updateprogress(
    //       this.firstPoint(e).clientX - this.$refs.box.offsetLeft
    //     );
    //   } else if (this.isFullScreen) {
    //     this.updateprogress(
    //       this.firstPoint(e).clientY - this.$refs.box.offsetTop
    //     );
    //   }
    // },
    // drawbarUp(e) {
    //   if (this.progressDrag) {
    //     this.progressDrag = false;
    //     if (!this.isFullScreen) {
    //       this.updateprogress(
    //         this.firstPoint(e).clientX - this.$refs.box.offsetLeft
    //       );
    //     } else if (this.isFullScreen) {
    //       this.updateprogress(
    //         this.firstPoint(e).clientY - this.$refs.box.offsetTop
    //       );
    //     }
    //   }
    // },
    // drawbarMove(e) {
    //   this.progressDrag = false;
    //   if (!this.isFullScreen) {
    //     this.updateprogress(
    //       this.firstPoint(e).clientX - this.$refs.box.offsetLeft
    //     );
    //   } else if (this.isFullScreen) {
    //     this.updateprogress(
    //       this.firstPoint(e).clientY - this.$refs.box.offsetTop
    //     );
    //   }
    // },
    // updatesound(x, n) {
    //   console.log(this.$refs.vDurationbar.offsetTop);

    //   if (n) {
    //     this.soundPercent = n;
    //   } else {
    //     this.soundPercent =
    //       (100 * (x - this.$refs.vDurationbar.offsetTop)) /
    //       this.$refs.vDurationbar.offsetHeight;
    //   }
    //   if (this.soundPercent > 100) {
    //     this.soundPercent = 100;
    //   }
    //   if (this.soundPercent < 0) {
    //     this.soundPercent = 0;
    //   }
    //   this.$refs.vCurrentbar.style.height = (100 - this.soundPercent) + "%";
    //   this.$refs.vDrawbar.style.top = this.soundPercent + "%";
    //   // v.soundBar.style.width = soundPercent + "%";
    //   this.$refs.video.volume = (100 - this.soundPercent) / 100;
    // },
    // vDrawbarDown(e) {
    //   this.soundDrage = true;
    //   console.log(this.firstPoint(e).clientY);
    //   console.log(this.$refs.box);

    //   console.log(this.$refs.box.offsetTop);

    //   if (!this.isFullScreen) {
    //     this.updatesound(this.firstPoint(e).clientY - this.$refs.box.offsetTop);
    //   } else if (this.isFullScreen) {
    //     this.updateprogress(this.firstPoint(e).clientX - this.$refs.box.Left);
    //   }
    // },
    // vDrawbarUp(e) {
    //   if (this.soundDrag) {
    //     this.soundDrag = false;
    //     if (!this.isFullScreen) {
    //       this.updatesound(
    //         this.firstPoint(e).clientY - this.$refs.box.offsetTop
    //       );
    //     } else if (this.isFullScreen) {
    //       this.updateprogress(this.firstPoint(e).clientX - this.$refs.box.Left);
    //     }
    //   }
    // },
    // vDrawbarMove(e) {
    //   this.soundDrag = false;
    //   if (!this.isFullScreen) {
    //     this.updatesound(this.firstPoint(e).clientY - this.$refs.box.offsetTop);
    //   } else if (this.isFullScreen) {
    //     this.updateprogress(this.firstPoint(e).clientX - this.$refs.box.Left);
    //   }
    // },
    // updateprogress(x) {
    //   console.log("更新进度条");

    //   console.log(this.$refs.durationbar.offsetLeft);
    //   console.log(this.$refs.durationbar.offsetWidth);

    //   var percent =
    //     (100 * (x - this.$refs.durationbar.offsetLeft)) /
    //     this.$refs.durationbar.offsetWidth;
    //   console.log(percent);

    //   if (percent > 100) {
    //     percent = 100;
    //   }
    //   if (percent < 0) {
    //     percent = 0;
    //   }
    //   this.$refs.currentbar.style.width = percent + "%";
    //   this.$refs.drawbar.style.left = percent + "%";
    //   this.$refs.video.currentTime =
    //     (this.$refs.video.duration * percent) / 100;
    //   // this.$refs.drawbar = (v.video.duration * percent) / 100;
    // },
    // changeVolumnControl() {
    //   this.showVolumnControl = !this.showVolumnControl;
    // },
    // buffer() {
    //   let maxDuration = this.$refs.video.duration;
    //   let currentBuffer;
    //   if (this.$refs.video.buffered.length !== 0) {
    //     currentBuffer = this.$refs.video.buffered.end(0);
    //     let percent = (100 * currentBuffer) / maxDuration;
    //     this.$refs.bufferbar.style.width = percent + "%";
    //   }
    //   if (currentBuffer < maxDuration) {
    //     setTimeout(this.buffer, 500);
    //   }
    // },
    // timeUpdate(e) {
    //   let currentTime = e.target.currentTime;
    //   let duration = e.target.duration;
    //   let percent = (currentTime / duration) * 100;

    //   this.$refs.currentbar.style.width = percent + "%";

    //   this.currentTime = this.getTime(e.target.currentTime);

    //   if (this.currentTime == this.endTime) {
    //     // isPlay.className = "stop";
    //     this.isPlay = false;
    //   }
    // },
    // // 原生全屏
    // fullScreen(e) {
    //   event.stopPropagation();
    //   let itemHeight = document.documentElement.clientHeight;
    //   let itemWidth = document.documentElement.clientWidth;

    //   console.log(itemHeight);

    //   if (!this.isFullScreen) {
    //     this.$refs.box.style.transform = "rotate(90deg)";

    //     this.$refs.box.style.height = itemWidth + "px";
    //     this.$refs.box.style.width = itemHeight + "px";

    //     this.$refs.box.style["margin-left"] = "100%";
    //     this.isFullScreen = true;
    //   } else if (this.isFullScreen) {
    //     this.$refs.box.style.transform = "rotate(0deg)";

    //     this.$refs.box.style.height = "4rem";
    //     this.$refs.box.style.width = "100%";

    //     this.$refs.box.style["margin-left"] = "0";
    //     this.isFullScreen = false;
    //   }
    // },
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
  // overflow: auto;
  .box {
    position: relative;
    height: 4rem;
    transform-origin: left top;
    overflow: hidden;
    .videoBox {
      position: relative;
      z-index: -1;
      width: 100%;
      height: 100%;
      .bofang {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
      video::-webkit-media-controls {
        display: none !important;
      }
    }

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
      // z-index: 217483650;
    }
    .control {
      transition: bottom 0.5s linear 0s;
      -moz-transition: bottom 0.5s linear 0s;
      -webkit-transition: bottom 0.5s linear 0s;
      -o-transition: bottom 0.5s linear 0s;
      display: flex;
      position: absolute;
      left: 0;
      bottom: -1rem;
      width: 100%;
      background: rgba($color: #fff, $alpha: 0.5);
      padding: 0 0.2rem;
      font-size: 0.22rem;
      height: 1rem;
      box-sizing: border-box;
      // z-index: 217483650;
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
            transition: width 0.3s linear 0s;
            -moz-transition: width 0.3s linear 0s;
            -webkit-transition: width 0.3s linear 0s;
            -o-transition: width 0.3s linear 0s;
            position: absolute;
            top: 0;
            width: 0%;
            background: #333;
            height: 100%;
            border-radius: 0.1rem;
          }
          .currentbar {
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            background: #19e889;
            height: 100%;
            border-radius: 0.1rem;
            z-index: 5;
          }
          .drawbar {
            position: absolute;
            top: 50%;
            left: 0%;
            width: 0.3rem;
            height: 0.3rem;
            margin-left: -0.15rem;
            background: #fff;
            border-radius: 50%;
            z-index: 10;
            transform: translate(0, -50%);
            cursor: pointer;
          }
        }
      }
      .volumn-control {
        position: relative;
        // display: flex;
        // align-items: center;
        // justify-content: center;
      }

      .volume {
        margin: 0 0.2rem;
      }
    }
    .volume-body {
      position: absolute;
      box-sizing: border-box;
      width: 0.5rem;
      right: 0.6rem;
      bottom: 1.1rem;
      height: 1.2rem;
      padding: 0.2rem;
      background: rgba(255, 255, 255, 0.5);
      .vDurationbar {
        position: relative;
        width: 100%;
        border-radius: 0.1rem;
        height: 100%;
        background: #000;
        .vCurrentbar {
          position: absolute;
          /* top: 0; */
          bottom: 0;
          left: 0;
          width: 0%;
          background: #19e889;
          height: 100%;
          border-radius: 0.1rem;
          z-index: 5;
          width: 100%;
        }
        .vDrawbar {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -0.15rem;
          width: 0.3rem;
          height: 0.3rem;
          background: #fff;
          border-radius: 50%;
          z-index: 10;
          transform: translate(-50%, 0%);
          cursor: pointer;
        }
      }
    }
    .showControl {
      bottom: 0;
    }
  }
  .test {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    background: red;
    margin: 1rem;
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
