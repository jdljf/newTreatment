<template>
  <div class="xiaoxi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">我的消息</p>
    </div>
    <div v-if="noData" class="noData">暂时没有数据</div>
    <ul class="liebiao">
      <li
        @click="gotoMessageDetail(index)"
        v-for="(message, index) in message"
        class="liebiao-xiang"
      >
        <i class="tu iconfont icon-ling ling zuo"></i>
        <div class="zhong">
          <div class="biaoti">{{message_type(message.messageType)}}</div>
          <div class="xiangxi">{{message.summary}}</div>
        </div>
        <div class="you">
          <span class="dian" v-if="!message.watched"></span>
          <i class="iconfont iconfont icon-qianjin qianjin"></i>
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
  name: "xiaoxi",
  data() {
    return {
      checkedindex: "",
      message: [],
      pageNum: 1,
      pageSize: 4,
      busy: false,
      noData: false,
      noNewData: false,
      loadText: "加载中"
    };
  },
  computed: {
    message_type() {
      return function(opt) {
        if (parseInt(opt) === 0) {
          return "系统消息";
        } else if (parseInt(opt) === 1) {
          return "课程消息";
        }
      };
    }
  },
  mounted() {
    this.getMoreSubject()
  },
  methods: {
    loadMore: function() {
      this.busy = true;
      let that = this;
      setTimeout(() => {
        this.pageNum++;
        this.getMoreSubject();
        //  this.busy = false
      }, 2000);
    },
    getMoreSubject() {
      this.axios
        .get("/api/getMyMessage", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          console.log(res.data);
          if (this.pageNum == 1 && res.data.message <= 0) {
            this.busy = true;
            this.noData = true;
          } else if (this.pageNum > 1 && res.data.message <= 0) {
            (this.busy = true), 
            (this.noNewData = true);
            this.loadText = "没有更多数据了";
            this.pageNum = 0;
          } else {
            this.busy = false;
            this.message.push(...res.data.message);
            console.log(this.message);            
          }
        });
    },
    gotoMessageDetail(index) {
      this.$router.push({
        path: "/messageDetail",
        query: {
          messageId: this.message[index]._id,
          message_type: this.message[index].messageType
        }
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
.xiaoxi {
  position: relative;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    border-bottom: 2px solid #f1f1f1;
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
    padding: 0 0 0.15rem 0.2rem;
    background: #fff;
    .liebiao-xiang {
      display: flex;
      align-items: center;
      padding: 0.23rem 0.2rem 0.23rem 0;
      border-bottom: 1px solid #f1f1f1;
      .zuo {
        width: 0.6rem;
        height: 0.6rem;
        background: #19e889;
        font-size: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 4px;
      }

      .zhong {
        position: relative;
        margin: 0 0rem 0 0.2rem;
        flex: 1;
        overflow: hidden;
        .biaoti {
          height: 0.45rem;
          font-size: 0.28rem;
          font-weight: 600;
        }
        .xiangxi {
          font-size: 0.24rem;
          color: #b1b1b1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .you {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 0.7rem;
        position: relative;
        .qianjin {
          padding-left: 0.1rem;
          text-align: right;
        }
        .dian {
          width: 0.15rem;
          height: 0.15rem;
          background: #ff6d2c;
          border-radius: 50%;
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
