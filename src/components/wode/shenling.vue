<template>
  <div class="shenling">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">申领</p>
    </div>

    <ul class="liebiao">
      <li class="liebiao-xiang" v-for="(apply, index) in apply">
        <img src="../../assets/kecheng.png" alt class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">{{apply.title}}</div>
          <div class="shangci">
            <span
              class="riqi"
              v-if="apply.beginTime && apply.endTime !== undefined"
            >{{apply.beginTime.split(' ')[0]}}-{{apply.endTime.split(' ')[0]}}</span>
            <span
              v-if="apply.beginTime && apply.endTime !== undefined"
            >{{apply.endTime.split(' ')[1]}}</span>
          </div>
          <div class="shengyu">
            剩余:
            <span class="shuliang">{{apply.reaminCount}}</span>
          </div>
        </div>
        <div class="you">
          <div :class="{yilingqu: yilingqu}" class="lingqu" @click="showMask(index)">领取</div>
        </div>
      </li>
    </ul>

    <div class="zezao" v-show="zezao" @click="zezao = false"></div>
    <div class="querenxinxi" v-show="zezao">
      <div class="biaoti">确认个人信息</div>
      <div class="neirong">
        <div class="mingcheng">
          昵称：
          <span class>李存华</span>
        </div>
        <div class="mingcheng">
          地址：
          <span>广东省广州市白云区永泰路某某路某某栋1234室</span>
        </div>
        <div class="mingcheng">
          身份证
          <span>223234234275634523452</span>
        </div>
      </div>
      <div class="anniuBox">
        <div class="anniu" @click="hideMask">取消</div>
        <div class="anniu" @click="receive()">确定</div>
      </div>
    </div>
    <div class="tishikuang" v-show="yilingqu" :class="{xiaoshi: xs}">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "shenling",
  data() {
    return {
      apply: [],
      message: "",
      yilingqu: false,
      xs: false,
      yijiesu: false,
      zezao: false,
      suoyin: ''
    };
  },
  mounted() {
    this.getUserApply();
  },
  methods: {
    getUserApply() {
      this.axios.get("/api/getUserApply").then(res => {
        // console.log(res.data)
        this.apply = res.data.apply;
        console.log(this.apply);
      });
    },
    receive() {
      this.zezao = false
      console.log(this.suoyin)
      this.axios
        .post("/api/receiveApply", {
          id: this.apply[this.suoyin]._id
        })
        .then(res => {
          console.log(this.message);
          if (res.data.err_code == 200) {
            // alert()
            let that = this;
            this.message = res.data.message;
            this.yilingqu = true;
            setTimeout(function() {
              that.xs = true;
            }, 20);
          }
        });
    },
    hideMask(){
      this.zezao = false
    },
    showMask(index){
      this.zezao = true
      this.suoyin = index
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shenling {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .liebiao {
    padding: 0 0 0.15rem 0.2rem;
    background: #fff;
    .liebiao-xiang {
      display: flex;
      padding: 0.23rem 0.2rem 0.23rem 0;
      border-bottom: 1px solid #f1f1f1;
      .zuo {
        // margin-left: 0.2rem;
        width: 1.15rem;
        height: 1.2rem;
      }
      .zhong {
        position: relative;
        // margin: 0 0.3rem 0 0.2rem;
        margin-left: 0.2rem;
        flex: 1;
        overflow: hidden;
        .kecheng-biaoti {
          font-size: 0.26rem;
          height: 0.4rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .shangci {
          font-size: 0.21rem;
          color: #ccc;
          .riqi {
            margin: 0 0.1rem 0 0;
          }
        }
        .shengyu {
          position: absolute;
          bottom: 0;
          font-size: 0.21rem;
          color: #ccc;
          .shuliang {
            margin: 0 0 0 0.1rem;
          }
        }
      }
      .you {
        display: flex;
        align-items: center;
        position: relative;
        height: 1.2rem;
        text-align: center;
        .lingqu {
          width: 1.3rem;
          height: 0.8rem;
          line-height: 0.8rem;
          color: #fff;
          background: #ff6d2c;
          text-align: center;
          font-size: 0.24rem;
          border-radius: 4px;
          opacity: 1;
        }
        .yilingqu {
          background: #c9c9c9;
        }
      }
    }
  }

  .zezao {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
  }
  .querenxinxi {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    max-width: 500px;
    transform: translate(-50%, -50%);
    background: #fff;
    font-size: 0.25rem;
    .biaoti {
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      border-bottom: 1px solid #ccc;
      font-size: 0.3rem;
    }
    .neirong {
      padding: 0.35rem 0.2rem;
      border-bottom: 1px solid #ccc;
      .mingcheng:nth-child(2) {
        margin: 0.16rem 0;
      }
    }
    .anniuBox {
      display: flex;
      padding: 0.3rem 0.2rem;
      .anniu {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        box-sizing: border-box;
        border: 1px solid #1199ee;
        height: 0.6rem;
        border-radius: 3px;
      }
      .anniu:nth-child(1) {
        margin-right: 0.2rem;
        color: #19e889;
      }
      .anniu:nth-child(2) {
        background: #19e889;
        color: #fff;
      }
    }
  }
  .tishikuang {
    transition: opacity 3s;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 2rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    transform: translate(-50%, -50%);
    color: #f1f1f1;
    background: #000;
    opacity: 0.5;
    border-radius: 4px;
  }
  .xiaoshi {
    opacity: 0;
  }

  .prompt {
    transition: all 3s linear;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: #ccc;
    opacity: 1;
    border-radius: 4px;
    margin: 20px;
  }
  .gradual {
    opacity: 0;
  }
}
</style>
