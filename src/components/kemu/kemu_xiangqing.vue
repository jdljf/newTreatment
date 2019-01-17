<template>
  <div class="kemu-xiangqing" :class="{fixScreen: isFullScreen}">
    <div class="box" ref="box" @click="changeControl">
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

      <div class="shangci" v-if="canJumpPlay">
        您上次观看到{{this.lastWatchTime}}，
        <span @click="gotoLastWatchTime" class="tiaozhuan">点击跳转播放</span>
      </div>
      <!-- 暂停 -->
      <span @click="playOrPause" v-show="!isPlay" class="iconfont icon-cha1 play"></span>

      <div class="control" :class="{showControl: showControl}">
        <!-- 时间 -->
        <span class="time">{{currentTime}}</span>
        <!-- 播放时长 -->
        <div class="progress-body" ref="progress">
          <!-- 视频总长度 -->
          <div
            @touchstart.stop="drawbarDown"
            @touchend.stop="drawbarUp"
            @touchmove.stop.prevent="drawbarMove"
            class="durationbar"
            ref="durationbar"
          >
            <!-- 缓存进度条 -->
            <div class="bufferbar" ref="bufferbar"></div>
            <!-- 正在播放进度条 -->
            <div class="currentbar" ref="currentbar"></div>
            <div class="drawbar" ref="drawbar"></div>
          </div>
        </div>
        <span class="time">{{endTime}}</span>
        <!-- 音量 -->
        <!-- <div class="volumn-control"> -->
        <span @click.stop="changeVolumnControl" class="iconfont icon-buoumaotubiao48 volume"></span>
        <!-- </div> -->
        <!-- 全屏 -->
        <span @click="fullScreen" class="iconfont icon-quanping fullScreen"></span>
      </div>
      <!-- <div class="topControl"> -->
      <span @click.stop="huitui" v-show="showControl" class="iconfont icon-houtui icon"></span>
      <!-- </div> -->
      <div class="volume-body" v-show="showVolumnControl" ref="vDurationbar">
        <div
          @touchstart.stop="vDrawbarDown"
          @touchend.stop="vDrawbarUp"
          @touchmove.stop.prevent="vDrawbarMove"
          class="vDurationbar"
          ref="vDurationbar"
        >
          <div class="vCurrentbar" ref="vCurrentbar"></div>
          <div class="vDrawbar" ref="vDrawbar"></div>
        </div>
      </div>
    </div>

    <div class="miaoshu">{{detail.title}}</div>
    <div v-if="!istest">
      <div class="caozuo">
        <div class="caozuo-xiangqing">
          <div class="iconfont icon-guankan01 tubiao"></div>
          <div class="shuliang">{{detail.watched}}</div>
        </div>
        <div class="caozuo-xiangqing" @click="gotoComment">
          <div class="iconfont icon-buoumaotubiao48 tubiao"></div>
          <div class="shuliang">{{detail.comment}}</div>
        </div>
        <div class="caozuo-xiangqing" @click="collect">
          <div class="iconfont icon-wenjianjia tubiao"></div>
          <div class="shuliang">{{detail.collect}}</div>
        </div>
        <div class="caozuo-xiangqing" @click="share">
          <div class="iconfont icon-fenxiang tubiao"></div>
          <div class="shuliang">{{detail.share}}</div>
        </div>
      </div>

      <div class="anniuBox" v-if="canStudy == 1">
        <div class="anniu" @click="gotoHandout">课件讲义</div>
        <div class="anniu" @click="gotoTest">立即测验</div>
      </div>

      <div class="xiangguan">
        <div class="toubu">
          <span class="zuo">相关视频</span>
          
          <i class="iconfont icon-qianjin"></i>
          <span class="you" @click="gotoAboutVideo">全部</span>
        </div>

        <div class="xiangguan-shipin">
          <div class="xiangguan-xiang" v-for="aboutList in aboutList">
            <img src="../../assets/kecheng.png" alt>
            <div class="jieshao">{{aboutList.title}}</div>
            <div class="bofangliang">{{aboutList.watched}}次播放</div>
          </div>
        </div>
      </div>

      <div class="pinglunqu">评论区</div>
      <div class="pinglunqu-xijie">
        <div class="pinglun-xijie">
          <div class="xijie" v-for="comment in comment">
            <div class="pl" v-if="!comment.replyPerson">
              <img src="../../assets/logo.png" alt>
              <div class="yonghu" style="flex: 1;">
                <div class="mingzi">{{comment.commentName}}</div>
                <div class="shijian">5小时前</div>
                <div class="pinglun">{{comment.content}}</div>
              </div>
            </div>

            <div class="pl" v-if="comment.replyPerson">
              <img src="../../assets/logo.png" alt>
              <div class="yonghu" style="flex: 1;">
                <div class="mingzi">{{comment.commentName}}</div>
                <div class="shijian">5小时前</div>
                <div class="pinglun">{{comment.content}}</div>
              </div>
            </div>

            <div class="erjixijie" v-if="comment.replyPerson">
              <div class="erji" v-for="replyPerson in comment.replyPerson">
                <img src="../../assets/logo.png" alt>
                <div class="yonghu">
                  <div class="mingzi">{{replyPerson.replyName}}</div>
                  <div class="shijian">5小时前</div>
                  <div class="pinglun">{{replyPerson.content}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="qupinlun" v-show="!isFullScreen">
        <input v-model="videoComment" class="xiedian" type="text" placeholder="写点什么吧！">
        <span @click="sureAddComment" class="queding">确定</span>
        <!-- <i class="iconfont icon-buoumaotubiao48 icon">
          <span class="pinglunshu">124</span>
        </i>-->
      </div>
    </div>

    <div v-if="istest" class="ceyan">
      <div class="form">
        <ul>
          <li class="timu" v-for="(test, index) in test">
            <ul>
              <li class="wenti">{{test.question}}</li>
              <li class="xuanze" v-for="(answer, answerIndex) in test.answer">
                <input
                  v-bind:type="test.trueAnswer.length > 1 ? 'checkbox' : 'radio'"
                  v-bind:value="letter(answerIndex)"
                  v-model="checkedNames[`ans${index}`]"
                  @change="selectAns(answerIndex, index)"
                >
                <span>{{letter(answerIndex)}}.{{answer}}</span>
                <div class="daan">
                  <span
                    v-show="selectWord[`ans${index}`][answerIndex]"
                  >{{'正确答案' | errorMes(answerIndex, test.trueAnswer)}}</span>
                  <span
                    class="iconfont"
                    v-show="selectIcon[`ans${index}`][answerIndex]"
                  >{{'&#xe620;' | errorIcon('&#xe61a;', answerIndex, test.trueAnswer)}}</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <span class="jiaojuan" @click="submitAnswers">交卷</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "kemu_xiangqing",
  data() {
    return {
      detail: {},
      comment: [],
      aboutList: [],
      istest: false,
      test: [],
      checkedNames: {},
      formAnswer: {},
      canSubmit: false,
      selectWord: [],
      selectIcon: [],
      formData: [],
      trueCount: 0,
      answerRes: [],
      totalScore: 0,
      input: [],
      canStudy: 1,
      videoComment: "",
      storagePlayTime: [],
      exitVideoPlayTime: false,
      indexOfvideoId: "",
      canJumpPlay: false,
      lastWatchTime: "",
      storagePlayTimeLength: '',

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
  activated() {
    this.$setgoindex();
    console.log("判断");
  },
  mounted() {
    // for (let i = 0; i < 39; i++) {
    //   window.localStorage.removeItem('videoPlayTime')
    // }
    console.log(window.localStorage);

    console.log(this.$route.query.id);
    this.getSubjectDetail();
    this.getSubjectComment();
    this.getSubAboutVideo();
    this.canStudy = this.$route.query.canStudy;
    this.$nextTick(() => {
      // this.$refs.video.load();
      // this.buffer()
      this.$refs.video.onloadedmetadata = e => {
        this.endTime = this.getTime(this.$refs.video.duration);
        this.buffer();
        this.updatesound(null, 35);
      };
      // let aa = JSON.stringify([
      //   {
      //     videoId: this.$route.query.id,
      //     playTime: "00:00:10"
      //   }
      // ]);
      // window.localStorage.setItem('videoPlayTime', aa)
      // window.localStorage.removeItem('videoPlayTime')
      // console.log(window.localStorage);

      // let bb = window.localStorage.getItem('videoPlayTime')
      // console.log(bb);

      if (!window.localStorage) {
        this.$messagebox.alert("您的设备不支持localStorage");
      } else {
        let storage = window.localStorage;

        let storageData = JSON.parse(storage.getItem("videoPlayTime"));
        console.log(storageData);
        if (storageData !== null) {
          console.log("有sotrage");
          this.storagePlayTime = [];
          this.exitVideoPlayTime = storageData.some( (item, index, storageData) => {
            
            // return item.videoId == '5c22d77b14e8c218542299b9'
            return item.videoId == this.$route.query.id
          });
          console.log(this.exitVideoPlayTime);

          if (this.exitVideoPlayTime) {
            console.log('存在');
            
            this.indexOfvideoId = this.findIndexByKeyValue(
              storageData,
              "videoId",
              this.$route.query.id
            );

            console.log(storageData[this.indexOfvideoId].playTime);

            this.lastWatchTime = storageData[this.indexOfvideoId].playTime;
            this.canJumpPlay = true;

            this.storagePlayTime = storageData;
            this.storagePlayTimeLength = this.storagePlayTime.length
            // this.$refs.video.currentTime = this.storagePlayTime[indexOfvideoId].playTime
          } else if (!this.exitVideoPlayTime) {
            console.log('不存在');
            
            this.storagePlayTime = storageData;
            this.storagePlayTimeLength = this.storagePlayTime.length
          }
        } else {
          console.log("没storage");

          this.exitVideoPlayTime = false;
          this.canJumpPlay = false;
          this.storagePlayTime = [];
          this.storagePlayTimeLength = 0;
        }
      }
      // this.timeUpdate()
    });
  },
  methods: {
    zeroFill(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    // 处理秒数为时分秒 h:m:s
    getTime(num) {
      let m = this.zeroFill(Math.floor(num / 60)),
        s = this.zeroFill(Math.floor(num % 60)),
        h = this.zeroFill(Math.floor(m / 60)),
        time = "" + h + ":" + m + ":" + s + "";
      return time;
    },
    // 点击屏幕显示控制条或者播放
    changeControl() {
      event.stopPropagation();
      console.log("点击了屏幕");

      if (!this.showControl) {
        this.showControl = true;
      } else if (this.showControl) {
        if (this.showVolumnControl) {
          this.showVolumnControl = false;
        } else {
          if (this.$refs.video.paused) {
            this.$refs.video.play();
            this.isPlay = true;
            this.showControl = false;
          } else {
            this.$refs.video.pause();
            this.isPlay = false;
          }
        }
      }

      return false;
    },
    // 播放或者暂停
    playOrPause() {
      event.stopPropagation();
      console.log("点击了按钮");

      this.showControl = false;
      if (this.$refs.video.paused) {
        this.$refs.video.play();
        this.isPlay = true;
      } else {
        this.$refs.video.pause();
        this.isPlay = false;
        // this.buffer()
      }
      return false;
    },
    firstPoint(e) {
      return e.touches ? e.touches[0] : e;
    },
    drawbarDown(e) {
      // console.log(this.$refs.box.offsetTop);
      console.log(this.firstPoint(e).clientX);

      console.log(this.$refs.box.offsetLeft);
      this.progressDrag = true;
      if (!this.isFullScreen) {
        this.updateprogress(
          this.firstPoint(e).clientX - this.$refs.box.offsetLeft
        );
      } else if (this.isFullScreen) {
        this.updateprogress(
          this.firstPoint(e).clientY - this.$refs.box.offsetTop
        );
      }
    },
    drawbarUp(e) {
      if (this.progressDrag) {
        this.progressDrag = false;
        if (!this.isFullScreen) {
          this.updateprogress(
            this.firstPoint(e).clientX - this.$refs.box.offsetLeft
          );
        } else if (this.isFullScreen) {
          this.updateprogress(
            this.firstPoint(e).clientY - this.$refs.box.offsetTop
          );
        }
      }
    },
    drawbarMove(e) {
      this.progressDrag = false;
      if (!this.isFullScreen) {
        this.updateprogress(
          this.firstPoint(e).clientX - this.$refs.box.offsetLeft
        );
      } else if (this.isFullScreen) {
        this.updateprogress(
          this.firstPoint(e).clientY - this.$refs.box.offsetTop
        );
      }
    },
    updatesound(x, n) {
      console.log(this.$refs.vDurationbar.offsetTop);

      if (n) {
        this.soundPercent = n;
      } else {
        this.soundPercent =
          (100 * (x - this.$refs.vDurationbar.offsetTop)) /
          this.$refs.vDurationbar.offsetHeight;
      }
      if (this.soundPercent > 100) {
        this.soundPercent = 100;
      }
      if (this.soundPercent < 0) {
        this.soundPercent = 0;
      }
      this.$refs.vCurrentbar.style.height = 100 - this.soundPercent + "%";
      this.$refs.vDrawbar.style.top = this.soundPercent + "%";
      // v.soundBar.style.width = soundPercent + "%";
      this.$refs.video.volume = (100 - this.soundPercent) / 100;
    },
    vDrawbarDown(e) {
      this.soundDrage = true;
      console.log(this.firstPoint(e).clientY);
      console.log(this.$refs.box);

      console.log(this.$refs.box.offsetTop);

      if (!this.isFullScreen) {
        this.updatesound(this.firstPoint(e).clientY - this.$refs.box.offsetTop);
      } else if (this.isFullScreen) {
        this.updateprogress(this.firstPoint(e).clientX - this.$refs.box.Left);
      }
    },
    vDrawbarUp(e) {
      if (this.soundDrag) {
        this.soundDrag = false;
        if (!this.isFullScreen) {
          this.updatesound(
            this.firstPoint(e).clientY - this.$refs.box.offsetTop
          );
        } else if (this.isFullScreen) {
          this.updateprogress(this.firstPoint(e).clientX - this.$refs.box.Left);
        }
      }
    },
    vDrawbarMove(e) {
      this.soundDrag = false;
      if (!this.isFullScreen) {
        this.updatesound(this.firstPoint(e).clientY - this.$refs.box.offsetTop);
      } else if (this.isFullScreen) {
        this.updateprogress(this.firstPoint(e).clientX - this.$refs.box.Left);
      }
    },
    updateprogress(x) {
      console.log("更新进度条");

      console.log(this.$refs.durationbar.offsetLeft);
      console.log(this.$refs.durationbar.offsetWidth);

      var percent =
        (100 * (x - this.$refs.durationbar.offsetLeft)) /
        this.$refs.durationbar.offsetWidth;
      console.log(percent);

      if (percent > 100) {
        percent = 100;
      }
      if (percent < 0) {
        percent = 0;
      }
      this.$refs.currentbar.style.width = percent + "%";
      this.$refs.drawbar.style.left = percent + "%";
      this.$refs.video.currentTime =
        (this.$refs.video.duration * percent) / 100;
      // this.$refs.drawbar = (v.video.duration * percent) / 100;
    },
    changeVolumnControl() {
      this.showVolumnControl = !this.showVolumnControl;
    },
    buffer() {
      let maxDuration = this.$refs.video.duration;
      let currentBuffer;
      if (this.$refs.video.buffered.length !== 0) {
        currentBuffer = this.$refs.video.buffered.end(0);
        let percent = (100 * currentBuffer) / maxDuration;
        this.$refs.bufferbar.style.width = percent + "%";
      }
      if (currentBuffer < maxDuration) {
        setTimeout(this.buffer, 500);
      }
    },
    findIndexByKeyValue(arraytosearch, key, valuetosearch) {
      for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
          return i;
        }
      }
      return -1;
    },
    timeUpdate(e) {
      console.log("wwww");

      let currentTime = e.target.currentTime;
      let duration = e.target.duration;
      let percent = (currentTime / duration) * 100;

      this.$refs.currentbar.style.width = percent + "%";

      this.currentTime = this.getTime(e.target.currentTime);

      if (this.currentTime == this.endTime) {
        // isPlay.className = "stop";
        this.isPlay = false;
      }
      let storage = window.localStorage;

      if (this.exitVideoPlayTime) {
        

        this.storagePlayTime[this.indexOfvideoId].playTime = this.currentTime;
        let playTimeArr = JSON.stringify(this.storagePlayTime);
// console.log(playTimeArr);
        window.localStorage.setItem("videoPlayTime", playTimeArr);
      } 
      else {
        console.log(this.storagePlayTime);

        // this.storagePlayTime.push({
        //   videoId: this.detail._id,
        //   playTime: this.currentTime
        // });
        let length = this.storagePlayTime.length
        this.storagePlayTime[this.storagePlayTimeLength] = {
          videoId: this.detail._id,
          playTime: this.currentTime
        }

        let playTimeArr = JSON.stringify(this.storagePlayTime);
        console.log(playTimeArr);

        window.localStorage.setItem("videoPlayTime", playTimeArr);
      }
    },
    // 原生全屏
    fullScreen(e) {
      event.stopPropagation();
      let itemHeight = document.documentElement.clientHeight;
      let itemWidth = document.documentElement.clientWidth;

      console.log(itemHeight);

      if (!this.isFullScreen) {
        this.$refs.box.style.transform = "rotate(90deg)";

        this.$refs.box.style.height = itemWidth + "px";
        this.$refs.box.style.width = itemHeight + "px";

        this.$refs.box.style["margin-left"] = "100%";
        this.isFullScreen = true;
      } else if (this.isFullScreen) {
        this.$refs.box.style.transform = "rotate(0deg)";

        this.$refs.box.style.height = "4rem";
        this.$refs.box.style.width = "100%";

        this.$refs.box.style["margin-left"] = "0";
        this.isFullScreen = false;
      }
    },
    gotoHandout() {
      this.$router.push({
        path: "/handout",
        query: { id: this.$route.query.id, index: this.$route.query.index }
      });
    },
    gotoTest() {
      this.istest = true;
      this.axios
        .get("/api/getTest", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          // this.comment = res.data.comment.comment;
          let testData = res.data.test.test;

          for (let i = 0; i < testData.length; i++) {
            if (typeof testData.trueAnswer === "string") {
              testData[i].trueAnswer = testData[i].trueAnswer.split(",");
            }
            testData[i].trueAnswer = testData[i].trueAnswer
              .map(function(opt, index) {
                return opt;
              })
              .sort();

            Vue.set(this.checkedNames, `ans${i}`, []);
            Vue.set(this.formAnswer, `ans${i}`, []);
            console.log(this.checkedNames);

            if (testData[i].trueAnswer) {
              let arr = [];
              let arr1 = [];
              for (let j = 0; j < testData[i].answer.length; j++) {
                arr.push(false);
                arr1.push(false);
              }
              Vue.set(this.selectWord, `ans${i}`, arr);
              Vue.set(this.selectIcon, `ans${i}`, arr1);
            }
          }

          this.test = testData;
          console.log(this.test);
        });
    },
    seeResult() {
      console.log(this.checkedNames);
      Object.keys(this.checkedNames).forEach((item, index) => {
        if (this.checkedNames[item].length <= 0) {
          return (this.canSubmit = false);
        } else {
          this.formAnswer.push(this.checkedNames[item]);
          return (this.canSubmit = true);
        }
      });

      if (!this.canSubmit) {
        return alert("还有问题没有回答，请回答完毕再查看");
      }

      console.log(this.formAnswer);

      this.formAnswer.forEach((item, index) => {});
    },
    selectAns(ansIndex, queIndex) {
      let i = parseInt(ansIndex);
      //       console.log(this.checkedNames);
      // console.log(typeof this.checkedNames);
      if (!(this.checkedNames[`ans${queIndex}`] instanceof Array)) {
        // console.log(this.checkedNames[`ans${queIndex}`]);
        // console.log(typeof this.checkedNames[`ans${queIndex}`]);

        if (
          this.checkedNames[`ans${queIndex}`].length ==
          this.test[queIndex].trueAnswer.length
        ) {
          // console.log(this.checkedNames[`ans${queIndex}`]);

          if (
            this.checkedNames[`ans${queIndex}`]
              .split(",")
              .sort()
              .join(",") == this.test[queIndex].trueAnswer.sort().join(",")
          ) {
            console.log("全正确");
            console.log(this.checkedNames[`ans${queIndex}`]);
            this.formAnswer[`ans${queIndex}`].push(
              this.checkedNames[`ans${queIndex}`]
            );
            console.log(this.formAnswer);
            this.selectIcon[`ans${queIndex}`][ansIndex] = true;
            this.totalScore =
              this.totalScore + parseInt(this.test[queIndex].fraction);
            this.trueCount += 1;
          } else {
            this.selectWord[`ans${queIndex}`][ansIndex] = true;
            this.selectIcon[`ans${queIndex}`][ansIndex] = true;
          }
        }
      } else if (this.checkedNames[`ans${queIndex}`] instanceof Array) {
        if (
          this.checkedNames[`ans${queIndex}`].length ===
          this.test[queIndex].trueAnswer.length
        ) {
          if (
            this.checkedNames[`ans${queIndex}`].sort().join(",") ==
            this.test[queIndex].trueAnswer.sort().join(",")
          ) {
            console.log(`quandui`);

            for (let k = 0; k < this.test[queIndex].trueAnswer.length; k++) {
              let z = this.checkedNames[`ans${queIndex}`][k].charCodeAt() - 65;

              // console.log(z.charCodeAt() - 65)
              // 如果选的答案和正确答案有相同

              // 各种操作
              this.selectWord[`ans${queIndex}`][z] = false;
              this.selectIcon[`ans${queIndex}`][z] = true;
              console.log(this.selectIcon);
              this.formAnswer[`ans${queIndex}`] = this.checkedNames[
                `ans${queIndex}`
              ];
            }
            this.totalScore =
              this.totalScore + parseInt(this.test[queIndex].fraction);
            this.trueCount += 1;
          } else {
            for (let k = 0; k < this.test[queIndex].trueAnswer.length; k++) {
              let z = this.checkedNames[`ans${queIndex}`][k].charCodeAt() - 65;

              // console.log(z.charCodeAt() - 65)
              // 如果选的答案和正确答案有相同

              // 各种操作
              this.selectWord[`ans${queIndex}`][z] = true;
              this.selectIcon[`ans${queIndex}`][z] = true;
              console.log(this.selectIcon);
              this.formAnswer[`ans${queIndex}`] = this.checkedNames[
                `ans${queIndex}`
              ];
            }
          }
        }
      }
      console.log(this.formAnswer);
      console.log(this.trueCount);
      console.log(this.totalScore);
    },
    submitAnswers() {
      for (let item in this.checkedNames) {
        if (this.checkedNames[item].length <= 0) {
          return this.$messagebox.alert("还有问题没有回答，请回答完毕再提交");
        }
      }

      let query = {
        formAnswer: this.formAnswer,
        trueCount: this.trueCount,
        answerRes: this.answerRes,
        totalScore: this.totalScore
      };
      console.log(query);
      console.log(this.formAnswer);

      // this.$router.push({ path: "/testResult", query: query });
      this.axios
        .post("/api/submitTestAnswers", {
          videoId: this.$route.query.id,
          formAnswer: this.formAnswer,
          trueCount: this.trueCount,
          answerRes: this.answerRes,
          totalScore: this.totalScore
        })
        .then(res => {
          if (res.data.err_code === 500) {
            return alert(res.data.message);
          }
          console.log(res.data);

          let query = {
            totalScore: this.totalScore,
            trueCount: this.trueCount,
            message: res.data.message
          };
          return this.$router.push({ path: "/testResult", query: query });
        });
    },
    gotoAboutVideo() {
      this.$router.push({
        path: "/relevant",
        query: { id: this.$route.query.id }
      });
    },
    getSubjectDetail() {
      console.log(this.$route.query);

      this.axios
        .get("/api/getSubjectDetail", {
          params: {
            index: this.$route.query.index,
            id: this.$route.query.id
          }
        })
        .then(res => {
          this.detail = res.data.detail;
          console.log(res.data);
        });
    },
    getSubAboutVideo() {
      this.axios
        .get("/api/getSubAboutVideo", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          this.aboutList = res.data.list;
        });
    },
    getSubjectComment() {
      this.axios
        .get("/api/getSubjectComment", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          this.comment = res.data.comment.comment;
          console.log(this.comment);
        });
    },
    sureAddComment() {
      if (this.videoComment.replace(/^\s+|\s+$/g, "").length <= 0) {
        return this.$messagebox.alert("请输入评论");
      }

      this.axios
        .post("/api/sureAddVideoComment", {
          videoId: this.$route.query.id,
          personComment: this.videoComment
        })
        .then(res => {
          if (res.data.err_code !== 500) {
            this.$messagebox.alert(res.data.message).then(() => {
              location.reload();
            });
          }
        });
    },
    gotoComment() {},
    collect() {},
    share() {},
    gotoLastWatchTime() {
      let timeArr = this.lastWatchTime.split(':')
      // console.log(parseInt('05')*60);
      let sumTime = 0
      // sumTime = (1 *3600) + (29*60) + 8
      sumTime = (parseInt(timeArr[0]) * 3600) + (parseInt(timeArr[1]) * 60) + parseInt(timeArr[2])
      console.log(sumTime);
      
      this.$refs.video.currentTime = sumTime;
      this.canJumpPlay = false;
      this.$refs.video.play()
      this.isPlay = true
    },
    huitui() {
      if (this.$route.query.goindex === "true") {
        this.$router.push("/");
      } else {
        this.$router.back(-1);
      }
    }
  },
  filters: {
    errorMes: function(str, index, trueAnswer) {
      let i = String.fromCharCode(65 + index);

      if (trueAnswer.indexOf(i) < 0) {
        return "错误答案";
      } else {
        return str;
      }
    },
    errorIcon: function(str, erric, index, trueAnswer) {
      let i = String.fromCharCode(65 + index);

      if (trueAnswer.indexOf(i) < 0) {
        return erric;
      } else {
        return str;
      }
    }
  },
  computed: {
    letter: function() {
      return function(index) {
        return String.fromCharCode(65 + index);
      };
    }
  },
  watch: {
    // checkedNames: {
    //   deep: true,
    //   handler: function(newVal, oldVal) {
    //     console.log(newVal);
    //     // console.log(this.test[0].trueAnswe[0]);
    //     // for (let i = 0; i < this.test.length; i++) {
    //     //   console.log(newVal.ans1);
    //     //   console.log(this.test[1].trueAnswer);
    //     //   console.log(this.test[1].trueAnswer.indexOf("0"));
    //     //   console.log(this.test[1].trueAnswer.indexOf(newVal.ans0));
    //     //   // if (typeof newVal.ans0 === "number") {
    //     //   //   var kk = parseInt(newVal[`ans0`]);
    //     //   //   console.log(this.test[1].trueAnswer.indexOf(kk));
    //     //   // }
    //     //   // console.log(this.test[0].trueAnswer.indexOf(parseInt(newVal[`ans${0}`])));
    //     // }
    //     for (let i = 0; i < this.test.length; i++) {
    //       for (let j = 0; j < this.test[i].trueAnswer.length; j++) {
    //         // console.log(this.test[i].trueAnswer[j]);
    //         if (typeof newVal[`ans${i}`] === "number") {
    //           // console.log(newVal[`ans${i}`]);
    //           // console.log(this.test[i].trueAnswer);
    //           if (this.test[i].trueAnswer.indexOf(newVal[`ans${i}`]) >= 0) {
    //             console.log("答案正确");
    //           } else {
    //             console.log(newVal[`ans${i}`]);
    //           }
    //         }
    //         if (newVal[`ans${i}`] instanceof Array) {
    //           for (let k = 0; k < newVal[`ans${i}`].length; k++) {
    //             if (
    //               newVal[`ans${i}`].length >= 2 &&
    //               this.test[i].trueAnswer.indexOf(newVal[`ans${i}`][k]) >= 0
    //             ) {
    //               console.log("答案正确");
    //             } else {
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.kemu-xiangqing {
  .shipin {
    position: relative;
    height: 4rem;
    img {
      width: 100%;
    }
    .bofang {
      width: 100%;
      height: 100%;
    }
  }
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
    .shangci {
      position: absolute;
      top: 30%;
      color: #ccc;
      text-align: center;
      width: 100%;
      font-size: 0.26rem;
      .tiaozhuan {
        display: inline-block;
        color: #19e889;
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

    .icon {
      position: absolute;
      top: 0rem;
      left: 0rem;
      padding: 0.2rem 0.2rem 0.2rem 0.2rem;
      color: #fff;
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
  .miaoshu {
    padding: 0rem 0.2rem;
    font-size: 0.28rem;
    margin-bottom: 0.2rem;
  }
  .caozuo {
    display: flex;
    margin: 0rem 0 0.2rem 0;
    .caozuo-xiangqing {
      flex: 1;
      text-align: center;
      .tubiao {
        font-size: 0.4rem;
      }
      .shuliang {
        color: #ccc;
        font-size: 0.25rem;
      }
    }
  }
  .anniuBox {
    display: flex;
    padding: 0.3rem 0.7rem;
    border-bottom: 3px solid #eee;
    .anniu {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      box-sizing: border-box;
      border: 1px solid #1199ee;
      height: 0.8rem;
      border-radius: 3px;
      font-size: 0.26rem;
    }
    .anniu:nth-child(1) {
      margin-right: 1rem;
      color: #19e889;
    }
    .anniu:nth-child(2) {
      background: #19e889;
      color: #fff;
    }
  }
  .xiangguan {
    padding: 0.2rem 0.2rem 0.2rem;
    .toubu {
      padding: 0rem 0 0.2rem 0;
      font-size: 0.26rem;
      .zuo {
        font-weight: 600;
      }
      i {
        float: right;
      }
      .you {
        float: right;
        padding-right: 4px;
      }
    }
    .xiangguan-shipin {
      display: flex;
      .xiangguan-xiang {
        flex: 1;
        img {
          width: 100%;
        }
        .jieshao {
          font-size: 0.26rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
          -webkit-line-clamp: 2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
          margin: 0.1rem 0;
        }
        .bofangliang {
          font-size: 0.2rem;
          color: #aaa;
        }
      }
      .xiangguan-xiang:nth-child(2) {
        margin: 0 0.1rem;
      }
    }
  }
  .pinglunqu {
    height: 0.7rem;
    font-size: 0.23rem;
    line-height: 0.9rem;
    color: #aaa;
    background: #eee;
    padding: 0 0.2rem;
  }
  .pinglunqu-xijie {
    margin-bottom: 1rem;
    .pinglun-xijie {
      .xijie {
        // display: flex;
        margin-left: 0.2rem;
        border-bottom: 1px solid #ccc;
        font-size: 0;
        padding: 0.2rem 0.2rem 0.2rem 0;
        .pl {
          display: flex;

          // padding: 0.2rem 0;
          img {
            width: 0.55rem;
            height: 0.55rem;
            border-radius: 50%;
            margin-right: 0.2rem;
          }
          .yonghu {
            flex: 1;
            .mingzi {
              font-size: 0.25rem;
              color: #aaa;
            }
            .shijian {
              font-size: 0.2rem;
              color: #aaa;
            }
            .pinglun {
              margin-top: 0.1rem;
              font-size: 0.3rem;
            }
          }
        }
        .erjixijie {
          font-size: 0;
          margin-top: 0.2rem;
          margin-left: 0.75rem;
          margin-right: -0.2rem;
          background: #eee;
          .erji {
            display: flex;
            padding: 0.2rem 0.2rem 0.2rem 0;
            margin-left: 0.2rem;
            border-bottom: 1px solid #aaa;
            img {
              width: 0.55rem;
              height: 0.55rem;
              border-radius: 50%;
              margin-right: 0.2rem;
              // border: 1px solid #ccc;
            }
            .yonghu {
              flex: 1;
              .mingzi {
                font-size: 0.25rem;
                color: #aaa;
              }
              .shijian {
                font-size: 0.2rem;
                color: #aaa;
              }
              .pinglun {
                margin-top: 0.1rem;
                font-size: 0.3rem;
              }
            }
          }
          .erji:last-child {
            border: 0 none;
          }
        }
      }
    }
  }
  .pinglun-xijie:last-child {
    margin-bottom: 1.5rem;
  }
  .qupinlun {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.88rem;
    border-top: 1px solid #ccc;
    padding: 0.1rem 0.2rem 0.1rem 0.2rem;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    .xiedian {
      // width: 80%;
      // border: 0 none;
      // background: #eee;
      // color: #aaa;
      // padding: 0.1rem 0.2rem;
      // outline: none;
      flex: 1;
      height: 100%;
      background: #eee;
      outline: none;
      border: none;
      box-sizing: border-box;
      font-size: 0.2rem;
      padding: 0 0 0 0.15rem;
    }
    .queding {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.9rem;
      font-size: 0.25rem;
      color: #19e889;
      // background: #ccc;
    }
    .icon {
      position: relative;
      float: right;
      font-size: 0.4rem;
      .pinglunshu {
        position: absolute;
        background: #fff;
        right: -0.2rem;
        z-index: 100;
        font-size: 0.2rem;
        color: #f00;
      }
    }
  }
  .ceyan {
    .form {
      overflow: hidden;
      background: #eee;
      ul {
        overflow: hidden;
        .timu {
          margin-top: 0.3rem;
          background: #fff;
          ul {
            .wenti {
              border-bottom: 1px solid #ccc;
              overflow: hidden;
              padding: 0.15rem 0.2rem 0.15rem 0.2rem;
            }
            .xuanze {
              border-bottom: 1px solid #ccc;
              overflow: hidden;
              padding: 0.15rem 0.2rem 0.15rem 0.2rem;
              .daan {
                float: right;
              }
            }
          }
        }
      }
      .jiaojuan {
        display: block;
        width: 40%;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #19e889;
        text-align: center;
        color: #fff;
        font-size: 0.28rem;
        margin: 0.6rem auto;
        border: none;
        outline: none;
        border-radius: 4px;
      }
    }
  }
}
.fixedscreen {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
