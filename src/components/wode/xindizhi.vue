<template>
  <div class="xindizhi">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">新建收货地址</p>
    </div>
    <div class="tijiao">
      <div class="yaoqiu">
        <span class="xinxi">收货人</span>
        <div class="shuru">
          <input
            type="text"
            v-model="address.receiveName"
            placeholder="请输入收货人姓名"
            class="shurukuang"
          >
        </div>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">联系方式</span>
        <div class="shuru">
          <input
            type="text"
            v-model="address.receivePhone"
            placeholder="请输入电话号码"
            class="shurukuang"
          >
        </div>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">所在地区</span>
        <div class="zhong" @click="changeAddress" v-show="!showAdd">
          <div class="xiangxi">选择省市区</div>
        </div>
        <div class="you" v-show="!showAdd">
          <i class="iconfont icon-qianjin qianjin"></i>
        </div>
        <div class="zhong" v-show="showAdd" @click="changeAdd = true">
          <input type="text" v-bind:value="area">
        </div>
      </div>
      <div class="yaoqiu meibian">
        <span class="xinxi">详细地址</span>
        <div class="shuru">
          <input
            type="textarea"
            v-model="address.receiveAddress"
            placeholder="请输入街道、楼牌号等"
            class="shurukuang"
          >
        </div>
      </div>
      <div class="yaoqiu jianju meibian">
        <span class="xinxi">默认地址</span>
        <div class="shuru">
          <input v-model="address.isDefault" type="checkbox">
        </div>
      </div>
    </div>
    <div class="zhuceAnniu" @click="createNewAddress">保存并使用</div>

    <div class="zezaoAdd" v-show="changeAdd" @click="changeAdd = false">
      <div class="xuanze">
        <div class="queding" @click="showAdd = true">确定</div>
        <div class="dizhiji">
          <div class="fenji">省</div>
          <div class="fenji">市</div>
          <div class="fenji">区</div>
        </div>
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker } from "mint-ui";
import myaddress from "../denglu/address.json";

export default {
  name: "xindizhi",
  data() {
    return {
      address: {
        receiveName: "",
        province: "",
        city: "",
        area: "",
        receiveAddress: "",
        receivePhone: "",
        isDefault: false
      },
      changeAdd: false,
      showAdd: false,

      isShowAddress: false,
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      myAddressProvince: "",
      myAddresscounty: "",
      myAddressCity: ""
    };
  },
  mounted() {
    // this.getReceiveAddress();
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0; // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化 //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  },
  methods: {
    // getReceiveAddress() {
    //   this.axios.get("/api/getReceiveAddress").then(res => {
    //     var adressData = res.data.address;
    //     console.log(res.data);
    //     this.address.receiveName = adressData.receiveName;
    //     console.log(this.address.receiveName);
    //   });
    // },
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        this.myAddressProvince = values[0];
        this.myAddresscounty = values[1];
        this.myAddressCity = values[2];
      }
    },
    createNewAddress() {
      if (this.showAdd) {
        this.address.province = this.myAddressProvince;
        this.address.area = this.myAddresscounty;
        this.address.city = this.myAddressCity;
      }
      console.log(this.address);
      this.axios
        .post("/api/saveReceiveAddress", {
          receiveName: this.address.receiveName,
          receivePhone: this.address.receivePhone,
          province: this.address.province,
          area: this.address.area,
          city: this.address.city,
          receiveAddress: this.address.receiveAddress,
          isDefault: this.address.isDefault
        })
        .then(res => {
          console.log(res.data);
        });
    },
    changeAddress() {
      this.changeAdd = true;
    }
  },
  computed: {
    area() {
      return this.myAddressProvince + this.myAddresscounty + this.myAddressCity;
    }
  },
  components: {
    "mt-picker": Picker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.xindizhi {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
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
  .tijiao {
    // padding: 0rem 0rem 0rem 0.4rem;
    border-top: 0.2rem solid #f1f1f1;
    background: #fff;
    .yaoqiu {
      padding: 0 0.4rem 0 0.4rem;
      // margin: 0 0 0 0.4rem;
      display: flex;
      border-bottom: 1px solid #ccc;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.27rem;
      background: #fff;
      .xinxi {
        width: 1.3rem;
      }
      .zhong {
        position: relative;
        flex: 1;
        overflow: hidden;
        color: #8b8b8b;
        input {
          width: 100%;
          height: 100%;
          outline: none;
          border: 0 none;
        }
        .xiangxi {
          text-align: right;
        }
      }
      .you {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        .qianjin {
          padding-left: 0.1rem;
          text-align: right;
          color: #ccc;
        }
      }
      .shuru {
        flex: 1;
        .shurukuang {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          outline: none;
          border: 0 none;
          vertical-align: top;
          font-size: 0.29rem;
        }
      }
      .huoqu {
        .yanzhengma {
          padding: 0.1rem 0.2rem;
          box-sizing: border-box;
          border: 1px solid #19e889;
          color: #19e889;
          background: #fff;
          font-size: 0.22rem;
          border-radius: 3px;
          white-space: nowrap;
        }
      }
    }
    .yaoqiu.jianju {
      border-top: 0.2rem solid #f1f1f1;
    }
    .yaoqiu.meibian {
      border-bottom: 0 none;
    }
    .tongyi {
      font-size: 0.27rem;
      .tiaokuan {
        color: #19e889;
      }
    }
  }
  .zhuceAnniu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 0.76rem;
    line-height: 0.76rem;
    text-align: center;
    color: #fff;
    background: #19e889;
    border-radius: 4px;
    font-size: 0.28rem;
  }
  .zezaoAdd {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba($color: #000000, $alpha: 0.5);
    .xiangce,
    .paishe,
    .quxiao {
      position: absolute;
      left: 0;
      right: 0;
      width: 5.5rem;
      height: 0.8rem;
      line-height: 0.8rem;
      margin: 0 auto;
      background: #fff;
      text-align: center;
      font-size: 0.29rem;
      border-radius: 3px;
    }
    .quxiao {
      bottom: 0.5rem;
      color: #19e889;
    }
    .paishe {
      bottom: 1.5rem;
    }
    .xiangce {
      bottom: 2.33rem;
    }
    .xuanze {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      .queding {
        padding: 0 0.2rem 0 0;
        text-align: right;
        color: #19e889;
        font-size: 0.25rem;
        height: 0.8rem;
        line-height: 0.8rem;
      }
      .dizhiji {
        background: #eee;
        height: 0.6rem;
        display: flex;
        .fenji {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.25rem;
          font-weight: 600;
        }
      }
    }
    .picker-items {
      background: #fff;
    }
  }
}
</style>
