<template>
  <div class="kemu-xiangqing">
    <div class="shipin">
      <img src="../../assets/kecheng.png" alt>
      <span class="iconfont icon-houtui icon"></span>
    </div>

    <div class="miaoshu">{{detail.describe}}</div>

    <div class="caozuo">
      <div class="caozuo-xiangqing">
        <div class="iconfont icon-guankan01 tubiao"></div>
        <div class="shuliang">{{detail.watched}}</div>
      </div>
      <div class="caozuo-xiangqing">
        <div class="iconfont icon-buoumaotubiao48 tubiao"></div>
        <div class="shuliang">{{detail.comment}}</div>
      </div>
      <div class="caozuo-xiangqing">
        <div class="iconfont icon-wenjianjia tubiao"></div>
        <div class="shuliang">{{detail.share}}</div>
      </div>
      <div class="caozuo-xiangqing">
        <div class="iconfont icon-fenxiang tubiao"></div>
        <div class="shuliang">{{detail.collection}}</div>
      </div>
    </div>

    <div class="anniuBox">
      <div class="anniu" @click="gotoHandout">课件讲义</div>
      <div class="anniu">立即测验</div>
    </div>

    <div class="xiangguan">
      <div class="toubu">
        <span class="zuo">相关视频</span>
        
        <i class="iconfont icon-qianjin"></i>
        <span class="you" @click="gotoAboutVideo">全部</span>
      </div>

      <div class="xiangguan-shipin">
        <div class="xiangguan-xiang">
          <img src="../../assets/kecheng.png" alt>
          <div class="jieshao">如何应对突然倒下的心脏骤停的危害</div>
          <div class="bofangliang">2333次播放</div>
        </div>
        <div class="xiangguan-xiang">
          <img src="../../assets/kecheng.png" alt>
          <div class="jieshao">如何应对突然倒下的心脏骤停的危害</div>
          <div class="bofangliang">2333次播放</div>
        </div>
        <div class="xiangguan-xiang">
          <img src="../../assets/kecheng.png" alt>
          <div class="jieshao">如何应对突然倒下的心脏骤停的危害</div>
          <div class="bofangliang">2333次播放</div>
        </div>
      </div>
    </div>

    <div class="pinglunqu">评论区</div>
    <div class="pinglunqu-xijie">
      <div class="pinglun-xijie">
        <div class="xijie">
          <img src="../../assets/logo.png" alt>
          <div class="yonghu">
            <div class="mingzi">妮可基德曼</div>
            <div class="shijian">5小时前</div>
            <div class="pinglun">广州白云天心制药股份有限公司真的真的真的很棒！</div>
          </div>
        </div>
      </div>
      <div class="pinglun-xijie">
        <div class="xijie">
          <img src="../../assets/logo.png" alt>
          <div class="yonghu">
            <div class="mingzi">妮可基德曼</div>
            <div class="shijian">5小时前</div>
            <div class="pinglun">广州白云天心制药股份有限公司真的真的真的很棒！</div>

            <div class="erjixijie">
              <img src="../../assets/logo.png" alt>
              <div class="yonghu">
                <div class="mingzi">妮可基德曼</div>
                <div class="shijian">5小时前</div>
                <div class="pinglun">广州白云天心制药股份有限公司真的真的真的很棒！</div>
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
</template>

<script>
export default {
  name: "kemu_xiangqing",
  data() {
    return {
      detail: {}
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
  },
  methods: {
    gotoHandout() {
      this.$router.push({
        path: "/handout",
        query: { id: this.$route.query.id, index: this.$route.query.index }
      });
    },
    gotoAboutVideo() {
      this.$router.push({
        path: "/relevant",
        query: { id: this.$route.query.id}
      });
    }
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
  }
  .caozuo {
    display: flex;
    margin: 0.2rem 0;
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
        display: flex;
        margin-left: 0.2rem;
        border-bottom: 1px solid #ccc;
        font-size: 0;
        padding: 0.2rem 0.2rem 0.2rem 0;
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
          .erjixijie {
            display: flex;
            font-size: 0;
            margin-right: -0.2rem;
            padding: 0.2rem 0.2rem 0.2rem 0.2rem;
            background: #eee;
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
        }
      }
    }
  }
  .pinglun-xijie {
    .xijie {
      display: flex;
      margin-left: 0.2rem;
      border-bottom: 1px solid #ccc;
      font-size: 0;
      padding: 0.2rem 0.2rem 0.2rem 0;
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
        .erjixijie {
          display: flex;
          font-size: 0;
          margin-right: -0.2rem;
          padding: 0.2rem 0.2rem 0.2rem 0.2rem;
          background: #eee;
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
