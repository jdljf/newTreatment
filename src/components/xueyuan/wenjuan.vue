<template>
  <div class="shouye">
    <div class="toubu">
      <span class="iconfont icon-houtui icon"></span>
      <p class="biaoti">调查问卷</p>
    </div>
    <form @submit.prevent="submitAnswers">
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
    </form>
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
      formAnswer: [],
      checkedNames: {},
      canSubmit: false
    };
  },
  methods: {
    getQuestionNaire() {
      this.axios.get("/api/getNaire").then(res => {
        console.log(this.naire);

        for (let i = 0; i < res.data.naire.length; i++) {
          console.log(res.data.naire[i].selectType);
          // Vue.set(this.naire, res.data.naire[i])
          this.naire = res.data.naire;
          if (res.data.naire[i].selectType == 0) {
            Vue.set(this.checkedNames, `ans${i}`, "");
          } else if (res.data.naire[i].selectType == 1) {
            Vue.set(this.checkedNames, `ans${i}`, []);
          }
        }
      });
    },
    submitAnswers() {
      this.formAnswer = []
      Object.keys(this.checkedNames).forEach((item, index) => {
        if (this.checkedNames[item].length <= 0) {
          return this.canSubmit = false
        }
        else {
          this.formAnswer.push(this.checkedNames[item])
          this.canSubmit = true
        }
      });

      if (!this.canSubmit) {
        return alert('还有问题没有回答，请回答完毕再提交')
      }

      this.axios.post("/api/submitAnswers", this.formAnswer).then(res => {
        if (res.data.err_code === 500) {
          return alert(res.data.message);
        }
        return alert(res.data.message);
      });
      
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
}
</style>
