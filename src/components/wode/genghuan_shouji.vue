<template>
  <div class="yanzheng_shenfen">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">更换手机</p>
    </div>

    <ul>
      <li class="liebiao">
        <span class="mingcheng">新手机号:</span>
        <div class="shuru">
          <input v-model="newPhoneNumber" type="text" placeholder="请输入新的手机号">
        </div>
      </li>
      <li class="liebiao">
        <span class="mingcheng">验证码:</span>
        <div class="shuru">
          <input v-model="verificationCode" type="text" placeholder="请输入短信验证码">
        </div>

        <span class="huoqu">获取验证码</span>
      </li>
    </ul>

    <span class="xiayibu" @click="sureChangePhone">确定</span>
  </div>
</template>

<script>
export default {
  name: "genghuan_shouji",
  data() {
    return {
      newPhoneNumber: "",
      verificationCode: ""
    };
  },
  mounted() {},
  methods: {
    sureChangePhone() {
      this.axios
        .post("/api/sureChangePhone", {
          newPhoneNumber: this.newPhoneNumber,
          verificationCode: this.verificationCode
        })
        .then(res => {
          let err_code = res.data.err_code;
          // if (err_code == 1) {
          //   return alert('请填写验证码')
          // }
          // else if (err_code == 2) {
          //   return alert('请填写手机号')
          // }
          this.$messagebox.alert(res.data.message).then(() => {
            if (err_code === 200) {
              this.$router.push({ path: "/personalMessage" });  
            }            
          });
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
