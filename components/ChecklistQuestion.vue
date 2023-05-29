<template>
  <div class="question">
    <div
      v-if="
        (chapterName == 'content' && user.role == 'editor') ||
        (chapterName == 'ui' && user.role == 'designer') ||
        (chapterName == 'ux' && user.role == 'designer') ||
        user.admin
      "
      @click.self="openFaceIcons"
      :class="[iconClass, 'question-icon']"
    >
      <div @click.self="setQuestionStatus('green')" class="popup-icon-green">
        <img
          @click.self="setQuestionStatus('green')"
          src="@/assets/img/icons/green-face.svg"
          alt=""
        />
      </div>
      <div @click.self="setQuestionStatus('yellow')" class="popup-icon-yellow">
        <img
          @click.self="setQuestionStatus('yellow')"
          src="@/assets/img/icons/yellow-face.svg"
          alt=""
        />
      </div>
      <div @click.self="setQuestionStatus('red')" class="popup-icon-red">
        <img
          @click.self="setQuestionStatus('red')"
          src="@/assets/img/icons/red-face.svg"
          alt=""
        />
      </div>
    </div>

    <div v-else :class="[iconClass]"></div>
    <div class="question-body">
      <el-input
        v-if="
          (chapterName == 'content' && user.role == 'editor') ||
          (chapterName == 'ui' && user.role == 'designer') ||
          (chapterName == 'ux' && user.role == 'designer') ||
          user.admin
        "
        class="question-title"
        type="textarea"
        :autosize="true"
        resize="none"
        v-model="question.question"
        @change="updateAudit"
      >
      </el-input>

      <h3 v-else class="question-title">
        {{ question.question }}
      </h3>

      <!-- <el-input
        class="answer"
        type="textarea"
        :autosize="true"
        resize="none"
        :rows="2"
        placeholder="Введите текст комментария"
        v-model="question.answer"
        @change="updateAudit"
      >
      </el-input> -->
      <!-- <client-only>
        <quill-editor
          :options="editorOption"
          @focus="showEditPanel"
          @blur="hideEditPanel"
          @text-change="updateAudit"
          useCustomImageHandler
          @image-added="addImageHandler"
          @image-removed="removeImageHandler"
          v-model="question.answer"
        >
        </quill-editor>
      </client-only> -->
      <!-- <div></div> -->
      <!-- <client-only>
        <div ref="editor">
          <quill-editor
            @text-change="updateAudit"
            v-model="question.answer"
            contentType="html"
            @focus="showEditPanel"
            @blur="hideEditPanel"
          ></quill-editor>
        </div>
      </client-only> -->

      <!-- <client-only>
        <vue-editor
          :options="editorOption"
          @focus="showEditPanel"
          @blur="hideEditPanel"
          @text-change="updateAudit"
          useCustomImageHandler
          @image-added="addImageHandler"
          @image-removed="removeImageHandler"
          placeholder="Введите текст комментария"
          v-model="question.answer"
        />
      </client-only> -->
      <!-- <client-only>
        <vue-editor
          :options="editorOption"
          v-model="question.answer"
          @text-change="updateAudit"
          @focus="showEditPanel"
          @blur="hideEditPanel"
          useCustomImageHandler
          @image-added="addImageHandler"
          @image-removed="removeImageHandler"
          placeholder="Введите текст комментария"
        ></vue-editor>
      </client-only> -->
      <div
        v-if="
          (chapterName == 'content' && user.role == 'editor') ||
          (chapterName == 'ui' && user.role == 'designer') ||
          (chapterName == 'ux' && user.role == 'designer') ||
          user.admin
        "
      >
        <client-only>
          <quill-editor
            ref="editor"
            v-model="question.answer"
            @blur="handleBlur"
            @focus="handleFocus"
            @change="onEditorChange($event)"
            :options="editorOption"
          />
        </client-only>
      </div>
      <div v-else v-html="question.answer"></div>
    </div>
    <!-- <div @click="deleteCurrentQuestion" class="close-icon">
      <img src="@/assets/img/icons/small-close.svg" alt="" />
    </div> -->
    <div
      v-if="
        (chapterName == 'content' && user.role == 'editor') ||
        (chapterName == 'ui' && user.role == 'designer') ||
        (chapterName == 'ux' && user.role == 'designer') ||
        user.admin
      "
      @click="saveCurrentTarget($event)"
    >
      <el-popconfirm
        confirm-button-text="Да"
        cancel-button-text="Нет, спасибо"
        icon="el-icon-info"
        icon-color="#6941C7"
        title="Хотите удалить вопрос?"
        @confirm="deleteCurrentQuestion($event)"
      >
        <div class="close-icon" slot="reference">
          <img src="@/assets/img/icons/small-close.svg" alt="" />
        </div>
      </el-popconfirm>
    </div>
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

////////////

import { mapMutations, mapActions, mapState } from "vuex";
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
      questionDOMnode: {},
      questionImages: [],
      content: "<p>I am Example</p>",
      editorOption: {
        // Some Quill options...
        theme: "snow",
        placeholder: "Комментарий...",
        modules: {
          imageResize: true,
          // imageDrop: true,
          toolbar: [
            [{ font: [] }, { size: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "super" }, { script: "sub" }],
            ["blockquote", "code-block"],
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
          imageUploader: {
            upload: (file) => {
              return new Promise(async (resolve, reject) => {
                let url = await this.uploadImageToProject({ file: file });
                this.questionImages.push(url.split("?")[0].slice(-23));
                resolve(url);
              });
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState(["user"]),
    iconClass() {
      if (this.question.status == "yellow") {
        return "status-yellow";
      } else if (this.question.status == "green") {
        return "status-green";
      } else if (this.question.status == "red") {
        return "status-red";
      } else {
        return "status-empty";
      }
    },
  },
  methods: {
    ...mapMutations(["setStatus", "deleteQuestion"]),
    ...mapActions([
      "updateProject",
      "uploadImageToProject",
      "removeImageFromProject",
    ]),

    // onEditorChange({ quill, html, text }) {
    //   console.log("editor change!", quill, html, text);
    // },
    saveCurrentTarget(e) {
      console.log(e);
      this.questionDOMnode = e.target;
    },
    onEditorChange({ quill, html, text, param }) {
      // console.log("editor change!", quill, html, text);
      // console.log("editor change!");
      // console.dir(quill);
      quill.focus();

      // let existingImages = quill.container.querySelectorAll(".ql-editor img");
      // let list = Array.from(existingImages);
      // let existingImagesNames = [];
      // for (let image of list) {
      //   existingImagesNames.push(image.currentSrc.split("?")[0].slice(-23));
      // }

      // console.log(existingImagesNames);

      // for (let i = 0; i < this.questionImages.length; i++) {
      //   const r1 = existingImagesNames.find(
      //     (image) => image === this.questionImages[i]
      //   );
      //   if (r1) {
      //     // console.log(this.questionImages[i]);
      //   } else {
      //     console.log(this.questionImages[i]);
      //     this.removeImage({ imageID: this.questionImages[i] });
      //   }
      // }
    },

    async addImageHandler(image, Editor, cursorLocation, resetUploader) {
      console.log("image has added!");

      // this.uploadImage({ file: image }).then((url) => {
      //   console.log(url);
      //   Editor.insertEmbed(cursorLocation, "image", url);
      //   resetUploader();
      // });
    },
    async removeImageHandler(e) {
      console.log("iamge was removed");
      // console.log(e);
      let url = e.split("?")[0].slice(-23);
      console.log(url);
      this.removeImageFromProject({ imageID: url });
    },
    handleBlur(e) {
      this.updateAudit();

      // Удаляем загруженные фотографии, к которым больше нет доступа (удалены из проекта)
      let existingImages = e.container.querySelectorAll(".ql-editor img");
      let list = Array.from(existingImages);
      let existingImagesNames = [];
      for (let image of list) {
        existingImagesNames.push(image.currentSrc.split("?")[0].slice(-23));
      }

      console.log(existingImagesNames);

      for (let i = 0; i < this.questionImages.length; i++) {
        const r1 = existingImagesNames.find(
          (image) => image === this.questionImages[i]
        );
        if (r1) {
        } else {
          console.log(this.questionImages[i]);
          this.removeImageFromProject({ imageID: this.questionImages[i] });
        }
      }

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

      if (this.questionImages.length == 0) {
        let allImages = e.container.querySelectorAll(".ql-editor img");
        let list = Array.from(allImages);
        for (let image of list) {
          this.questionImages.push(image.currentSrc.split("?")[0].slice(-23));
        }
      }
      console.log(this.questionImages);
      // Показываем панель инструментов
      let editingPanel = e.container.parentNode.querySelector(".ql-toolbar");
      editingPanel.classList.add("show-editing");
    },
    updateAudit() {
      console.log("updated");
      this.updateProject();
    },
    openFaceIcons(e) {
      console.log("click from box");
      let greenIcon = e.target.parentNode.querySelector(".popup-icon-green");
      if (greenIcon.classList.contains("active-icon")) {
        greenIcon.classList.remove("active-icon");
        greenIcon.classList.add("hidden-icon");
      } else {
        greenIcon.classList.remove("hidden-icon");
        greenIcon.classList.add("active-icon");
      }

      let yellowIcon = e.target.parentNode.querySelector(".popup-icon-yellow");
      setTimeout(() => {
        if (yellowIcon.classList.contains("active-icon")) {
          yellowIcon.classList.remove("active-icon");
          yellowIcon.classList.add("hidden-icon");
        } else {
          yellowIcon.classList.remove("hidden-icon");
          yellowIcon.classList.add("active-icon");
        }
      }, 50);

      let redIcon = e.target.parentNode.querySelector(".popup-icon-red");
      setTimeout(() => {
        if (redIcon.classList.contains("active-icon")) {
          redIcon.classList.remove("active-icon");
          redIcon.classList.add("hidden-icon");
        } else {
          redIcon.classList.remove("hidden-icon");
          redIcon.classList.add("active-icon");
        }
      }, 100);
    },

    setQuestionStatus(icon) {
      this.setStatus({
        chapterName: this.chapterName,
        sectionName: this.sectionName,
        question: this.question.question,
        status: icon,
      });
      this.updateAudit();

      let greenIcons = document.querySelectorAll(".popup-icon-green");
      let greenIconsArr = [...greenIcons];

      greenIconsArr.forEach((icon) => {
        if (icon.classList.contains("active-icon")) {
          icon.classList.remove("active-icon");
          icon.classList.add("hidden-icon");
        }
      });

      let yellowIcons = document.querySelectorAll(".popup-icon-yellow");
      let yellowIconsArr = [...yellowIcons];

      yellowIconsArr.forEach((icon) => {
        setTimeout(() => {
          if (icon.classList.contains("active-icon")) {
            icon.classList.remove("active-icon");
            icon.classList.add("hidden-icon");
          }
        }, 50);
      });

      let redIcons = document.querySelectorAll(".popup-icon-red");
      let redIconsArr = [...redIcons];
      redIconsArr.forEach((icon) => {
        setTimeout(() => {
          if (icon.classList.contains("active-icon")) {
            icon.classList.remove("active-icon");
            icon.classList.add("hidden-icon");
          }
        }, 100);
      });
    },
    deleteCurrentQuestion() {
      console.log(this.questionDOMnode);
      let imagesContainer = this.questionDOMnode
        .closest(".question")
        .querySelector(".ql-editor");
      let images = imagesContainer.querySelectorAll("img");
      console.log(images);

      let list = Array.from(images);
      console.log(list);
      for (let item of list) {
        console.log(item.currentSrc.split("?")[0].slice(-11));
        this.removeImageFromProject({
          imageID: item.currentSrc.split("?")[0].slice(-11),
        });
      }

      this.deleteQuestion({
        chapterName: this.chapterName,
        sectionName: this.sectionName,
        id: this.question.id,
      });

      this.updateAudit();
      // this.$refs.editor.quill.blur();
      setTimeout(() => {
        this.$refs.editor.quill.blur();
      }, 100);
      // setTimeout(() => {
      //   // console.log("deleted");
      //   // let target = document.querySelector(".main-container");
      //   // console.log(target);
      //   // target.click();
      //   console.log(this.$refs.editor.quill);
      //   this.$refs.editor.quill.blur();
      // }, 3000);
    },
  },
  mounted() {
    let icons = document.querySelectorAll(".active-icon");
    let iconsArr = [...icons];
    iconsArr.forEach((icon) => {
      if (icon.classList.contains("active-icon")) {
        icon.classList.remove("active-icon");
      }
    });
  },
};
</script>

<style lang="scss">
.ql-editor {
  border: none !important;
  font-size: 15px;
  padding: 0 !important;
  width: 100%;
  color: $black;
  font-weight: 400;
}

.ql-editor.ql-blank::before {
  left: 0 !important;
  font-style: normal;
}

.question {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #ebebfc;

  .status-empty {
    min-width: 40px;
    min-height: 40px;
    border: 1px solid #ebebfc;

    border-radius: 4px;

    background-image: url("@/assets/img/icons/small-plus.svg");
    background-repeat: no-repeat;
    background-position: center;
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

    cursor: pointer;

    .active-icon {
      animation: show-icon 0.2s;
      visibility: visible !important;
    }
    // .remove-on-mounted {
    //   display: none !important;
    // }
    .hidden-icon {
      visibility: hidden;
      animation: hide-icon 0.2s;
    }

    @keyframes show-icon {
      0% {
        visibility: visible;
        transform: translateX(-20px);
        opacity: 0;
      }

      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes hide-icon {
      0% {
        visibility: visible;
        transform: translateX(0);
        opacity: 1;
      }

      100% {
        transform: translateX(-20px);
        opacity: 0;
      }
    }

    .popup-icon-green {
      min-width: 40px;
      min-height: 40px;
      background-color: rgba(219, 244, 233, 1);
      position: absolute;
      top: -1px;
      right: -46px;
      border-radius: 4px;
      z-index: 100;

      display: flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
    }

    .popup-icon-yellow {
      min-width: 40px;
      min-height: 40px;
      background-color: rgba(255, 242, 205, 1);
      position: absolute;
      top: -1px;
      right: -92px;
      border-radius: 4px;
      z-index: 100;

      display: flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
    }
    .popup-icon-red {
      min-width: 40px;
      min-height: 40px;
      background-color: rgba(255, 224, 229, 1);
      position: absolute;
      top: -1px;
      right: -138px;
      border-radius: 4px;
      z-index: 100;

      display: flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
    }
  }

  .question-title {
    margin-top: 8px;
    margin-bottom: 18px;
    max-width: 1000px;

    textarea {
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
// .ql-editor {
//   min-height: 45px !important;
// }
// .ql-container {
//   border: none !important;
// }
// .ql-editor.ql-blank {
//   &:before {
//     color: #d2d2d2 !important;
//   }
// }
</style>
