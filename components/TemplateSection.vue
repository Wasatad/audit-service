<template>
  <div class="template-section-wrapper">
    <div class="template-section">
      <div class="template-section-header">
        <el-input
          type="input"
          :autosize="false"
          resize="none"
          v-model="questionsSection.name"
          @change="updateTemplate"
        >
        </el-input>
        <div class="questions-qty">
          {{ questionsSection.questions.length }}
        </div>
      </div>
      <div class="template-section-content">
        <vue-lazy-component :threshold="lazyThreshold">
          <draggable v-model="questionsList" group="questions">
            <TemplateQuestion
              v-for="question in questionsSection.questions"
              :key="question.id"
              v-bind:question="question"
              v-bind:chapterName="chapterName"
              v-bind:sectionName="questionsSection.name"
            ></TemplateQuestion>
          </draggable>
        </vue-lazy-component>
        <el-button @click="addNewQuestion" class="add-btn" type="primary">
          <div class="add-question-icon">
            <img src="@/assets/img/icons/add-plus.svg" alt="" />
          </div>
          Добавить пункт</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { component as VueLazyComponent } from "@xunlei/vue-lazy-component";
import draggable from "vuedraggable";
import TemplateQuestion from "@/components/TemplateQuestion.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  components: {
    TemplateQuestion,
    "vue-lazy-component": VueLazyComponent,
    draggable,
  },
  props: ["questionsSection", "chapterName"],

  data() {
    return {
      template: {},
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
  computed: {
    questionsList: {
      get() {
        return this.questionsSection.questions;
      },
      set(value) {
        console.log(value);
        this.$store.commit("updateTemplateInStore", {
          chapterName: this.chapterName,
          sectionName: this.questionsSection.name,
          newValue: value,
        });
      },
    },
  },
  methods: {
    updateTemplate() {
      console.log("updateTemplate");
    },
    ...mapMutations(["addTemplateQuestion"]),
    ...mapActions(["updateTemplate"]),
    handleChange(val) {
      console.log(val);
    },
    addNewQuestion() {
      this.addTemplateQuestion({
        chapterName: this.chapterName,
        sectionName: this.questionsSection.name,
      });
      this.updateTemplate();
    },
  },
};
</script>

<style lang="scss">
.template-section-wrapper {
  margin-bottom: 56px;
  border-radius: 10px;
  overflow: hidden;

  .template-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding: 0 20px;
    height: 70px;
    margin-bottom: 32px;
    background: rgba(216, 216, 255, 0.32);
    .el-input {
      height: 100%;
      width: 80%;
      input {
        background-color: inherit;
        border: none;
        font-size: 18px;
        font-weight: 400;
        height: 100%;
        color: #5c5374;
      }
    }

    .questions-qty {
      font-size: 16px;

      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: rgb(143 134 165);
      border: 1px solid rgb(230 225 241);
      padding: 10px;
      border-radius: 6px;
    }
  }
}
.template-section {
  background-color: #fff;
  border-radius: 8px;
}

.template-section-content {
  padding: 0 32px 32px 32px;
}

.add-btn {
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

  .add-question-icon {
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
    .add-question-icon {
      background-color: $mainPurple;
    }
  }
}
</style>
