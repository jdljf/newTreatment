<template>
  <div class="xindizhi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">新建收货地址</p>
    </div>
    <form @submit.prevent="saveReceiveAddress">
      <input type="text" v-model="address.receiveName" placeholder="请输入收货人">
      <input type="text" v-model="address.receivePhone" placeholder="请输入联系方式">
      <!-- <input type="number" placeholder="请输入省市区"> -->
      <input type="text" v-model="address.province" placeholder>
      <input type="text" v-model="address.city" placeholder>
      <input type="text" v-model="address.area" placeholder>
      <input type="text" v-model="address.address" placeholder="请输入详细地址">
      <input type="checkbox" v-model="address.isDefault">
      <button type="submit">保存地址</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "denglu",
  data() {
    return {
      address: {
        receiveName: "",
        province: "",
        city: "",
        area: "",
        receiveAddress: "",
        receivePhone: '',
        isDefault: false
      }
    };
  },
  mounted() {
    this.getReceiveAddress()
  },
  methods: {
    getReceiveAddress() {
      this.axios
        .get("/api/getReceiveAddress")
        .then(res => {
          var adressData = res.data.address
          console.log(res.data)
          this.address.receiveName = adressData.receiveName
          console.log(this.address.receiveName)
        });
    }
  },
  watch: {
    // "person.phoneNumber": function(val) {
    //   // if (typeof val !== String) {
    //   //   val = toString(val)
    //   // }
    //   let size = 6;
    //   let str = toString(val);
    //   this.person.password = val.slice(val.length - size);
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.xindizhi {
  color: red;
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
}
</style>
