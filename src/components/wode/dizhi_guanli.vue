<template>
  <div class="dizhi-guanli">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <!-- <router-link to="/newReceiveAddress">+</router-link> -->
      <span @click="gotoReceiveAddress" class="add">+</span>
      <p class="biaoti">收货地址管理</p>
    </div>
    <ul class="dizhi">
      <li v-for="(item,index) in addresses" class="dizhi-xiang">
        <div class="shang">
          <span class="xingming">{{ item.receiveName }}</span>
          <span class="dianhua">{{ item.receivePhone }}</span>
        </div>
        <div class="zhong">{{item.province}}{{item.area}}{{item.city}}{{item.receiveAddress}}</div>
        <div class="xia">
          <label class="ms-toggle" @click.prevent="handleClick(index)">
            <span class="ms-toggle__button" :class="{checked: item.isDefault}"></span>
          </label>
          <span class="moren">默认地址</span>
          <span @click="gotoEditAddress(item._id)" class="bianji">编辑</span>
          <span @click="deleteReceiveAddress(item._id)" class="shanchu">删除</span>
        </div>
      </li>
    </ul>

    <label class="ms-toggle" @click.prevent="handleClick">
      <span class="ms-toggle__button" :class="statusClass"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "dizhi-guanli",
  data() {
    return {
      addresses: [],
      checked: false,
      lastIndex: ""
    };
  },
  mounted() {
    this.getReceiveAddresses();
  },
  computed: {
    statusClass() {
      return {
        checked: this.checked
      };
    }
  },
  methods: {
    getReceiveAddresses() {
      this.axios
        .post("/api/getRecAddresses", {
        })
        .then(res => {
          console.log(res.data);
          this.addresses = res.data.address;

          // this.lastIndex = this.addresses.some(function (item) {
          //   return item.equals(about.id);
          // })
        });
    },
    gotoEditAddress(id) {
      this.$router.push({
        path: "/newReceiveAddress",
        query: {
          id: id
        }
      });
    },
    gotoReceiveAddress(){
      this.$router.push({
        path: "/newReceiveAddress"
      });
    },
    deleteReceiveAddress(id) {
      alert("确定删除该地址吗");
      this.axios
        .get("/api/delRecAddresses", {
          params: {
            addressId: id
          }
        })
        .then(res => {
          if (res.data.err_code === 200) {
            alert(res.data.message);
            location.reload();
          }
          // alert(res.data.message);
          // window.location.reload();
        });
    },
    handleClick(index) {
      this.axios
        .get("/api/changeDefault", {
          params: {
            addressId: this.addresses[index]._id
          }
        })
        .then(res => {
          if (res.data.err_code === 200) {
            alert(res.data.message);
            for (let i = 0; i < this.addresses.length; i++) {
              this.addresses[i].isDefault = false;
            }
            console.log(this.addresses[index]);

            this.addresses[index].isDefault = true;
            this.checked = !this.checked;
            this.lastIndex = index;
            console.log(this.lastIndex);
          }
          // alert(res.data.message);
          // window.location.reload();
        });
    },
    huitui() {
      if (this.$route.query.goindex === "true") {
        this.$router.push("/");
      } else {
        this.$router.push({ path: "/personalCenter" });
      }
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
    .add{
       float: right;
       font-size: 0.5rem;
    }
  }
  .dizhi {
    .dizhi-xiang {
      padding: 0.25rem;
      background: #fff;
      border-top: 0.2rem solid #f1f1f1;
      .shang {
        font-size: 0rem;
        font-weight: 600;
        .dianhua,
        .xingming {
          font-size: 0.27rem;
        }
        .xingming {
          float: left;
        }
        .dianhua {
          display: block;
          margin: 0 0 0 1.5rem;
        }
      }
      .zhong {
        margin: 0.2rem 0;
        font-size: 0.23rem;
        height: 1rem;
        line-height: 0.33rem;
        overflow: hidden;
      }
      .xia {
        display: flex;
        font-size: 0.25rem;
        align-items: center;
        .moren {
          flex: 1;
          margin-left: 0.15rem;
        }
        .bianji {
          margin: 0 0.4rem 0 0;
        }
        .ms-toggle {
          display: inline-flex;
          align-items: center;
          position: relative;
        }
        .ms-toggle__button {
          background: transparent;
          border: 2px solid #333;
          border-radius: 10px;
          box-sizing: border-box;
          width: 20px;
          height: 20px;
          position: relative;
          display: block;
          flex: 0 0 auto;
          transition: background-color 0.5s, border-color 0.5s;
          cursor: pointer;
          &::after {
            content: "";
            width: 12px;
            height: 12px;
            position: absolute;
            top: 2px;
            left: 2px;
            background-color: #fff;
            border-radius: 50%;
            transition: background-color 0.5s, left 0.5s;
          }
          &.checked {
            border-color: #19e889;
            &::after {
              background-color: #19e889;
            }
          }
        }
      }
    }
  }
}
</style>
