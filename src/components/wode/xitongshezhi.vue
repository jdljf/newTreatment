<template>
  <div class="xiaoxi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">系统设置</p>
    </div>

    <ul class="liebiao">
      <li class="liebiao-xiang">
        <router-link to="/changePassword" class="luyou">
          <span>修改密码</span>
          <i class="iconfont iconfont icon-qianjin qianjin"></i>
        </router-link>
      </li>
      <li class="liebiao-xiang">
        <span>意见反馈</span>
        <i class="iconfont iconfont icon-qianjin qianjin"></i>
      </li>
      <li class="liebiao-xiang">
        <span>版本信息</span>
        <i class="iconfont iconfont icon-qianjin qianjin"></i>
      </li>
      <li class="liebiao-xiang">
        <span>退出登录</span>
        <i class="iconfont iconfont icon-qianjin qianjin"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "xiaoxi",
  data() {
    return {};
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
    display: block;
    .liebiao-xiang {
      padding: 0.23rem 0.2rem 0.23rem 0.2rem;
      height: 20px;
      line-height: 20px;
      border-bottom: 1px solid #f1f1f1;
      .luyou{
          display: block;
      }
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
