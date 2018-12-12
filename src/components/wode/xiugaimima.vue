<template>
  <div class="xiaoxi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">修改密码</p>
    </div>

    <form @submit.prevent="changePassword">
      <input type="number" v-model="pasData.phoneNumber">
      <input type="text" v-model="pasData.oldPassword" placeholder="请输入旧密码">
      <input type="text" v-model="pasData.newPassword" placeholder="请输入密码">
      <input type="text" v-model="pasData.repeatPassword" placeholder="请再次输入密码">
      <input type="submit" value="确认修改">
    </form>

    <span>忘记密码</span>
  </div>
</template>

<script>
export default {
  name: "xiaoxi",
  data() {
    return {
      pasData: {
        phoneNumber: "",
        oldPassword: "",
        newPassword: "",
        repeatPassword: ""
      }
    };
  },
  mounted() {
      this.getPersonPhoneNum()
  },
  methods: {
    getPersonPhoneNum(){
        this.axios.post('/api/getPersonPhoneNum', {
            name: 'bbb'
        })
        .then((res)=> {
            if (res.data.err_code === 200) {
                this.pasData.phoneNumber = res.data.phoneNumber
            }
        })
    },
    changePassword() {
        this.axios.post('/api/changePassword', this.pasData)
        .then((res)=> {
            if (res.data.err_code === 200) {
                alert('修改成功')
            }
        })
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
}
</style>
