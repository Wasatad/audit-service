<template>
  <div class="result-question">
    <div :class="[iconClass, 'question-icon']"></div>
    <div class="question-body">
      <h3 class="question-title">
        {{ question.question }}
      </h3>
      <div class="answer" v-html="question.answer"></div>
      <div v-if="question.note" class="note">
        <div class="note-title">Почему это важно?</div>
        <div class="note-text">
          {{ question.note }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["question", "sectionName"],
  data() {
    return {
      // answer: "",
    };
  },
  computed: {
    iconClass() {
      if (this.question.status == "yellow") {
        return "status-yellow";
      } else if (this.question.status == "green") {
        return "status-green";
      } else if (this.question.status == "red") {
        return "status-red";
      }
    },
  },
};
</script>

<style lang="scss">
.result-question {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  // padding-bottom: 32px;
  padding: 32px 32px 32px 40px;
  // border-bottom: 1px solid #ebebfc;

  img {
    max-width: 100%;
    cursor: default !important;
  }

  .status-yellow {
    min-width: 40px;
    min-height: 40px;
    background-color: rgba(255, 242, 205, 1);
    border: 1px solid rgba(255, 242, 205, 1);

    border-radius: 4px;

    background-image: url("@/assets/img/icons/yellow-face.svg");
    background-repeat: no-repeat;
    background-position: center;
  }

  .status-green {
    min-width: 40px;
    min-height: 40px;
    background-color: rgba(219, 244, 233, 1);
    border: 1px solid rgba(219, 244, 233, 1);

    border-radius: 4px;

    background-image: url("@/assets/img/icons/green-face.svg");
    background-repeat: no-repeat;
    background-position: center;
  }

  .status-red {
    min-width: 40px;
    min-height: 40px;
    background-color: rgba(255, 224, 229, 1);
    border: 1px solid rgba(255, 224, 229, 1);

    border-radius: 4px;

    background-image: url("@/assets/img/icons/red-face.svg");
    background-repeat: no-repeat;
    background-position: center;
  }

  .question-icon {
    min-width: 40px;
    min-height: 40px;
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 18px;
    color: #8f8fcd;
    line-height: 2;

    border-radius: 4px;
  }

  .question-title {
    margin-top: 8px;
    margin-bottom: 18px;
    max-width: 1000px;
  }
  .question-body {
    font-weight: 400;
    font-size: 15px;
    line-height: 130%;
    width: 100%;
  }

  .note {
    margin: 32px 0 24px 0;
    background-color: rgba(105, 65, 199, 0.04);
    width: 100%;
    padding: 26px 36px;
    border-left: 3px solid $mainPurple;
    .note-title {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 12px;
      color: $mainPurple;
    }
  }
}
</style>
