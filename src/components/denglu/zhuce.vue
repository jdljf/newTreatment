<template>
  <div class="hello">
    <span class="tishi">用户名</span>
    <input type="text" name id value placeholder="请输入用户名">
    <form @submit.prevent="register">
      <input type="number" v-model="person.phoneNumber" placeholder="请输入手机号">
      <input type="text" v-model="verificationCode" placeholder="请输入短信验证码">
      <input type="text" v-model="person.name" placeholder="请输入真实姓名">
      <input type="text" v-model="person.idNumber" placeholder="请输入身份证号码">
      <!-- <input type="number" placeholder="请输入省市区"> -->
      <input type="text" v-model="person.province" placeholder>
      <input type="text" v-model="person.city" placeholder>
      <input type="text" v-model="person.area" placeholder>
      <input type="text" v-model="person.address" placeholder="请输入详细地址">
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "denglu",
  data() {
    return {
      person: {
        phoneNumber: '',
        name: '',
        idNumber: '',
        password: '',
        province: '',
        city: '',
        area: '',
        address: ''
      },
      verificationCode: ''
    };
  },
  methods: {
    register() {
      this.axios
        .post("/api/register", {
          person: this.person,
          verificationCode: this.verificationCode
        })
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          this.$router.push({path: '/login'})
        })
        // .catch(function(res) {
        //   alert("出错了");
        // });
    }
  },
  watch: {
    'person.phoneNumber' : function (val) {
      // if (typeof val !== String) {
      //   val = toString(val)
      // }
      let size = 6
      let str = toString(val)
      this.person.password = val.slice(val.length - size)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  color: red;
  .tishi {
    margin-right: 10px;
  }
}
</style>
