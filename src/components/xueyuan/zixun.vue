<template>
  <div class="zixun">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">咨询详情</p>
    </div>

    <div class="neirong">
      <img class="tu" src="../../assets/kecheng.png" alt>
      <p class="xiangqing" v-for="content in handout.content">{{content}}</p>
      <!-- <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p> -->
    </div>

    <div class="caozuo">
      <span class="left">
        <span class="fabuzhe">发布者:</span>
        <span class="zuozhe">{{detail.publisher}}</span>
      </span>
      <span class="right">
        <i class="iconfont icon-guankan01"></i>
        <span>{{detail.watched}}</span>
        <i class="iconfont icon-buoumaotubiao48"></i>
        <span>{{detail.comment}}</span>
        <i class="iconfont icon-fenxiang"></i>
        <span>{{detail.share}}</span>
      </span>
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
        <input v-model="videoComment" class="xiedian" type="text" placeholder="写点什么吧！">
        <span @click="sureAddComment" class="queding">确定</span>
        <!-- <i class="iconfont icon-buoumaotubiao48 icon">
          <span class="pinglunshu">124</span>
        </i>-->
      </div>
  </div>
</template>

<script>
export default {
  name: "zixun",
  data() {
    return {
      handout: {},
      detail: {},
      comment: [],
      videoComment: "",
    };
  },
  mounted(){
    this.getHandout()
    this.getSubjectDetail()
    this.getSubjectComment()
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
          console.log(this.detail);
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.zixun {
  position: relative;
  top: 0;
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
    overflow: scroll;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #aaa;
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
  .caozuo {
    display: flex;
    align-items: center;
    height: 0.8rem;
    padding: 0rem 0.2rem 0rem;
    color: #333;
    .left {
      flex: 1;
      font-size: 0.23rem;
      color: #aaa;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .zuozhe {
        color: #666;
      }
    }
    .right {
      text-align: right;
      justify-content: flex-end;
      i {
        font-size: 0.3rem;
        margin-right: 0.09rem;
        margin-left: 0.2rem;
        color: #aaa;
      }
      span {
        font-size: 0.23rem;
        color: #999;
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
          margin: 0 0 0.2rem 0;
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
          // margin-top: 0.2rem;
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
}
</style>
