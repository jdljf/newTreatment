<template>
  <div class="chucuo">
    <img class="cuowu-tupian" src="../../assets/404/error.png" alt="">
    <p class="wenzi">页面出错了！</p>
  </div>
</template>

<script>
export default {
  name: "chucuo",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.chucuo {
  background: #eee;
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 50%;
  .cuowu-tupian{
    display: block;
    margin: 0 auto;
    height: 1.8rem;
    width: 1.8rem;
  }
  .wenzi{
    text-align: center;
    padding-top: 0.3rem;
    color: #aaa;
    font-size: 0.3rem
  }
}
</style>
