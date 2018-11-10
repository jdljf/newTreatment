<template>
  <div class="xiaoxi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">我的消息</p>      
    </div>
    
    <ul class="liebiao">
      <li class="liebiao-xiang">
        <i class="tu iconfont icon-ling ling zuo"></i>
        <div class="zhong">
          <div class="biaoti">系统消息</div>
          <div class="xiangxi">我是很长很长很长很长很长很长的课程标题</div>
        </div>
        <div class="you">
          <span class="dian"></span>
          <i class="iconfont iconfont icon-qianjin qianjin"></i>
        </div>
      </li>
      <li class="liebiao-xiang">
        <i class="tu iconfont icon-ling ling zuo"></i>
        <div class="zhong">
          <div class="biaoti">课程消息</div>
          <div class="xiangxi">我是很长很长很长很长很长很长的课程标题</div>
        </div>
        <div class="you">
          <!-- <span class="dian"></span> -->
          <i class="iconfont iconfont icon-qianjin qianjin"></i>
        </div>
      </li>
      <li class="liebiao-xiang">
        <i class="tu iconfont icon-ling ling zuo"></i>
        <div class="zhong">
          <div class="biaoti">系统消息</div>
          <div class="xiangxi">我是很长很长很长很长很长很长的课程标题</div>
        </div>
        <div class="you">
          <span class="dian"></span>
          <i class="iconfont iconfont icon-qianjin qianjin"></i>
        </div>
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
    border-bottom: 2px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .liebiao {
    padding: 0 0 0.15rem 0.2rem;
    background: #fff;
    .liebiao-xiang {
      display: flex;
      align-items: center;
      padding: 0.23rem 0.2rem 0.23rem 0;
      border-bottom: 1px solid #f1f1f1;
      .zuo {
        width: 0.6rem;
        height: 0.6rem;
        background: #19e889;
        font-size: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 4px;
      }

      .zhong {
        position: relative;
        margin: 0 0rem 0 0.2rem;
        flex: 1;
        overflow: hidden;
        .biaoti{
          height: 0.45rem;     
          font-size: 0.28rem;
          font-weight: 600;
        }
        .xiangxi {
          font-size: 0.24rem;
          color: #b1b1b1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
        }
        .dian {
          width: 0.15rem;
          height: 0.15rem;
          background: #ff6d2c;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
