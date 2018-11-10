<template>
  <div class="toutiao">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">头条视讯</p>      
    </div>

    <ul class="liebiao">
      <li class="liebiao-xiang">
        <img src="../../assets/kecheng.png" alt="" class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">我是很长很长很长很长很长很长的课程标题</div>
          <div class="shangci">时长:<span class="riqi">12分钟</span></div>
        </div>
      </li>
      <li class="liebiao-xiang">
        <img src="../../assets/kecheng.png" alt="" class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">我是很长很长很长很长很长很长的课程标题</div>
          <div class="shangci">时长:<span class="riqi">12分钟</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'toutiao',
  data () {
    return {
    	
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.toutiao{
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
      padding: 0.23rem 0.3rem 0.23rem 0;
      border-bottom: 1px solid #f1f1f1;
      .zuo{
        // margin-left: 0.2rem;
        width: 1.6rem;
        height: 1.2rem;
      }
      .zhong{
        position: relative;
        // margin: 0 0.3rem 0 0.2rem;
        margin-left: 0.2rem;
        flex: 1;
        overflow: hidden;
        .kecheng-biaoti{
          font-size: 0.2rem;
          height: 0.74rem;
          line-height: 0.37rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .shangci{
          position: absolute;
          bottom: 0;
          font-size: 0.04rem;
          color: #ccc;
          .riqi{
            margin: 0 0.1rem;
          }
        }
      }
    }  
  }
  
}
	
</style>
