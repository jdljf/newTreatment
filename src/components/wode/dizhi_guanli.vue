<template>
  <div class="dizhi-guanli">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <router-link style="float: right;font-size: 0.5rem;" to="/newReceiveAddress">+</router-link>
      <p class="biaoti">收货地址管理</p>
    </div>
    <ul class="dizhi">
      <li v-for="item in addresses" class="dizhi-xiang">
        <div class="shang">
          <span class="xingming">{{ item.receiveName }}</span>
          <span class="dianhua">{{ item.receivePhone }}</span>  
        </div>
        <div class="zhong">广东省广州市天河区中山大道东TIT时代广场b座100号-110号</div>
        <div class="xia">
          <input type="checkbox" checked="item.isDefault" id>
          <span class="moren">默认地址</span>
          <span class="bianji">编辑</span>
          <span @click="deleteReceiveAddress" class="shanchu">删除</span>  
        </div>
        
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
          this.addresses = res.data.address;
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
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  overflow: auto;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .dizhi{
    .dizhi-xiang{
      padding: 0.25rem;
      background: #fff;
      border-top: 0.2rem solid #f1f1f1;
      .shang{
        font-size: 0rem;
        font-weight: 600;
        .dianhua, .xingming{
          font-size: 0.27rem;
        }
        .xingming{
          float: left;
        }
        .dianhua{
          display: block;
          margin: 0 0 0 1.5rem;
        }
      }
      .zhong{
        margin: 0.2rem 0;
        font-size: 0.23rem;
        height: 1rem;
        line-height: 0.33rem;
        overflow: hidden;
      }
      .xia{
        display: flex;
        font-size: 0.25rem;
        .moren{
          flex: 1;
          margin-left: 0.15rem;
        }
        .bianji{
          margin: 0 0.4rem 0 0;
        }
      }
    }
  }
}
</style>
