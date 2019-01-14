<template>
  <div class="shouye">
    <div class="toubu">
      <span class="iconfont icon-houtui icon" @click="huitui"></span>
      <p class="biaoti">调查问卷</p>
    </div>
    <!-- <form @submit.prevent="submitAnswers">
      <ul>
        <li v-for="(naire, index) in naire">
          <ul v-if="naire.selectType == 0">
            <li>{{naire.question}}</li>
            <li v-for="(answer, answerIndex) in naire.answer">
              <input type="radio" v-bind:value="answerIndex" v-model="checkedNames[`ans${index}`]">
              <span>{{answer}}</span>
            </li>
          </ul>
          <ul v-if="naire.selectType == 1">
            <li>{{naire.question}}</li>
            <li v-for="(answer, answerIndex) in naire.answer">
              <input
                type="checkbox"
                v-bind:value="answerIndex"
                v-model="checkedNames[`ans${index}`]"
              >
              <span>{{answer}}</span>
            </li>
          </ul>
        </li>
      </ul>

      <button type="submit">提交</button>
    </form>-->
    <div class="ceyan">
      <div class="form">
        <ul>
          <li class="timu" v-for="(test, index) in test">
            <ul>
              <li class="wenti">{{test.question}}</li>
              <li class="xuanze" v-for="(answer, answerIndex) in test.answer">
                <input
                  v-bind:type="test.selectType === '0' ? 'checkbox' : 'radio'"
                  v-bind:value="letter(answerIndex)"
                  v-model="checkedNames[`ans${index}`]"
                  @change="selectAns(answerIndex, index)"
                >
                <span>{{letter(answerIndex)}}.{{answer}}</span>
              </li>
            </ul>
          </li>
        </ul>
        <span class="jiaojuan" @click="submitAnswers">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "wenjuan",
  mounted() {
    this.getQuestionNaire();
  },
  data() {
    return {
      naire: [],
      picked: "",
      test: [],
      checkedNames: {},
      formAnswer: {},
      canSubmit: false,
      selectWord: [],
      selectIcon: [],
      canSubmit: false
    };
  },
  computed: {
    letter: function() {
      return function(index) {
        return String.fromCharCode(65 + index);
      };
    }
  },
  methods: {
    getQuestionNaire() {
      this.axios.get("/api/getNaire").then(res => {
        let testData = res.data.naire;

        for (let i = 0; i < testData.length; i++) {
          Vue.set(this.checkedNames, `ans${i}`, []);
          Vue.set(this.formAnswer, `ans${i}`, []);
        }

        this.test = testData;
      });
    },
    selectAns(ansIndex, queIndex) {
      let i = parseInt(ansIndex);

      if (!(this.checkedNames[`ans${queIndex}`] instanceof Array)) {
        console.log("单选");

        this.formAnswer[`ans${queIndex}`][0] = this.checkedNames[
          `ans${queIndex}`
        ];
      } else if (this.checkedNames[`ans${queIndex}`] instanceof Array) {
        console.log("双选");
        this.formAnswer[`ans${queIndex}`] = this.checkedNames[`ans${queIndex}`];
        this.formAnswer[`ans${queIndex}`] = this.formAnswer[`ans${queIndex}`]
          .map(function(opt, index) {
            return opt;
          })
          .sort();
      }
      // console.log(this.checkedNames);

      // console.log(this.formAnswer);
    },
    submitAnswers() {
      for (let item in this.checkedNames) {
        if (this.checkedNames[item].length <= 0) {
          return this.$messagebox.alert("还有问题没有回答，请回答完毕再提交");
        }
      }

      console.log(this.checkedNames);

      // console.log(this.formAnswer);

      this.axios.post("/api/submitNaireAnswers", this.formAnswer).then(res => {
        if (res.data.err_code === 200) {
          let query = {
            message: res.data.message,
            getMedicalBeans: res.data.getMedicalBeans
          };
          return this.$router.push({ path: "/signInSucc", query: query });
        }
        return this.$messagebox.alert(res.data.message);
      });
    },
    huitui() {
      if (this.$route.query.goindex === "true") {
        this.$router.push("/");
      } else {
        this.$router.back(-1);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shouye {
  .toubu {
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 0.25rem;
    background: #fff;
    // border-bottom: 12px solid #f1f1f1;
    .icon {
      float: left;
    }
    .biaoti {
      text-align: center;
      margin: 0 1rem;
    }
  }
  .ceyan {
    .form {
      overflow: hidden;
      background: #eee;
      ul {
        overflow: hidden;
        .timu {
          margin-top: 0.3rem;
          background: #fff;
          ul {
            .wenti {
              border-bottom: 1px solid #ccc;
              overflow: hidden;
              padding: 0.15rem 0.2rem 0.15rem 0.2rem;
            }
            .xuanze {
              border-bottom: 1px solid #ccc;
              overflow: hidden;
              padding: 0.15rem 0.2rem 0.15rem 0.2rem;
              .daan {
                float: right;
              }
            }
          }
        }
      }
      .jiaojuan {
        display: block;
        width: 40%;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #19e889;
        text-align: center;
        color: #fff;
        font-size: 0.28rem;
        margin: 0.6rem auto;
        border: none;
        outline: none;
        border-radius: 4px;
      }
    }
  }
}
</style>
