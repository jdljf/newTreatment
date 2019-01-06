<template>
  <div class="xiaoxi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">忘记密码</p>
    </div>

    <div class="tijiao">
      <div class="yaoqiu">
        <span class="xinxi">手机</span>
        <div class="shuru">
          <input
            type="text"
            v-model="forgetPas.phoneNumber"
            placeholder="请输入手机号"
            class="shurukuang"
          >
        </div>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">短信</span>
        <div class="shuru">
          <input type="text" v-model="verificationCode" placeholder="请输入短信验证码" class="shurukuang">
        </div>

        <span class="huoqu">
          <span class="yanzhengma">获取验证码</span>
        </span>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">密码</span>
        <div class="shuru">
          <input
            type="text"
            v-model="forgetPas.newPassword"
            placeholder="请输入新密码"
            class="shurukuang"
          >
        </div>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">重复</span>
        <div class="shuru">
          <input
            type="text"
            v-model="forgetPas.repeatPassword"
            placeholder="请再次输入密码"
            class="shurukuang"
          >
        </div>
      </div>

      <div @click.prevent="changeForgetPassword" class="zhuceAnniu">确认修改</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xiaoxi",
  data() {
    return {
      forgetPas: {
        phoneNumber: "",
        newPassword: "",
        repeatPassword: ""
      },
      verificationCode: ""
    };
  },
  mounted() {
  },
  methods: {
    changeForgetPassword() {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;

      if (
        !reg.test(this.forgetPas.newPassword) ||
        !reg.test(this.forgetPas.repeatPassword)
      ) {
        return alert("密码必须由6-12位数字加字母组成");
      }
      if (this.forgetPas.newPassword !== this.forgetPas.repeatPassword) {
        return alert("密码必须相同");
      }
      this.axios
        .post("/api/changeForgetPassword", {
          phoneNumber: this.forgetPas.phoneNumber,
          newPassword: this.forgetPas.newPassword,
          repeatPassword: this.forgetPas.repeatPassword,
          verificationCode: this.verificationCode
        })
        .then(res => {
          alert(res.data.message);
          if (res.data.err_code === 200) {
            
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
    border-bottom: 12px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .liebiao {
    // padding: 0 0 0.15rem 0.2rem;
    background: #fff;
    font-size: 0.3rem;
    .liebiao-xiang {
      padding: 0.23rem 0.2rem 0.23rem 0.2rem;
      height: 20px;
      line-height: 20px;
      border-bottom: 1px solid #f1f1f1;
      .qianjin {
        padding-left: 0.1rem;
        float: right;
      }
    }
    .liebiao-xiang:nth-child(1) {
      border-bottom: 12px solid #f1f1f1;
    }
  }
  .tijiao {
    padding: 0.5rem 0.4rem 0.6rem 0.4rem;
    .touxiang {
      display: flex;
      align-items: center;
      // padding: 0.2rem 0.15rem 0.2rem 0.15rem;
      margin: 0px 0 0.2rem 0;
      background: #fff;
      .zuo {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin: 0 0.2rem 0 0rem;
      }
      .zhong {
        position: relative;
        flex: 1;
        overflow: hidden;
        color: #8b8b8b;
        .xiangxi {
          font-size: 0.26rem;
          color: #8b8b8b;
          overflow: hidden;
          white-space: nowrap;
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
          color: #d5d5d5;
        }
      }
    }
    .yaoqiu {
      border-bottom: 1px solid #ccc;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.27rem;
      display: flex;
      margin: 0 0 0.2rem 0;
      .xinxi {
        width: 1.3rem;
      }
      .zhong {
        position: relative;
        flex: 1;
        overflow: hidden;
        color: #8b8b8b;
        input {
          width: 100%;
          height: 100%;
          outline: none;
          border: 0 none;
        }
        .xiangxi {
          text-align: right;
        }
      }
      .you {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        .qianjin {
          padding-left: 0.1rem;
          text-align: right;
          color: #ccc;
        }
      }
      .shuru {
        flex: 1;
        .shurukuang {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          outline: none;
          border: 0 none;
          vertical-align: top;
          font-size: 0.29rem;
        }
      }
      .huoqu {
        .yanzhengma {
          padding: 0.1rem 0.2rem;
          box-sizing: border-box;
          border: 1px solid #19e889;
          color: #19e889;
          background: #fff;
          font-size: 0.22rem;
          border-radius: 3px;
          white-space: nowrap;
        }
      }
    }
    .yaoqiu:last-child {
      margin: 0;
    }
    .zhuceAnniu {
      width: 100%;
      height: 0.76rem;
      line-height: 0.76rem;
      text-align: center;
      color: #fff;
      background: #19e889;
      border-radius: 4px;
      font-size: 0.28rem;
      margin: 0.6rem 0 0.22rem 0;
    }
    .tongyi {
      font-size: 0.23rem;
      margin: 0 0 0rem 0;
      .tiaokuan {
        color: #19e889;
      }
    }
  }
}
</style>
