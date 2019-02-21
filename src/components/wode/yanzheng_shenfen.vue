<template>
  <div class="yanzheng_shenfen">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">验证身份</p>
    </div>

    <ul>
      <li class="liebiao">
        <span class="mingcheng">原手机号:</span>
        <span class="xinxi">{{perMes.phoneNumber}}</span>
      </li>
      <li class="liebiao">
        <span class="mingcheng">验证码:</span>
        <div class="shuru">
          <input v-model="verificationCode" type="text" placeholder="请输入短信验证码">
        </div>

        <span class="huoqu">获取验证码</span>
      </li>
    </ul>

    <span class="xiayibu" @click="gotoChangePhone">下一步</span>
  </div>
</template>

<script>
export default {
  name: "yanzheng_shenfen",
  data() {
    return {
      perMes: {},
      verificationCode: ''
    };
  },
  mounted() {
    this.getChangePerMes();
  },
  methods: {
    getChangePerMes() {
      this.axios.get("/api/getChangePerMes").then(res => {
        this.perMes = res.data.perMes;
        console.log(this.perMes);
      });
    },
    gotoChangePhone() {
      this.axios.post('/api/verifyIdentity', {
          phoneNumber: this.perMes.phoneNumber,
          verificationCode: this.verificationCode
      })
      .then(res =>{
        let err_code = res.data.err_code
        if (err_code == 0) {
          this.$router.push({path: '/changePhone'})
        }
        else {
          this.$messagebox.alert(res.data.message)
        }
      })        
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
.yanzheng_shenfen {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    // border-bottom: 5px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  ul {
    margin: 0.25rem 0 0.6rem 0;
    .liebiao {
      height: 0.8rem;
      display: flex;
      align-items: center;
      background: #fff;
      font-size: 0.26rem;
      padding: 0 0.2rem;
      border-bottom: 1px solid #f1f1f1;
      .mingcheng {
        width: 1.3rem;
      }
      .shuru {
        flex: 1;
        margin-right: 0.2rem;
        input {
          width: 100%;
          height: 100%;
          outline: none;
          border: 0 none;
        }
      }
      .huoqu {
        padding: 0.1rem 0.2rem;
        box-sizing: border-box;
        border: 1px solid #19e889;
        color: #19e889;
        background: #fff;
        font-size: 0.22rem;
        border-radius: 1px;
        white-space: nowrap;
      }
    }
  }

  .xiayibu {
    display: block;
    width: 2.5rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #19e889;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    border-radius: 4px;
  }
}
</style>
