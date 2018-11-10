<template>
  <div class="huodong">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">活动详情</p>      
    </div>

    <div class="neirong">
      <img class="tu" src="../../assets/kecheng.png" alt="">
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
      <p class="xiangqing">只要股份有限公司是创建于1829年，是一家有近七十年历史的生产企业</p>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "huodong",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.huodong {
  position: relative;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    border-bottom: 5px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .neirong {
    position: fixed;
    top: 0.82rem;
    bottom: 0rem;
    padding: 0.2rem;
    overflow: scroll;
    .tu {
      width: 100%;
      height: 3.5rem;
      margin-bottom: 0.1rem;
    }
    .xiangqing {
      font-size: 0.2rem;
      line-height: 0.4rem;
          text-indent: 0.5rem;
    }
  }
}
</style>
