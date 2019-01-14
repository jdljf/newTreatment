<template>
  <div class="kemu">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <span
        v-for="(classify, index) in classify"
        @click="getSubject(classify.dataName, index)"
        :class="{active: index==checkedindex}"
        class="kemu_zhonglei"
      >{{classify.name}}</span>
      <!-- <span class="kemu_zhonglei">内科</span>
      <span class="kemu_zhonglei">外科</span>
      <span class="kemu_zhonglei">骨科</span>-->
    </div>
    <div class="kemu_liebiao">
      <ul class="liebiao">
        <li
          class="liebiao-xiang"
          v-for="(subject, index) in subject"
          @click="gotoSubjectDetail(index)"
        >
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
        <!-- <li class="liebiao-xiang" >
        <div class="shipin">
          <img src="../../assets/kecheng.png" alt>
          <div class="jindu">
            <div class="baifenbi">50%</div>
            <div class="yixuexi">已学习</div>
          </div>
        </div>

        <div class="miaoshu">dsadsad</div>

        <div class="caozuo">
          <i class="iconfont icon-guankan01"></i>
          <span>432</span>
          <i class="iconfont icon-buoumaotubiao48"></i>
          <span>424</span>
          <i class="iconfont icon-wenjianjia"></i>
        </div>
        </li>-->
      </ul>
    </div>
    <!-- <router-view></router-view> -->
    <!-- <fenlei></fenlei> -->
    <!-- <ul class="liebiao">
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
    </ul>-->
  </div>
</template>

<script>
import fenlei from "../common/fenlei";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "kemu",
  data() {
    return {
      subject: [],
      checkedindex: ""
    };
  },
  mounted() {
    // console.log(this.$store);

    // this.changeClassify();
    this.getSubject();
    // this.getSubject();
  },
  computed: {
    ...mapGetters({
      classify: "subjectClassify/renderClassifyData"
    })
  },

  methods: {
    changeClassify(dataName) {
      this.$router.push({ path: "/subject/list", query: { id: id } });
    },
    getSubject(dataName, index) {
      console.log(index);

      let i = this.$route.query.index;
      let classify = this.$store.getters["subjectClassify/renderClassifyData"];
      let query;

      if (index === '') {        
        this.checkedindex = i;
        query = dataName
      } else {        
        this.checkedindex = index;
        query = classify[i].dataName
      }
      console.log(this.checkedindex);

      this.axios
        .get("/api/getSubject", {
          params: {
            dataName: query
          }
        })
        .then(res => {
          console.log(res.data);

          this.subject = res.data.videos;
        });
    },
    gotoSubjectDetail(index) {
      console.log(this.$route.query.id);

      this.$router.push({
        path: "/subjectDetail",
        query: { index: index, id: this.$route.query.id }
      });
    },
    huitui() {
      if (this.$route.query.goindex === "true") {
        this.$router.push("/");
      } else {
        this.$router.push("/main");
      }
    }
  },
  components: {
    fenlei: fenlei
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.kemu {
  .toubu {
    height: 0.73rem;
    line-height: 0.72rem;
    padding: 0 0.2rem;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    overflow: auto;
    white-space: nowrap;
    font-size: 0.26rem;
    .icon {
      margin-right: 0.2rem;
    }
    .kemu_zhonglei {
      margin-right: 0.4rem;
      display: inline-block;
      box-sizing: border-box;
      height: 100%;
    }
    .active {
      border-bottom: 4px solid #19e889;
    }
  }
  .kemu_liebiao {
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
