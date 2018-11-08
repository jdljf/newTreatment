<template>
  <div class="duankai">
    <div class="qingjiancha">网络已断开，请检查网络！</div>
  </div>
</template>

<script>
export default {
  name: "oduankai",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.duankai {
  background: #eee;
  position: absolute;
  width: 100%;
  height: 100%;
  .qingjiancha {
    font-size: 0.2rem;
    color: #da273d;
    background: #ffddc8;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
}
</style>
