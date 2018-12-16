<template>
  <div class="kemu">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <span class="kemu_zhonglei">内科</span>
    </div>
    <ul class="liebiao">
      <li class="liebiao-xiang" v-for="subject in subject">
        <div class="shipin">
          <img src="../../assets/kecheng.png" alt>
          <div class="jindu">
            <div class="baifenbi">{{ subject.proportion }}%</div>
            <div class="yixuexi">已学习</div>
          </div>
        </div>

        <div class="miaoshu">{{ subject.describe }}</div>

        <div class="caozuo">
          <i class="iconfont icon-guankan01"></i>
          <span>{{ subject.watched }}</span>
          <i class="iconfont icon-buoumaotubiao48"></i>
          <span>{{ subject.comment }}</span>
          <i class="iconfont icon-wenjianjia"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "kemu",
  data() {
    return {
      subject: [],
      person: []
    };
  },
  mounted() {
    this.getSubject();
  },
  methods: {
    getSubject() {
      this.axios.get("/api/getSubject").then(res => {
        this.subject = res.data.personSubject.detail;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.kemu {
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.2rem;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    overflow: auto;
    font-size: 0.26rem;
    .icon {
      margin-right: 0.2rem;
    }
    .kemu_zhonglei {
      margin-right: 0.4rem;
    }
  }
  .liebiao {
    .liebiao-xiang {
      border-bottom: 1px solid #ccc;
      .shipin {
        position: relative;
        margin: 0.2rem 0.2rem 0.2rem 0.2rem;
        box-sizing: border-box;
        img {
          width: 100%;
        }
        .jindu {
          position: absolute;
          top: 0;
          left: 0.2rem;
          background: #349dff;
          text-align: center;
          color: #fff;
          padding: 0.2rem;
          .baifenbi {
            font-size: 0.32rem;
            font-weight: 600;
          }
          .yixuexi {
            font-size: 0.2rem;
          }
        }
      }
      .miaoshu {
        padding: 0rem 0.2rem;
        font-size: 0.3rem;
      }
      .caozuo {
        display: flex;
        align-items: center;
        height: 0.3rem;
        padding: 0.2rem 0.2rem;
        color: #333;
        i {
          font-size: 0.4rem;
          margin-right: 0.09rem;
          color: #aaa;
        }
        i:last-child {
          flex: 1;
          margin: 0;
          text-align: right;
          font-size: 0.35rem;
        }
        span {
          font-size: 0.25rem;
          margin-right: 0.2rem;
        }
      }
    }
    .liebiao-xiang:last-child {
      border: 0 none;
    }
  }
}
</style>
