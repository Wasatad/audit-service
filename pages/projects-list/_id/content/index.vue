<template>
  <div class="project-page">
    <project-info></project-info>
    <project-nav></project-nav>
    <div class="section-header">
      <div class="section-info">
        <h2 class="section-title">Лидген и контент</h2>
        <div class="section-description">
          Насколько ключевые страницы сайта отвечают поставленным задачам?
          <br />Что мешает конвертировать трафик в заявки?
        </div>
      </div>
    </div>
    <checklist-section
      v-for="(section, id) in currentProject.data.content.sections"
      :key="id"
      v-bind:questionsSection="section"
      v-bind:chapterName="'content'"
    ></checklist-section>
    <div class="conclusion-container">
      <div class="conclusion-wrapper">
        <div class="title">Вывод</div>
        <div v-if="user.role == 'editor' || user.admin">
          <client-only>
            <quill-editor
              class="quill-section-textarea"
              ref="editor"
              v-model="currentProject.data.content.conclusion"
              @blur="handleBlur"
              @focus="handleFocus"
              @change="onEditorChange($event)"
              :options="editorOption"
            />
          </client-only>
        </div>
        <div
          class="conclusion-container-no-edit"
          v-else
          v-html="currentProject.data.content.conclusion"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectInfo from "@/components/ProjectInfo.vue";
import ProjectNav from "@/components/ProjectNav.vue";
import ChecklistSection from "@/components/ChecklistSection.vue";
import { mapState, mapActions } from "vuex";
export default {
  middleware: ["auth"],
  components: { ProjectInfo, ProjectNav, ChecklistSection },
  name: "IndexPage",

  data() {
    return {
      audit: "",
      questionImages: [],
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
            [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["direction", { align: [] }],
            ["link", "image", "video", "formula"],
            ["clean"],
          ],
          imageUploader: {
            upload: (file) => {
              return new Promise(async (resolve, reject) => {
                let url = await this.uploadImage({ file: file });
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
    ...mapState(["currentProject", "user"]),
  },
  methods: {
    ...mapActions(["uploadImage", "removeImage", "updateProject"]),
    onEditorChange({ quill, html, text, param }) {
      quill.focus();
    },
    async addImageHandler(image, Editor, cursorLocation, resetUploader) {
      console.log("image has added!");
    },
    async removeImageHandler(e) {
      console.log("iamge was removed");
      let url = e.split("?")[0].slice(-23);
      console.log(url);
      this.removeImage({ imageID: url });
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
          this.removeImage({ imageID: this.questionImages[i] });
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
  },
};
</script>

<style lang="scss">
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  .questions-qty {
    font-size: 14px;
    color: rgba(150, 159, 168, 1);
  }
  .section-info {
    .section-title {
      margin-bottom: 14px;
    }
    .section-description {
      color: #969fa8;
      font-size: 15px;
      max-width: 1000px;
    }
  }
}

.conclusion-container {
  margin-bottom: 32px;
  .conclusion-wrapper {
    padding: 40px;
    background-color: #fff;
    border-radius: 12px;
    .title {
      font-weight: 700;
      font-size: 28px;
      margin-bottom: 16px;
    }
  }
}

.quill-section-textarea {
  background-color: #fff;
  border-radius: 12px;
  min-height: 150px;
  margin-bottom: 32px;
}

.conclusion-container-no-edit {
  background-color: #fff;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  margin-bottom: 32px;
}
</style>
