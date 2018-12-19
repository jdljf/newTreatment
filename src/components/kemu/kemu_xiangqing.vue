<template>
  <div class="kemu-xiangqing">
    <div class="shipin">
      <img src="../../assets/kecheng.png" alt>
      <span class="iconfont icon-houtui icon"></span>
    </div>

    <div class="miaoshu">{{detail.describe}}</div>

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
          <div class="shuliang">{{detail.collection}}</div>
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
      <form style="background: #eee;">
        <ul>
          <li class="timu">
            <ul>
              <li class="wenti">我是可爱额提莫吗</li>
              <li class="xuanze">
                <input type="radio">
                <span>是额是额是额是额是额是额是额是额是额是额是额是额是额是额是额是额是额是额</span>
                <div class="daan">
                  <span>正确答案</span>
                  <span class="iconfont icon-icon-test1"></span>
                </div>
              </li>
              <li class="xuanze">
                <input type="radio">
                <span>不是</span>
                <div class="daan">
                  <span>正确答案</span>
                  <span class="iconfont icon-cha1"></span>
                </div>
              </li>
              <li class="xuanze">
                <input type="radio">
                <span>不知道</span>
              </li>
            </ul>
          </li>
          <li class="timu">
            <ul>
              <li class="wenti">shaungxuna</li>
              <li class="xuanze">
                <input type="checkbox">
                <span>s de</span>
                <div class="daan">
                  <span>正确答案</span>
                  <span class="iconfont icon-icon-test1"></span>
                </div>
              </li>
              <li class="xuanze">
                <input type="checkbox">
                <span>bushi</span>
              </li>
              <li class="xuanze">
                <input type="checkbox">
                <span>s buhzidao</span>
              </li>
            </ul>
          </li>
        </ul>

        <button type="submit" class="jiaojuan">交卷</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "kemu_xiangqing",
  data() {
    return {
      detail: {},
      comment: [],
      aboutList: [],
      istest: false
    };
  },
  mounted() {
    console.log(this.$route.query.id);
    console.log(this.$route.query.index);
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
    this.getSubjectComment();
    this.getSubAboutVideo();
  },
  methods: {
    gotoHandout() {
      this.$router.push({
        path: "/handout",
        query: { id: this.$route.query.id, index: this.$route.query.index }
      });
    },
    gotoTest() {
      this.istest = true;
    },
    gotoAboutVideo() {
      this.$router.push({
        path: "/relevant",
        query: { id: this.$route.query.id }
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
    form {
      overflow: hidden;
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
