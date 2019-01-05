<template>
  <div class="xiaoxi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">{{header}}</p>
    </div>

    <ul class="liebiao">
      <li class="liebiao-xiang">
        <div class="liebiao-hezi">
          <p class="biaoti">{{messageDetail.title}}</p>
          <div class="neirong">
            <p class="xiangxi" v-for="detail in messageDetail.detail">{{detail}}</p>
          </div>

          <p class="shijian">{{messageDetail.create_Time.substring(0, 10)}}</p>
        </div>
      </li>
      <li class="liebiao-xiang" v-for="perReply in messageDetail.messageDetail">
        <div class="liebiao-hezi">
          <p class="biaoti wodehuifu">我的回复</p>
          <div class="neirong">
            <p class="xiangxi">{{perReply.detail}}</p>
          </div>

          <p class="shijian">{{perReply.createTime}}</p>
        </div>
      </li>
    </ul>

    <div class="huifu" v-if="comment">
      <input type="text" class="huifukuang" placeholder="写点什么吧！">
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      messageDetail: {},
      header: "",
      comment: true
    };
  },
  mounted() {
    console.log("dasdasdd");

    console.log(this.$route.query);

    this.getMyMessageDetail();
    if (this.$route.query.message_type == 1) {
      this.header = "课程消息详情";
      this.comment = false;
    } else if (this.$route.query.message_type == 0) {
      this.header = "系统消息详情";
      this.comment = true;
    }
  },
  methods: {
    getMyMessageDetail() {
      this.axios
        .get("/api/getMyMessageDetail", {
          params: {
            id: this.$route.query.id,
            index: this.$route.query.index
          }
        })
        .then(res => {
          this.messageDetail = res.data.message;
          console.log(this.message);
        });
    },
    huitui(){
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      }
      else {
        this.$router.back(-1)
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.xiaoxi {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #eee;
  overflow: scroll;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    margin-bottom: 0.25rem;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .liebiao {
    margin-bottom: 1.5rem;
    .liebiao-xiang {
      overflow: hidden;
      background: #fff;
      font-size: 0.26rem;
      margin: 0 0 0.2rem 0;
      .liebiao-hezi {
        position: relative;
        margin: 0.4rem 0.2rem 0.4rem 0.2rem;

        .biaoti {
          margin: 0 0 0.2rem 0;
        }
        .biaoti.wodehuifu {
          color: #70efb1;
        }
        .neirong {
          min-height: 1.6rem;
        }
        .shijian {
          margin: 0.4rem 0 0 0;
          font-size: 0.24rem;
        }
      }
    }
  }
  .huifu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.88rem;
    background: #fff;
    padding: 0.15rem 0.2rem;
    box-sizing: border-box;
    .huifukuang {
      width: 100%;
      height: 100%;
      background: #eee;
      outline: none;
      border: none;
      box-sizing: border-box;
      font-size: 0.2rem;
      padding: 0 0 0 0.15rem;
    }
  }
}
</style>
