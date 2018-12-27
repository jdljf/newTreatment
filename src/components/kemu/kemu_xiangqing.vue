<template>
  <div class="kemu-xiangqing">
    <div class="shipin">
      <img src="../../assets/kecheng.png" alt>
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
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

      <div class="anniuBox">
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

      <div class="qupinlun">
        <input class="xiedian" type="text" placeholder="写点什么吧！">
        <i class="iconfont icon-buoumaotubiao48 icon">
          <span class="pinglunshu">124</span>
        </i>
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
      input: []
    };
  },
  activated(){
    this.$setgoindex()
    console.log('判断');
    
  },
  mounted() {
    console.log(this.$route.query.id);
    console.log(this.$route.query.index);
    this.getSubjectDetail();
    this.getSubjectComment();
    this.getSubAboutVideo();
  },
  methods: {
    huitui(){
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      }
      else {
        this.$router.back(-1)
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
      Object.keys(this.formAnswer).forEach((item, index) => {
        console.log(this.formAnswer[item]);

        if (this.formAnswer[item].length <= 0) {
          return (this.canSubmit = false);
        } else {
          this.canSubmit = true;
        }
      });

      if (!this.canSubmit) {
        return alert("还有问题没有回答，请回答完毕再提交");
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
    gotoComment() {},
    collect() {},
    share() {}
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
    img {
      width: 100%;
    }
    .icon {
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
      color: #fff;
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
    border-top: 1px solid #ccc;
    padding: 0.1rem 0.4rem 0.1rem 0.2rem;
    background: #fff;
    .xiedian {
      width: 80%;
      border: 0 none;
      background: #eee;
      color: #aaa;
      padding: 0.1rem 0.2rem;
      outline: none;
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
</style>
