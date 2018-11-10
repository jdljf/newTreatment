<template>
  <div class="shenling">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">申领</p>      
    </div>

    <ul class="liebiao">
      <li class="liebiao-xiang">
        <img src="../../assets/kecheng.png" alt="" class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">我是很长很长很长很长很长很长的课程标题</div>
          <div class="shangci"><span class="riqi">2018.03.16-2018.06.04</span>15:05</div>
          <div class="shengyu">剩余:<span class="shuliang">1024</span></div>
        </div>
        <div class="you">
          <div class="lingqu">领取</div>
        </div>
      </li>
      <li class="liebiao-xiang">
        <img src="../../assets/kecheng.png" alt="" class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">我是很长很长很长很长很长很长的课程标题</div>
          <div class="shangci"><span class="riqi">2018.03.16-2018.06.04</span>15:05</div>
          <div class="shengyu">剩余:<span class="shuliang">1024</span></div>
        </div>
        <div class="you">
          <div class="lingqu">领取</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'shenling',
  data () {
    return {
    	
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shenling{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .liebiao{
    padding: 0 0 0.15rem 0.2rem;
    background: #fff;
    .liebiao-xiang{
      display: flex;
      padding: 0.23rem 0.2rem 0.23rem 0;
      border-bottom: 1px solid #f1f1f1;
      .zuo{
        // margin-left: 0.2rem;
        width: 1.15rem;
        height: 1.2rem;
      }
      .zhong{
        position: relative;
        // margin: 0 0.3rem 0 0.2rem;
        margin-left: 0.2rem;
        flex: 1;
        overflow: hidden;
        .kecheng-biaoti{
          font-size: 0.26rem;
          height: 0.4rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .shangci{
          font-size: 0.04rem;
          color: #ccc;
          .riqi{
            margin: 0 0.1rem 0 0;
          }
        }
        .shengyu{
          position: absolute;
          bottom: 0;
          font-size: 0.04rem;
          color: #ccc;
          .shuliang{
            margin: 0 0 0 0.1rem;
          }
        }
      }
      .you{
        display: flex;
        align-items: center;
        position: relative;
        height: 1.2rem;
        text-align: center;
        .lingqu{
          width: 1.3rem;
          height: 0.8rem;
          line-height: 0.8rem;
          color: #fff;
          background: #ff6d2c;
          text-align: center;
          font-size: 0.2rem;
          border-radius: 4px;
        }
      }
    }  
  }  
}
	
</style>
