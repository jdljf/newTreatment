<template>
  <div class="shouye">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="banner in banner" class="swiper-slide">
          <img v-bind:src=" '/api' + banner " alt>
        </div>
        <!-- <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide"></div>-->
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>-->
    </div>

    <div class="gongneng">
      <router-link to="/curriculum" class="gongneng-xiang">
        <img src="../../assets/kecheng_logo.png" alt>
        <div>课程</div>
      </router-link>
      <div class="gongneng-xiang">
        <img src="../../assets/ketang_logo.png" alt>
        <div>我的课堂</div>
      </div>
      <router-link to="/headline" class="gongneng-xiang">
        <img src="../../assets/toutiao_logo.png" alt>
        <div>头条视讯</div>
      </router-link>
      <router-link to="/questionNaire" class="gongneng-xiang">
        <img src="../../assets/wenjuan_logo.png" alt>
        <div>调查问卷</div>
      </router-link>
    </div>

    <div class="tonggao">
      <span class="tonggao-xiang">迅捷斥候5s前获得15医豆</span>
      <span class="tonggao-xiang">迅捷斥候5s前获得15医豆</span>
    </div>

    <div class="kemufenlei">
      <div class="biaoti">科目分类</div>
      <div class="fenlei">
        <div
          @click="gotoSubject(index)"
          class="fenlei-xiang"
          v-for="(classify, index) in classify"
          v-if="index < 3"
        >
          <img src="../../assets/renwen_logo.png" alt>
          <div>{{classify.name}}</div>
        </div>
        <!-- <div class="fenlei-xiang">
          <img src="../../assets/renwen_logo.png" alt>
          <div>医学人文</div>
        </div>
        <div class="fenlei-xiang">
          <img src="../../assets/jisuanji_logo.png" alt>
          <div>医学计算机</div>
        </div>
        <div class="fenlei-xiang">
          <img src="../../assets/xiyi_logo.png" alt>
          <div>西医</div>
        </div>-->
      </div>
      <div class="fenlei">
        <div
          @click="gotoSubject(index)"
          class="fenlei-xiang"
          v-for="(classify, index) in classify"
          v-if="index >=3&&index<=6"
        >
          <img src="../../assets/zhongyi_logo.png" alt>
          <div>{{classify.name}}</div>
        </div>
        <!-- <div class="fenlei-xiang">
          <img src="../../assets/gonggong_logo.png" alt>
          <div>公共卫生</div>
        </div>
        <div class="fenlei-xiang">
          <img src="../../assets/linchuang_logo.png" alt>
          <div>临床实践</div>
        </div>-->
      </div>
    </div>

    <div class="xinxiliu">
      <div class="toubu">
        <span v-for="flowClassify in flowClassify" class="kemu_zhonglei">{{flowClassify.title}}</span>
      </div>

      <ul class="liebiao">
        <li class="liebiao-xiang" v-for="(videos, index) in videos">
          <div @click="gotoDetail(index)" v-if="videos.isVideo">
            <div class="shipin">
              <img src="../../assets/kecheng.png" alt>
            </div>

            <div class="miaoshu">{{videos.title}}</div>

            <div class="caozuo">
              <span class="left">{{videos.durationTime}}分钟前</span>
              <span class="right">
                <i class="iconfont icon-guankan01"></i>
                <span>{{videos.watched}}</span>
                <i class="iconfont icon-buoumaotubiao48"></i>
                <span>{{videos.comment}}</span>
              </span>
            </div>
          </div>
          <div @click="gotoConsultation(index)" v-if="!videos.isVideo">
            <div class="neirong">
              <img src="../../assets/kecheng.png" alt class="youtu">
              <div class="wenzi">{{videos.title}}</div>
            </div>
            <div class="caozuo">
              <span class="left">{{videos.durationTime}}分钟前</span>
              <span class="right">
                <i class="iconfont icon-guankan01"></i>
                <span>{{videos.watched}}</span>
                <i class="iconfont icon-buoumaotubiao48"></i>
                <span>{{videos.comment}}</span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="dibu">
      <div class="dibu-xiang yixuan" @click="gotoMain">
        <div class="iconfont icon-shuben icon"></div>
        <div class="xuanze">学院</div>
      </div>
      <div class="dibu-xiang">
        <div class="baiyuan">
          <div class="cha">X</div>
        </div>
        <div class="xuanze">挑战</div>
      </div>
      <div class="dibu-xiang" @click="gotoPersonCenter">
        <div class="iconfont icon-home icon"></div>
        <div class="xuanze">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapState, mapGetters, mapActions } from "vuex";
import "swiper/dist/css/swiper.min.css";

export default {
  name: "shouye",
  data() {
    return {
      flowClassify: [],
      subClassify: [],
      videos: [],
      banner: []
      // classify: []
    };
  },
  computed: {
    ...mapGetters({
      classify: "subjectClassify/renderClassifyData"
    })
  },
  mounted() {
    this.getBanner();
    // this.getClassify()
    this.$store.dispatch("subjectClassify/getClassifyAct");
    this.getFlowClassify();
    this.getmessage();
    console.log(this.$store.getters);
  },
  methods: {
    initSwiper() {
      var swiper = new Swiper(".swiper-container", {
        speed: 500,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        loop: true,
        // 如果需要分页器
        pagination: ".swiper-pagination",
        preventClicks: false,
        paginationClickable: true, // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        preventClicksPropagation: false // 阻止click冒泡
        // 如果需要前进后退按钮
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
      });

      // swiper.params.pagination.clickable = true;
      //此外还需要重新初始化pagination
      // swiper.pagination.destroy();
      // swiper.pagination.init()
      // swiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');
    },
    getClassify() {
      this.axios.get("/api/getClassify").then(res => {
        // this.subject = res.data.personSubject.detail;
        this.classify = res.data.classify;
      });
    },
    getBanner() {
      this.axios.get("/api/getBanner").then(res => {
        this.banner = res.data.banner;

        this.$nextTick(function() {
          this.initSwiper();
        });
      });
    },
    getmessage() {
      this.axios.get("/api/informationFlow", {}).then(res => {
        console.log(res.data);
        this.videos = res.data.videos;
      });
    },
    getFlowClassify(id) {
      console.log(id);
      this.axios
        .get("/api/getFlowClassify", {
          params: {
            id: id
          }
        })
        .then(res => {
          this.flowClassify = res.data.flowClassify;
        });
    },
    getMainSubjectClassify(id) {
      console.log(id);
      this.axios
        .get("/api/getMainSubjectClassify", {
          params: {
            id: id
          }
        })
        .then(res => {
          this.subClassify = res.data.subClassify;
          console.log(this.flowClassify);
        });
    },
    gotoDetail(index) {
      console.log(this.videos[index]._id);

      this.$router.push({
        path: "/subjectDetail",
        query: {
          // index: index,
          id: this.videos[index]._id
        }
      });
    },
    gotoConsultation(index) {
      this.$router.push({
        path: "/consultation",
        query: {
          id: this.videos[index]._id
        }
      });
    },
    gotoSubject(index) {
      this.$router.push({
        path: "/subject",
        query: {
          index: index
        }
      });
    },
    gotoMain() {
      this.$router.push({
        path: "/main"
      });
    },
    gotoPersonCenter() {
      console.log("个人");

      this.$router.push({
        path: "/personalCenter"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shouye {
  .toubu {
    width: 100%;
    height: 0.7rem;
  }
  .swiper-container {
    width: 100%;
    height: 2.4rem;
    .swiper-slide {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .gongneng {
    padding: 1rem 0.2rem 0.4rem;
    display: flex;
    .gongneng-xiang {
      flex: 1;
      margin: 0.2rem;
      font-size: 0.22rem;
      text-align: center;
      img {
        display: block;
        margin: 0 auto 0.15rem auto;
        width: 0.75rem;
        height: 0.75rem;
      }
    }
  }
  .tonggao {
    overflow: hidden;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #e6fff4;
    .tonggao-xiang {
      margin: 0 1.4rem 0 0.4rem;
      color: #9cf9cf;
      font-size: 0.2rem;
    }
  }
  .kemufenlei {
    padding: 0.3rem 0 0 0;
    border-bottom: 4px solid #f1f1f1;
    .biaoti {
      margin: 0 0 0 0.2rem;
      font-size: 0.3rem;
      font-weight: 600;
      padding-left: 0.08rem;
      border-left: 3px solid #7ea090;
    }
    .fenlei {
      display: flex;
      .fenlei-xiang {
        flex: 1;
        margin: 0.3rem 0.3rem 0.2rem 0.3rem;
        font-size: 0.22rem;
        text-align: center;
        img {
          display: block;
          margin: 0 auto 0rem auto;
          width: 0.9rem;
          height: 0.9rem;
        }
      }
    }
  }
  .xinxiliu {
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
      }
    }
    .liebiao {
      .liebiao-xiang {
        border-bottom: 1px solid #ccc;
        margin-left: 0.2rem;
        padding: 0.2rem 0.2rem 0.2rem 0;
        .shipin {
          position: relative;
          margin: 0rem 0rem 0.1rem 0rem;
          box-sizing: border-box;
          img {
            width: 100%;
          }
        }
        .miaoshu {
          margin-bottom: 0.2rem;
          font-size: 0.3rem;
        }
        .neirong {
          overflow: hidden;
          *zoom: 1;
          .youtu {
            float: right;
            width: 2.1rem;
            height: 1.4rem;
          }
          .wenzi {
            margin-right: 2.2rem;
            font-size: 0.3rem;
            height: 1.4rem;
            line-height: 0.45rem;
            overflow: hidden;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }
        .caozuo {
          display: flex;
          align-items: center;
          height: 0.3rem;
          padding: 0.2rem 0rem 0rem;
          color: #333;
          .left {
            font-size: 0.23rem;
            margin-right: 0.2rem;
            color: #aaa;
          }
          .right {
            flex: 1;
            text-align: right;
            i {
              font-size: 0.3rem;
              margin-right: 0.09rem;
              color: #aaa;
            }
            span {
              font-size: 0.23rem;
              margin-right: 0.2rem;
            }
          }
        }
      }
      .liebiao-xiang:last-child {
        border: 0 none;
      }
    }
  }
  .dibu {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 0.88rem;
    background: #fff;
    .dibu-xiang {
      flex: 1;
      position: relative;
      text-align: center;
      color: #737373;
      height: 100%;
      .baiyuan {
        position: absolute;
        top: 0.05rem;
        left: 50%;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #fff;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        .cha {
          height: 0.8rem;
          width: 0.8rem;
          border-radius: 50%;
          border: 1px solid #737373;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.7rem;
          color: #737373;
        }
      }
      .icon {
        font-size: 0.5rem;
      }
      .xuanze {
        font-size: 0.1rem;
      }
    }
    .dibu-xiang.yixuan {
      color: #19e889;
    }
    .dibu-xiang:nth-child(2) {
      .xuanze {
        position: absolute;
        bottom: 0px;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
