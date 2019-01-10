<template>
  <div class="kecheng">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">课程</p>
    </div>

    <ul class="liebiao" v-if="curriculum !== undefined">
      <li class="liebiao-xiang" v-for="curriculum in curriculum">
        <img src="../../assets/kecheng.png" alt class="zuo">
        <div class="zhong">
          <div class="kecheng-biaoti">{{curriculum.title}}</div>
          <div class="shangci" v-if="curriculum.lastLearn !== undefined">
            <span>上次学习:</span>
            <span class="riqi">{{curriculum.lastLearn.split(' ')[0]}}</span>
            <span class="riqi">{{curriculum.lastLearn.split(' ')[1]}}</span>
          </div>
        </div>
        <div class="you">
          <div class="jindu">{{curriculum.progress}}%</div>
          <div class="zhuangtai">已通过</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "kecheng",
  data() {
    return {
      curriculum: [
        {
          learnedTime: ''
        }
      ]
    };
  },
  mounted() {
    this.getUserCurriculum();
  },
  methods: {
    getUserCurriculum() {
      this.axios.get("/api/getUserCurriculum").then(res => {

        if (res.data.err_code == 500) {
          return alert(res.data.message);
        }

        this.curriculum = res.data.curriculum.curriculums
        this.curriculum.learnedTime = res.data.curriculum.curriculums.learnedTime
        console.log(res.data.curriculum.curriculums[0].lastLearn);
        
        console.log(this.curriculum)
      });
    },
    huitui(){
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      }
      else {
        this.$router.back(-1)
      }
    }
  },
  couputed: {
    date: function () {
      
    }
  },
  activated: function(){
    this.$setgoindex()
    console.log('判断');
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.kecheng {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    border-bottom: 1px solid #ccc;
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
      padding: 0.23rem 0rem 0.23rem 0;
      border-bottom: 1px solid #ccc;
      .zuo {
        // margin-left: 0.2rem;
        width: 1.6rem;
        height: 1.2rem;
      }
      .zhong {
        position: relative;
        // margin: 0 0.3rem 0 0.2rem;
        margin-left: 0.2rem;
        flex: 1;
        overflow: hidden;
        .kecheng-biaoti {
          font-size: 0.25rem;
          height: 0.74rem;
          line-height: 0.37rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .shangci {
          position: absolute;
          bottom: 0;
          font-size: 0.22rem;
          color: #ccc;
          .riqi {
            margin: 0 0.1rem;
          }
        }
      }
      .you {
        position: relative;
        width: 1rem;
        height: 1.2rem;
        text-align: center;
        .jindu {
          font-size: 0.3rem;
        }
        .zhuangtai {
          position: absolute;
          bottom: 0;
          color: #76efb3;
          font-size: 0.23rem;
          width: 100%;
        }
      }
    }
  }
}
</style>
