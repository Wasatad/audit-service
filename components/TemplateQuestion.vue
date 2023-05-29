<template>
  <div class="template-question">
    <div class="question-body">
      <el-input
        class="question-title"
        type="textarea"
        :autosize="true"
        resize="none"
        v-model="question.question"
        @change="updateTemplate"
      >
      </el-input>
      <div
        :class="[
          question.answer.length == 0 ? 'empty-template-answer' : '',
          'template-blockquote',
        ]"
      >
        <client-only>
          <blockquote>
            <quill-editor
              ref="editor"
              v-model="questionAnswerModifier"
              @blur="handleBlur"
              @focus="handleFocus"
              @change="onEditorChange($event)"
              :options="editorOption"
            />
          </blockquote>
        </client-only>
      </div>
    </div>

    <el-popconfirm
      confirm-button-text="Да"
      cancel-button-text="Нет, спасибо"
      icon="el-icon-info"
      icon-color="#6941C7"
      title="Хотите удалить вопрос?"
      @confirm="deleteQuestion"
    >
      <div class="close-icon" slot="reference">
        <img src="@/assets/img/icons/small-close.svg" alt="" />
      </div>
    </el-popconfirm>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: ["question", "chapterName", "sectionName"],

  data() {
    return {
      questionAnswerModifier: "",
      editorOption: {
        // Some Quill options...
        theme: "snow",
        placeholder: "Комментарий...",
        modules: {
          toolbar: [
            [{ font: [] }, { size: [] }],
            ["bold", "italic", "underline", "strike"],
            [
              {
                color: [
                  "#6941C7",
                  "#0D0F14",
                  "#70CFAA",
                  "#70CFAA",
                  "#FFF2CD",
                  "#F9D05F",
                  "#FFE0E5",
                  "#F84F68",
                  "#888888",
                ],
              },
              { background: [] },
            ],
            [{ script: "super" }, { script: "sub" }],
            [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["direction", { align: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
      },
    };
  },
  watch: {
    questionAnswerModifier(newQuestion, oldQuestion) {
      if (newQuestion) {
        this.question.answer =
          "<p><br></p><p><br></p><blockquote>" +
          this.questionAnswerModifier +
          "</blockquote>";
      } else {
        this.question.answer = "";
      }
    },
  },
  computed: {},
  methods: {
    ...mapMutations(["setStatus", "deleteTemplateQuestion"]),
    ...mapActions(["updateTemplate"]),

    onEditorChange({ quill, html, text, param }) {
      quill.focus();
    },

    handleBlur(e) {
      this.updateTemplate();
      // Скрываем панель инструментов
      if (!document.activeElement.classList.contains("ql-picker-label")) {
        let editingPanel = e.container.parentNode.querySelector(".ql-toolbar");
        if (editingPanel.classList.contains("show-editing")) {
          editingPanel.classList.remove("show-editing");
        }
      }
    },
    handleFocus(e) {
      //Переносим все фотки в data
      // Показываем панель инструментов
      let editingPanel = e.container.parentNode.querySelector(".ql-toolbar");
      editingPanel.classList.add("show-editing");
    },
    deleteQuestion(e) {
      this.deleteTemplateQuestion({
        chapterName: this.chapterName,
        sectionName: this.sectionName,
        question: this.question.question,
      });
      this.updateTemplate();
    },
  },
  mounted() {
    let innerText = this.question.answer.match(
      /<p><br><\/p><blockquote[^>]*>([\s\S]*?)<\/blockquote>/
    );
    if (innerText) {
      this.questionAnswerModifier = innerText[1];
    } else {
      this.questionAnswerModifier = this.question.answer;
    }
    console.log(this.question.id);
  },
};
</script>

<style lang="scss">
.empty-template-answer {
  opacity: 0.3;
}

.template-question {
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #ebebfc;

  .question-title {
    margin-top: 8px;
    margin-bottom: 18px;
    max-width: 1000px;

    .el-textarea__inner {
      font-size: 18px;
      font-weight: 700;
      color: $black;
      border: none;
      padding: 0;
      width: 100% !important;
    }
  }
  .question-body {
    font-weight: 400;
    font-size: 15px;
    line-height: 130%;
    width: 100%;
  }
  .close-icon {
    min-width: 22px;
    min-height: 22px;
    margin-left: auto;
    background-color: rgba(235, 235, 242, 1);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: #f84f68;
    }
  }
}

.template-blockquote {
  blockquote {
    padding-bottom: 16px !important;
    &::before {
      padding-top: 16px;
    }
  }
}
</style>
