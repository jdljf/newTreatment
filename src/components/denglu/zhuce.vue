<template>
  <div class="zhuce">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">注册账号</p>
    </div>

    <div class="tijiao">
      <div class="touxiang" @click="changeAvatar">
        <img src="../../assets/logo.png" alt class="zuo">
        <div class="zhong">
          <div class="xiangxi">点击修改头像</div>
        </div>
        <div class="you">
          <i class="iconfont icon-qianjin qianjin"></i>
        </div>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">手机</span>
        <div class="shuru">
          <input type="text" v-model="person.phoneNumber" placeholder="请输入手机号" class="shurukuang">
        </div>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">短信</span>
        <div class="shuru">
          <input type="text" v-model="verificationCode" placeholder="请输入短信验证码" class="shurukuang">
        </div>

        <span class="huoqu">
          <span class="yanzhengma">获取验证码</span>
        </span>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">姓名</span>
        <div class="shuru">
          <input type="text" v-model="person.name" placeholder="请输入真实姓名" class="shurukuang">
        </div>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">身份证</span>
        <div class="shuru">
          <input type="text" v-model="person.idNumber" placeholder="请输入身份证号码" class="shurukuang">
        </div>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">地址</span>
        <div class="zhong" @click="changeAddress" v-show="!showAdd">
          <div class="xiangxi">选择省市区</div>
        </div>
        <div class="you" v-show="!showAdd">
          <i class="iconfont icon-qianjin qianjin"></i>
        </div>
        <div class="zhong" v-show="showAdd" @click="changeAdd = true" :class="{left: showAdd}">
          <div class="xiangxi">{{area}}</div>
        </div>
      </div>
      <div class="yaoqiu">
        <span class="xinxi">执业地址</span>
        <div class="shuru">
          <input type="textarea" v-model="person.address" placeholder="请输入详细地址" class="shurukuang">
        </div>
      </div>
      <div @click.prevent="register" class="zhuceAnniu">注册</div>
      <div class="tongyi">
        <input type="checkbox" v-model="agree">
        <span>同意</span>
        <span class="tiaokuan" @click="showClause">《服务条款》</span>
      </div>
    </div>

    <div class="zezao" v-show="changeAva" @click="changeAva = false">
      <div class="xiangce">相册</div>
      <div class="paishe">拍摄</div>
      <div class="quxiao">取消</div>
    </div>

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

    <div class="tiaokuan_xiangqing" :class="{changeClause: changeClause}" ref="clause">
      <div class="toubu">
        <span @click="hideClause" class="iconfont icon-houtui icon"></span>
        <p class="biaoti">服务条款</p>
      </div>

      <div class="tiaokuan_neiorng">
        <ul class="bigTitle">
          <li class="bigTitle-item">本网站服务条款的确认和接纳</li>
          <ul class="title">
            <li class="title-item">本网站各项服务的所有权和运作权归本网站拥有。</li>
          </ul>
          <li class="bigTitle-item">用户必须：</li>
          <ul class="title">
            <li class="title-item">自行配备上网的所需设备， 包括个人电脑、调制解调器或其他必备上网装置</li>
            <li class="title-item">自行负担个人上网所支付的与此服务有关的电话费用、 网络费用</li>
          </ul>
          <li class="bigTitle-item">用户在本网站上交易平台上不得发布下列违法信息</li>
          <ul class="title">
            <li class="title-item">反对宪法所确定的基本原则的；</li>
            <li class="title-item">危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
            <li class="title-item">损害国家荣誉和利益的</li>
            <li class="title-item">煽动民族仇恨、民族歧视，破坏民族团结的</li>
            <li class="title-item">破坏国家宗教政策，宣扬邪教和封建迷信的</li>
            <li class="title-item">散布谣言，扰乱社会秩序，破坏社会稳定的</li>
            <li class="title-item">散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的</li>
            <li class="title-item">侮辱或者诽谤他人，侵害他人合法权益的</li>
            <li class="title-item">含有法律、行政法规禁止的其他内容的</li>
          </ul>
          <li class="bigTitle-item">有关个人资料，用户需同意</li>
          <ul class="title">
            <li class="title-item">提供及时、详尽及准确的个人资料</li>
            <li class="title-item">同意接收来自本网站的信息</li>
            <li class="title-item">不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料</li>
            <li class="title-item">本网站不公开用户的姓名、地址、电子邮箱和笔名，以下情况除外</li>
            <ul class="smallTitle">
              <li class="smallTitle-item">用户授权本网站透露这些信息</li>
              <li
                class="smallTitle-item"
              >相应的法律及程序要求本网站提供用户的个人资料。如果用户提供的资料包含有不正确的信息，本网站保留结束用户使用本网站信息服务资格的权利</li>
            </ul>
          </ul>
        </ul>

        <div class="tongyi">
          <input type="checkbox" v-model="agree">
          <span>同意</span>
          <span class="tiaokuan">《服务条款》</span>
        </div>

        <div @click="hideClause" class="yiyuedu">我已阅读</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker } from "mint-ui";
import myaddress from "./address.json";

export default {
  name: "zhuce",
  data() {
    return {
      person: {
        phoneNumber: "",
        name: "",
        idNumber: "",
        password: "",
        province: "",
        area: "",
        city: "",
        address: ""
      },
      agree: true,
      verificationCode: "",
      changeAva: false,
      changeAdd: false,
      changeClause: false,
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
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0; // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化 //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  },
  methods: {
    register() {
      if (this.showAdd) {
        this.person.province = this.myAddressProvince;
        this.person.area = this.myAddresscounty;
        this.person.city = this.myAddressCity;
      }

      this.axios
        .post("/api/register", {
          person: this.person,
          verificationCode: this.verificationCode,
          agree: this.agree
        })
        .then(res => {
          console.log(res);
          alert(res.data.message);
          if (res.data.err_code === 0) {
            // this.$router.push({ path: "/login" });
          }
        });
      // .catch(function(res) {
      //   alert("出错了");
      // });
    },
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
    changeAvatar() {
      this.changeAva = true;
    },
    changeAddress() {
      this.changeAdd = true;
    },
    showClause() {
      this.changeClause = true;
    },
    hideClause() {
      this.changeClause = false;
      this.$refs.clause.scrollTop = 0;
    }
  },
  computed: {
    area() {
      return this.myAddressProvince + this.myAddresscounty + this.myAddressCity;
    }
  },
  watch: {
    "person.phoneNumber": function(val) {
      // if (typeof val !== String) {
      //   val = toString(val)
      // }
      let size = 6;
      let str = toString(val);
      this.person.password = val.slice(val.length - size);
    }
  },
  components: {
    "mt-picker": Picker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.zhuce {
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    // border-bottom: 5px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }

  .tishi {
    margin-right: 10px;
  }
  .tijiao {
    padding: 0.5rem 0.4rem 0.6rem 0.4rem;
    .touxiang {
      display: flex;
      align-items: center;
      // padding: 0.2rem 0.15rem 0.2rem 0.15rem;
      margin: 0px 0 0.2rem 0;
      background: #fff;
      .zuo {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin: 0 0.2rem 0 0rem;
      }
      .zhong {
        position: relative;
        flex: 1;
        overflow: hidden;
        color: #8b8b8b;
        .xiangxi {
          font-size: 0.26rem;
          color: #8b8b8b;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .you {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 0.7rem;
        position: relative;
        .qianjin {
          padding-left: 0.1rem;
          text-align: right;
          color: #8b8b8b;
        }
      }
    }
    .yaoqiu {
      border-bottom: 1px solid #ccc;
      height: 0.8rem;
      font-size: 0.27rem;
      display: flex;
      margin: 0 0 0.2rem 0;
      .xinxi {
        width: 1.3rem;
        display: flex;
        align-items: center;
      }
      .zhong {
        position: relative;
        flex: 1;
        overflow: hidden;
        color: #8b8b8b;
        display: flex;
        align-items: center;
        flex-flow: row-reverse;
        font-size: 0.29rem;
      }
      .left {
        flex-flow: row;
      }
      .you {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        .qianjin {
          padding-left: 0.1rem;
          text-align: right;
          color: #8b8b8b;
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
          font-size: 0.29rem;
          line-height: 0.8rem;
          color: #8b8b8b;
        }

        input::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #8b8b8b;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #8b8b8b;
          opacity: 1;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #8b8b8b;
          opacity: 1;
        }
        input::-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #8b8b8b;
        }
      }
      .huoqu {
        display: flex;
        justify-content: center;
        align-items: center;
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
    .yaoqiu:last-child {
      margin: 0;
    }
    .zhuceAnniu {
      width: 100%;
      height: 0.76rem;
      line-height: 0.76rem;
      text-align: center;
      color: #fff;
      background: #19e889;
      border-radius: 4px;
      font-size: 0.28rem;
      margin: 0.6rem 0 0.22rem 0;
    }
    .tongyi {
      font-size: 0.27rem;
      margin: 0 0 0rem 0;
      .tiaokuan {
        color: #19e889;
      }
    }
  }
  .zezao,
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
  .tiaokuan_xiangqing {
    position: fixed;
    transition: all 0.5s linear 0s;
    top: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    overflow: scroll;
    .tiaokuan_neiorng {
      padding: 0.3rem 0.3rem 0.3rem 0.6rem;
      .bigTitle {
        list-style-type: decimal;
        .bigTitle-item {
          font-size: 0.28rem;
          padding: 0 0 0.18rem 0;
          font-weight: 600;
        }
        .title {
          list-style-type: lower-latin;
          padding: 0 0 0 0.3rem;
          font-size: 0.25rem;
          .title-item {
            padding: 0 0 0.15rem 0rem;
          }
          .smallTitle {
            list-style-type: lower-roman;
            padding: 0 0 0 0.3rem;
            font-size: 0.25rem;
            .smallTitle-item {
              padding: 0 0 0.15rem 0;
            }
          }
        }
      }
      .xiangqing {
        font-size: 0.28rem;
        line-height: 0.4rem;
        text-indent: 0.5rem;
      }
      .tongyi {
        font-size: 0.27rem;
        margin: 0.4rem 0 0rem 0;
        .tiaokuan {
          color: #19e889;
        }
      }
    }

    .yiyuedu {
      height: 0.76rem;
      line-height: 0.76rem;
      text-align: center;
      color: #fff;
      background: #19e889;
      border-radius: 4px;
      font-size: 0.28rem;
      margin: 0.4rem 0.2rem 0.22rem 0.2rem;
    }
  }
  .changeClause {
    top: 0;
  }
}
</style>
