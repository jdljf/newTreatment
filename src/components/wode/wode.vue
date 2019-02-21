<template>
  <div class="jiangyi">
    <div class="toubu" @click="gotoPersonalMessage">
      <img src="../../assets/logo.png" alt class="zuo">
      <div class="zhong">
        <div v-if="!notLogin" class="biaoti">
          {{name}}
          <span class="dianhua">({{phoneNumber}})</span>
        </div>
        <div v-if="notLogin" class="biaoti">未登录</div>
        <div v-if="!notLogin" class="xiangxi">ID:{{idNumber}}</div>
        <div v-if="notLogin" class="xiangxi">点击登录后获取更多权限</div>
      </div>
      <div class="you">
        <i class="iconfont icon-qianjin qianjin"></i>
      </div>
    </div>

    <div class="gundong">
      <div class="tongji">
        <div class="tongji-xiang">
          <div class="shuliang">{{curriculum}}</div>
          <div class="mingcheng">我的课程</div>
        </div>
        <div class="tongji-xiang">
          <div class="shuliang">{{learnedTime}}</div>
          <div class="mingcheng">我的学时</div>
        </div>
        <div class="tongji-xiang">
          <div class="shuliang">{{medicalBeans}}</div>
          <div class="mingcheng">我的医豆</div>
        </div>
      </div>

      <div class="qiandao">
        <div class="hezi">
          <div class="tishi">
            <div class="meiri">每日签到</div>
            <div class="gengduo">连签一周获更多积分</div>
          </div>
          <div class="qiandaoyuan">签到</div>
        </div>
      </div>

      <div class="neirong">
        <div class="neirong-xiang">
          <router-link to="/apply">领取</router-link>
        </div>
        <div class="neirong-xiang">
          <router-link to="/message">我的消息</router-link>
        </div>
        <div class="neirong-xiang">
          <router-link to="/adminAddress">我的地址</router-link>
        </div>
      </div>
      <div class="neirong">
        <div class="neirong-xiang">
          <router-link to="/about">关于我们</router-link>
        </div>
        <div class="neirong-xiang">
          <router-link to="/systemSetup">系统设置</router-link>
        </div>
        <div class="neirong-xiang">
          <router-link to="/loginOut">我的任务</router-link>
        </div>
      </div>
    </div>

    <div class="dibu">
      <div class="dibu-xiang" @click="gotoMain">
        <div class="iconfont icon-shuben icon"></div>
        <div class="xuanze">学院</div>
      </div>
      <div class="dibu-xiang">
        <div class="baiyuan">
          <div class="cha">X</div>
        </div>
        <div class="xuanze">挑战</div>
      </div>
      <div class="dibu-xiang yixuan">
        <div class="iconfont icon-home icon"></div>
        <div class="xuanze">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "wode",
  data() {
    return {
      person: {},
      notLogin: true
    };
  },
  mounted() {
    if (!window.localStorage) {
    }
    let storage = window.localStorage;
    if (storage["token"] === "") {
      this.notLogin = true;
    } else {
      this.notLogin = false;
      // this.getPersonMessage();
      this.$store.dispatch("user/getPersonMessage");
    }
  },
  computed: {
    ...mapGetters({
      name: "user/name",
      idNumber: "user/idNumber",
      phoneNumber: "user/phoneNumber",
      curriculum: "user/curriculum",
      learnedTime: "user/learnedTime",
      medicalBeans: "user/medicalBeans"
    })
  },
  methods: {
    getPersonMessage() {
      this.axios.get("/api/getPersonMessage").then(res => {
        this.person = res.data;
        console.log(this.person);
      });
    },
    gotoMain() {
      this.$router.push({
        path: "/main"
      });
    },
    gotoPersonalMessage() {
      if (this.notLogin) {
        this.$router.push({
          path: "/Login"
        });
      } else {
        this.$router.push({
          path: "/personalMessage"
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.jiangyi {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  .toubu {
    display: flex;
    align-items: center;
    padding: 0.42rem 0.2rem 0.42rem 0.2rem;
    border-bottom: 3px solid #f1f1f1;
    background: #fff;
    .zuo {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .zhong {
      position: relative;
      margin: 0 0rem 0 0.2rem;
      flex: 1;
      overflow: hidden;
      .biaoti {
        height: 0.45rem;
        font-size: 0.28rem;
        // font-weight: 600;
        .dianhua {
          padding: 0 0 0 0.2rem;
        }
      }
      .xiangxi {
        font-size: 0.26rem;
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
    }
  }
  .gundong {
    position: fixed;
    top: 1.9rem;
    bottom: 1.5rem;
    width: 100%;
    overflow: scroll;
    .tongji {
      display: flex;
      padding: 0 0.2rem;
      justify-content: center;
      align-items: center;
      height: 1.8rem;
      border-bottom: 3px solid #f1f1f1;
      background: #fff;
      .tongji-xiang {
        flex: 1;
        text-align: center;
        .shuliang {
          font-size: 0.45rem;
          font-weight: 600;
          height: 0.65rem;
        }
        .mingcheng {
          font-size: 0.25rem;
          color: #d6d6d6;
        }
      }
    }
    .qiandao {
      padding: 0.4rem 0.2rem;
      background: #fff;
      height: 1.8rem;
      .hezi {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem 0.4rem;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background: #20e693;
        .tishi {
          flex: 1;
          .meiri {
            color: #fff;
            margin-bottom: 0.13rem;
          }
          .gengduo {
            font-size: 0.25rem;
            color: #ccc;
          }
        }
        .qiandaoyuan {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          color: #fff;
          font-size: 0.3rem;
          background: #65ff3c;
        }
      }
    }
    .neirong {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.1rem 0.1rem 0;
      .neirong-xiang {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        height: 2rem;
      }
      .neirong-xiang:nth-child(2) {
        margin: 0 0.1rem;
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
