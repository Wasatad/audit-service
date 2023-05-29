<template>
  <div class="section-wrapper">
    <div class="expand-panel">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <div>{{ questionsSection.name }}</div>
            <div class="section-progress">
              <div class="progress-base">
                <div
                  :class="[
                    { 'red-bar': progressPercent < 20 },
                    {
                      'yellow-bar':
                        progressPercent > 20 && progressPercent < 100,
                    },
                    { 'green-bar': progressPercent == 100 },
                    'progress-top',
                  ]"
                  :style="{ width: progressPercent + '%' }"
                ></div>
              </div>
              <div class="questions-qty">
                ({{ answeredQuestions }}/{{
                  questionsSection.questions.length
                }})
              </div>
            </div>
          </template>
          <vue-lazy-component :threshold="lazyThreshold">
            <checklist-question
              v-for="(question, index) in questionsSection.questions"
              :key="question.id"
              v-bind:question="question"
              v-bind:chapterName="chapterName"
              v-bind:sectionName="questionsSection.name"
            ></checklist-question>
          </vue-lazy-component>
          <el-button
            v-if="
              (chapterName == 'content' && user.role == 'editor') ||
              (chapterName == 'ui' && user.role == 'designer') ||
              (chapterName == 'ux' && user.role == 'designer') ||
              user.admin
            "
            @click="addNewQuestion"
            class="addBtn"
            type="primary"
          >
            <div class="addQuestionIcon">
              <img src="@/assets/img/icons/add-plus.svg" alt="" />
            </div>
            Добавить пункт</el-button
          >
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { component as VueLazyComponent } from "@xunlei/vue-lazy-component";
import ChecklistQuestion from "@/components/ChecklistQuestion.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: { ChecklistQuestion, "vue-lazy-component": VueLazyComponent },
  props: ["questionsSection", "chapterName"],
  data() {
    return {
      lazyThreshold: "200px",
      activeNames: ["1"],
      questions: [
        {
          question: "Есть ли УТП в 1 экране на главной странице?",
          answer: "Да",
        },
        {
          question: "Есть ли CTA в 1 экране на главной странице?",
          answer: "",
        },
        { question: "Есть ли УТП в 1 экране на главной странице?", answer: "" },
      ],
    };
  },
  methods: {
    ...mapMutations(["addQuestion"]),
    handleChange(val) {
      console.log(val);
    },
    addNewQuestion() {
      // console.log(1);
      this.addQuestion({
        chapterName: this.chapterName,
        sectionName: this.questionsSection.name,
      });
    },
  },
  computed: {
    ...mapState(["user"]),
    progressPercent() {
      let allQuestions = this.questionsSection.questions.length;
      let emptyQuestions = this.questionsSection.questions.filter(function (
        el
      ) {
        return el.answer != "" && el.status != "";
      }).length;
      return Math.trunc((emptyQuestions / allQuestions) * 100);
    },
    answeredQuestions() {
      let emptyQuestions = this.questionsSection.questions.filter(function (
        el
      ) {
        return el.answer != "" && el.status != "";
      });
      return emptyQuestions.length;
    },
  },
  mounted() {
    // console.log(this.section);
  },
};
</script>

<style lang="scss">
.expand-panel {
  margin-bottom: 32px;
}
.el-collapse {
  border: none !important;
}

.el-collapse-item__arrow {
  margin: 0 !important;
}

.el-collapse-item__header {
  background-color: rgba(216, 216, 255, 0.32) !important;
  height: 76px;
  padding: 0 28px 0 40px;
  font-size: 18px;
  color: #5c5374 !important;
  font-weight: 400;
  border-radius: 12px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-collapse-item__header.is-active {
  border-radius: 12px 12px 0 0;
}

.el-collapse-item__arrow:before {
  content: url("@/assets/img/icons/expand-arrow.svg");
  width: 32px;
  height: 32px;
}

.el-collapse-item__wrap {
  padding: 40px 32px 16px 35px;
  border-radius: 0 0 12px 12px;
  border: none !important;
}

.section-progress {
  margin-left: auto;
  margin-right: 40px;
  font-size: 14px;

  display: flex;
  justify-content: flex-start;
  gap: 14px;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }

  .progress-base {
    position: relative;
    width: 170px;
    background-color: #fff;
    height: 3px;
    border-radius: 3px;
    overflow: hidden;

    .progress-top {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 3px;
    }
    .red-bar {
      background-color: #ff0035;
    }
    .yellow-bar {
      background-color: #f9d05f;
    }
    .green-bar {
      background-color: $green;
    }
  }
}

.addBtn {
  background-color: rgba(0, 0, 0, 0) !important;
  border: none;
  padding: 0;
  margin-left: 4px;

  span {
    color: $black;
    font-size: 18px;
    font-weight: 700;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
    transition: 0.2s ease-in-out;
    &:hover {
      color: $mainPurple;
    }
  }

  .addQuestionIcon {
    width: 34px;
    height: 34px;
    background-color: $black;
    border-radius: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in-out;
  }

  &:hover {
    .addQuestionIcon {
      background-color: $mainPurple;
    }
  }
}
</style>
