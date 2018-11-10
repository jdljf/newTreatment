<template>
  <div class="kecheng">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">课程</p>      
    </div>

    <ul class="liebiao">
      <li class="liebiao-xiang">
        <img src="../../assets/kecheng.png" alt="" class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">我是很长很长很长很长很长很长的课程标题</div>
          <div class="shangci">上次学习:<span class="riqi">2018-06-04</span>15:05</div>
        </div>
        <div class="you">
          <div class="jindu">26%</div>
          <div class="zhuangtai">已学习</div>
        </div>
      </li>
      <li class="liebiao-xiang">
        <img src="../../assets/kecheng.png" alt="" class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">我是很长很长很长很长很长很长的课程标题</div>
          <div class="shangci">上次学习:<span class="riqi">2018-06-04</span>15:05</div>
        </div>
        <div class="you">
          <div class="jindu">26%</div>
          <div class="zhuangtai">已通过</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'kecheng',
  data () {
    return {
    	
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.kecheng{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    border-bottom: 1px solid #ccc;
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
      padding: 0.23rem 0rem 0.23rem 0;
      border-bottom: 1px solid #ccc;
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
      .you{
        position: relative;
        width: 1rem;
        height: 1.2rem;
        text-align: center;
        .jindu{
          font-size: 8px;
        }
        .zhuangtai{
          position: absolute;
          bottom: 0;
          color: #76efb3;
          font-size: 8px;
          width: 100%;
        }
      }
    }  
  }
  
}
	
</style>
