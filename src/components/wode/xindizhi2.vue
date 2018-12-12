<template>
  <div class="xindizhi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">编辑收货地址</p>
    </div>
    <form @submit.prevent="editReceiveAddress">
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
        address: "",
        receivePhone: "",
        isDefault: false
      }
    };
  },
  mounted() {
    this.getReceiveAddress();
  },
  methods: {
    getReceiveAddress() {
      this.axios.get("/api/getReceiveAddress").then(res => {
        var adressData = res.data.address;
        console.log(res.data);
        this.address.receiveName = adressData.receiveName;
        this.address.province = adressData.province;
        this.address.city = adressData.city;
        this.address.area = adressData.area;
        this.address.receiveAddress = adressData.receiveAddress;
        this.address.receivePhone = adressData.receivePhone;
        console.log(this.address.receiveName);
      });
    },
    editReceiveAddress() {
      this.axios.post("/api/editReceiveAddress", this.address).then(res => {
        console.log(res.data);
        alert(res.data.message);
      });
    }
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
