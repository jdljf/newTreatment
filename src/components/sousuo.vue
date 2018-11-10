<template>
  <div class="sousuo">
    <div class="toubu">
      <span class="sousuokuang">
        <i class="iconfont icon-sousuo icon"></i>
        <input type="text" class="guanjianci" placeholder="输入关键词即可搜索">
      </span>
      
      <span class="quxiao">取消</span>
    </div>
    <div class="lishi">搜索历史</div>
    <ul class="sousuoliebiao">
      <li>关键词1</li>
      <li>关键词2</li>
      <li>关键词1</li>
      <li>关键词2</li>
      <li>关键词1</li>
      <li>关键词2</li>
      <li>关键词1</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sousuo',
  data () {
    return {
    	
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sousuo{
  font-size: 0.25rem;
  .toubu {
    margin: 0 0.2rem;
    height: 0.52rem;
    line-height: 0.54rem;
    padding: 0.1rem 0 0.1rem 0;
    .sousuokuang{
      display: inline-block;
      width: 70%;
      height: 100%;
      position: relative;
      .icon{
        position: absolute;
        left: 0.2rem;
      }
      .guanjianci{
        display: inline-block;
        width: 100%;
        height: 100%;
        border: none;
        background: #f0f0f0;
        outline:none;
        padding-left: 0.6rem;
        border-radius: 0.25rem;
        font-size: 0.2rem;
      }
    }
    .quxiao{
      float: right;
    }
  }
  .lishi{
    color: #c0c0c0;
    height: 0.75rem;
    line-height: 0.75rem;
    padding-left: 0.2rem;
    background: #f1f1f1;
    font-size: 0.2rem;
  }
  .sousuoliebiao{
    margin-left: 0.2rem;
    li{
      height: 0.8rem;
      line-height: 0.8rem;
      border-bottom: 1px solid #f6f6f6;      
      overflow: hidden;
    }
  }
}
	
</style>
