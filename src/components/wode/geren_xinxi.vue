<template>
  <div class="geren_xinxi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">个人信息</p>
    </div>

    <div class="touxiang">
      <img src="../../assets/logo.png" alt class="zuo">
      <div class="zhong">
        <div class="xiangxi">点击修改头像</div>
      </div>
      <div class="you">
        <i class="iconfont icon-qianjin qianjin"></i>
      </div>
    </div>

    <div class="liebiao">
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
    </div>

    <div class="liebiao">
      <span class="mingcheng">身份证号:</span>
      <span class="xinxi">{{perMes.idNumber}}</span>
    </div>

    <div class="tishi">温馨提示：如果姓名和身份证有误，只能通过平台工作人员修改</div>
  </div>
</template>

<script>
export default {
  name: "geren_xinxi",
  data() {
    return {
      perMes: {}
    };
  },
  mounted() {
      this.getChangePerMes()
  },
  methods: {
      getChangePerMes(){
          this.axios.get('/api/getChangePerMes').then(res=>{
              this.perMes = res.data.perMes
              console.log(this.perMes);
              
          })
      },
      gotoChangePhone(){
          this.$router.push({path: '/verifyIdentity'})
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.geren_xinxi {
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
  .touxiang {
    display: flex;
    align-items: center;
    padding: 0.2rem 0.15rem 0.2rem 0.15rem;
    margin: 10px 0;
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
    .xinxi {
        flex: 1;
    }
    .you{
        .genghuan{
            color: #78c0fa;
        }
        .qianjin{
            color: #d5d5d5;
        }
    }
  }
  .liebiao.jianju{
      margin-bottom: 10px;
  }
  .tishi{
      color: #bbb;
      font-size: 0.21rem;
      padding: 0.1rem 0.2rem;
  }
}
</style>
