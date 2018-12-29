<template>
  <div class="yanzheng_shenfen">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">验证身份</p>
    </div>

    <ul>
      <li class="liebiao">
        <span class="mingcheng">原手机号:</span>
        <span class="xinxi">12345678765</span>
      </li>
      <li class="liebiao">
        <span class="mingcheng">验证码:</span>
        <div class="shuru">
          <input type="text" placeholder="请输入短信验证码">
        </div>

        <span class="huoqu">获取验证码</span>
      </li>
    </ul>

    <span class="xiayibu" @click="gotoChangePhone">下一步</span>
    <!-- <div class="liebiao">
      <span class="mingcheng">姓名:</span>
      <span class="xinxi">{{perMes.name}}</span>
    </div>

    <div class="liebiao jianju" @click="gotoChangePhone">
      <span class="mingcheng">手机号</span>
      <span class="xinxi">{{perMes.phoneNumber}}</span>
      <div class="you">
        <span class="genghuan">更换</span>
        <i class="iconfont icon-qianjin qianjin"></i>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "yanzheng_shenfen",
  data() {
    return {
      perMes: {}
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
        this.$router.push({path: '/changePhone'})
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
