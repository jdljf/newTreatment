<template>
  <div class="kemu_liebiao">
    <ul class="liebiao">
      <li class="liebiao-xiang" v-for="(subject, index) in subject" @click="gotoSubjectDetail(index)">
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
          <!--<i class="iconfont icon-wenjianjia"></i>-->
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
      </li> -->
    </ul>
  </div>
</template>

<script>
import fenlei from "../common/fenlei";

export default {
  name: "kemu_liebiao",
  data() {
    return {
      subject: [],
      classify: []
    };
  },
  mounted() {
    // this.getClassify()
    this.getSubject();
  },
  methods: {
    getSubject() {
      let id = this.$route.query.id;
      console.log(this.$route.query);
      this.axios
        .get("/api/getSubject", {
          params: {
            id: id
          }
        })
        .then(res => {
            console.log(res.data);
            
          this.subject = res.data.personSubject.detail;
        //   this.classify = res.data.classify;
        });
    },
    gotoSubjectDetail(index) {
      console.log(this.$route.query.id);
      
      this.$router.push({path: '/subjectDetail', query: {index: index,id: this.$route.query.id}})
    }
  },
  components: {
    fenlei: fenlei
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "getSubject"
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
</style>
