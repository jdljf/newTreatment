<template>
  <div class="login">
    <p class="mimadenglu">密码登录</p>
    <div class="yaoqiu">
      <span class="xinxi">手机</span>
      <div class="shuru">
        <input type="text" v-model="person.phoneNumber" placeholder="请输入手机号" class="shurukuang">
      </div>
    </div>
    <div class="yaoqiu">
      <span class="xinxi">密码</span>
      <div class="shuru">
        <input type="text" v-model="person.password" placeholder="请输入密码" class="shurukuang">
      </div>
    </div>

    <div @click.prevent="login" class="denglu">登录</div>
    <div class="qita">
      <span class="wangji" @click="gotoChangeForgetPas">忘记密码</span>
      <span class="zhuce" @click="gotoRegister">注册登录</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "denglu",
  data() {
    return {
      person: {
        phoneNumber: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      console.log(window.localStorage.token);
      this.axios
        .post("/api/login", {
          phoneNumber: this.person.phoneNumber,
          password: this.person.password
        })
        .then(res => {
          if (res.data.err_code === 1) {
            alert(res.data.message);
          }

          if (!window.localStorage) {
            alert("该浏览器不支持localstorage");
            return false;
          } else {
            var storage = window.localStorage;
            // storage.setItem("_id", res.data._id);
            // storage.setItem("token", res.data.token);
            // this.$store.state.token = res.data.token;
            console.log(storage);
            console.log(storage["_id"]);
            console.log(storage["token"]);
            let token = res.data.token;
            console.log(token);
            
            this.$store.dispatch("UserLogin", token);
            //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
            let redirectUrl = decodeURIComponent(
              this.$route.query.redirect || "/"
            );
            //跳转到指定的路由
            this.$router.push({
              path: redirectUrl
            });
          }
          // else if (res.data.err_code === 500) {
          //   this.$router.push({path: '/error'})
          // }
        });
    },
    gotoRegister() {
      this.$router.push({ path: "/register" });
    },
    gotoChangeForgetPas(){
      this.$router.push({
        path: '/forgetPassword'
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  padding: 1rem 0.7rem 0 0.7rem;
  .mimadenglu {
    height: 1rem;
    font-size: 0.4rem;
    font-weight: 600;
  }
  .yaoqiu {
    border-bottom: 1px solid #ccc;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.29rem;
    display: flex;
    .xinxi {
      width: 0.8rem;
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
  }
  .denglu {
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
  .qita {
    font-size: 0.23rem;
    .wangji {
      float: left;
    }
    .zhuce {
      float: right;
    }
  }
}
</style>
