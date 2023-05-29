<template>
  <div class="template-question">
    <div class="question-body">
      <!-- <h3 class="question-title">
        {{ question.question }}
      </h3> -->
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
        <!-- <div>{{ questionAnswerModifier }}</div> -->
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
      <!-- <el-button slot="reference">
        <div>
          <img src="@/assets/img/icons/small-close.svg" alt="" />
        </div> -->

      <!-- <div @click="deleteQuestion" class="close-icon">
          <img src="@/assets/img/icons/small-close.svg" alt="" />
        </div> -->
      <!-- </el-button> -->
    </el-popconfirm>
  </div>
</template>

<script>
// import { VueEditor, Quill } from "vue2-editor";
// import VueEditor from "vue2-editor";
// import ImageResize from "quill-image-resize-module";

// Quill.register("modules/imageResize", ImageResize);

/////////////

// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";

// import { quillEditor } from "vue-quill-editor";
// import { uid } from "uid";

////////////

import { mapMutations, mapActions } from "vuex";
export default {
  props: ["question", "chapterName", "sectionName"],
  // components: { VueEditor },
  // components: {
  //   quillEditor,
  // },
  data() {
    return {
      // answer: "",
      // vue2content: "",
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
      // this.question.answer = "<span>" + this.questionAnswerModifier + "</span>";
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
    // updateDoc() {
    //   console.log("updated");
    //   // this.updateProject();
    //   this.updateTemplate()
    // },
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
    // this.question.id = "";

    let innerText = this.question.answer.match(
      /<p><br><\/p><blockquote[^>]*>([\s\S]*?)<\/blockquote>/
    );
    if (innerText) {
      this.questionAnswerModifier = innerText[1];
    } else {
      this.questionAnswerModifier = this.question.answer;
    }

    // this.question.id = uid();
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
  // transition: 0.2s ease-in-out;
  blockquote {
    padding-bottom: 16px !important;
    &::before {
      padding-top: 16px;
    }
  }

  // .ql-editor {
  //   border: none !important;
  //   min-height: 20px !important;
  //   font-size: 15px;
  //   padding: 0 !important;
  //   width: 100%;
  //   color: $black;
  //   font-weight: 400;
  // }

  // .ql-editor.ql-blank::before {
  //   left: 0 !important;
  //   font-style: normal;
  // }
  // .ql-toolbar {
  //   visibility: hidden;
  //   position: fixed;
  //   top: 0;
  //   // left: 134px;
  //   width: 100%;
  //   left: 50%;
  //   transform: translate(-50%, -100%);
  //   display: flex;
  //   justify-content: center;

  //   // max-width: 1000px;
  //   // margin-left: 80px;
  //   z-index: 100;
  //   // width: calc(100% - 300px);
  //   // max-width: 1279px;
  //   // left: -80px;
  //   // max-width: 1110px;
  //   // transform: translate(-100%);

  //   // display: flex;
  //   // justify-content: center;
  //   background-color: #fff;
  //   border: none !important;
  //   transition: 0.2s ease-in-out;
  // }
  // // .hide-editing {
  // //   // display: none;
  // //   visibility: hidden;
  // //   position: absolute;
  // // }
  // .show-editing {
  //   // position: static !important;
  //   // visibility: visible !important;
  //   visibility: visible;
  //   // transform: translate(-95px, 0);
  //   box-shadow: 0px 7px 14px rgba(83, 64, 128, 0.09);
  //   transform: translate(-50%, 0);
  // }

  // // Text-ediror style
  // .ql-container {
  //   border: none !important;
  // }
  // .ql-editor.ql-blank {
  //   &:before {
  //     color: #d2d2d2 !important;
  //   }
  // }
}
</style>
