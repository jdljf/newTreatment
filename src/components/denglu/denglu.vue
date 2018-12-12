<template>
  <div class="login">
    <p>登录</p>
    <form @submit.prevent="login">
      <input type="text" name id v-model="person.name" placeholder="请输入用户名">
      <input type="text" name id v-model="person.password" placeholder="请输入密码">
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "denglu",
  data() {
    return {
      person: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    login: function() {
      console.log("sdadadada");
      console.log(window.localStorage.token);
      this.axios
        .post("/api/login", {
          name: "aaa",
          password: "123456"
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  color: red;
}
</style>
