<template>
  <div class="dizhi-guanli">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <router-link style="float: right;font-size: 0.5rem;" to="/newReceiveAddress">+</router-link>
      <p class="biaoti">收货地址管理</p>
    </div>
    <ul>
      <li v-for="item in addresses">
        <span>{{ item.receiveName }}</span>
        <span>{{ item.receivePhone }}</span>
        <input type="checkbox" checked="item.isDefault" id>
        <router-link to="/newReceiveAddress2">编辑</router-link>
        <span @click="deleteReceiveAddress">删除</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "dizhi-guanli",
  data() {
    return {
      addresses: []
    };
  },
  mounted() {
    this.getReceiveAddresses();
  },
  methods: {
    getReceiveAddresses() {
      this.axios
        .post("/api/getRecAddresses", {
          //   params: {
          //     person_id: "5c0c7716a6caac1440278678"
          //     // address_id: ''
          //   }
        })
        .then(res => {
          console.log(res.data);
          // this.addresses = res.data.address;
        });
    },
    deleteReceiveAddress(){
      this.axios
        .get("/api/delRecAddresses", {
          //   params: {
          //     person_id: "5c0c7716a6caac1440278678"
          //     // address_id: ''
          //   }
        })
        .then(res => {
          console.log(res.data);
          alert(res.data.message)
          window.location.reload()
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dizhi-guanli {
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
