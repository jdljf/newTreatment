<template>
  <div class="fenlei">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <span class="kemu_zhonglei" v-for="classify in classify" @click="changeClassify(classify._id)">{{classify.name}}</span>
      <!-- <span class="kemu_zhonglei">内科</span>
      <span class="kemu_zhonglei">外科</span>
      <span class="kemu_zhonglei">骨科</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "fenlei",
  data() {
    return {
      subject: [],
      classify: []
    };
  },
  mounted() {
    this.getClassify();
  },
  methods: {
    // getClassify() {
    //   this.axios.get("/api/getClassify").then(res => {
    //     // this.subject = res.data.personSubject.detail;
    //     this.classify = res.data.classify
    //   });
    // },
    changeClassify(id){
      console.log(id)
      this.axios.get("/api/changeClassify", {
        params: {
          id: id
        }
      }).then(res => {
        
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fenlei {
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.2rem;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    overflow: auto;
    font-size: 0.26rem;
    .icon {
      margin-right: 0.2rem;
    }
    .kemu_zhonglei {
      margin-right: 0.4rem;
    }
  }
}
</style>
