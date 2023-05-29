<template>
  <div v-if="Object.keys(template).length > 0" class="template-container">
    <div class="metrics-template">
      <div class="section-header">
        <div class="section-info">
          <h2 class="section-title">Метрика</h2>
          <div class="section-description">
            Анализ поведения пользователей на сайте
          </div>
        </div>
      </div>
      <div>
        <client-only>
          <quill-editor
            class="quill-textarea"
            ref="editor"
            v-model="template.metrics"
            @blur="handleBlur"
            @focus="handleFocus"
            @change="onEditorChange($event)"
            :options="editorOption"
          />
        </client-only>
      </div>
    </div>
    <div class="metrics-template">
      <div class="section-header">
        <div class="section-info">
          <h2 class="section-title">Производительность</h2>
          <div class="section-description">
            Скорость загрузки сайта. Ключевые показатели.
          </div>
        </div>
      </div>
      <div>
        <client-only>
          <quill-editor
            class="quill-textarea"
            ref="editor"
            v-model="template.perfomance.summary"
            @blur="handleBlur"
            @focus="handleFocus"
            @change="onEditorChange($event)"
            :options="editorOption"
          />
        </client-only>
      </div>
    </div>
    <div class="metrics-template">
      <div class="section-header">
        <div class="section-info">
          <h2 class="section-title">Вывод</h2>
          <div class="section-description">
            Основные заключения по итогам аудита.
          </div>
        </div>
      </div>
      <div>
        <client-only>
          <quill-editor
            class="quill-textarea"
            ref="editor"
            v-model="template.summary"
            @blur="handleBlur"
            @focus="handleFocus"
            @change="onEditorChange($event)"
            :options="editorOption"
          />
        </client-only>
      </div>
    </div>
    <div>
      <div class="section-header">
        <div class="section-info">
          <h2 class="section-title">Лидген и контент</h2>
          <div class="section-description">
            Насколько ключевые страницы сайта отвечают поставленным задачам?
            <br />Что мешает конвертировать трафик в заявки?
          </div>
        </div>
      </div>
      <template-section
        v-for="(section, id) in template.content.sections"
        :key="id"
        v-bind:questionsSection="section"
        v-bind:chapterName="'content'"
      ></template-section>
    </div>
    <div>
      <div class="section-header">
        <div class="section-info">
          <h2 class="section-title">UI-факторы</h2>
          <div class="section-description">
            <div class="section-description">
              User Interface Design - это “то, что делает сайт красивым”.
              Оформление элементов интерфейса сайта влияет на конверсию.
              Соблюдение базовых принципов веб-дизайна упрощает работу с
              материалом страницы, располагает пользователя, повышает доверие к
              бренду и быстрее приводит посетителей к цели.
            </div>
          </div>
        </div>
      </div>
      <template-section
        v-for="(section, id) in template.ui.sections"
        :key="id"
        v-bind:questionsSection="section"
        v-bind:chapterName="'content'"
      ></template-section>
    </div>
    <div>
      <div class="section-header">
        <div class="section-info">
          <h2 class="section-title">UX-факторы</h2>
          <div class="section-description">
            <div class="section-description">
              User Experience - это пользовательский опыт, то, что делает сайт
              удобным. Насколько вашим пользователям на вашем сайте? Получают ли
              они то, за чем пришли?
            </div>
          </div>
        </div>
      </div>
      <template-section
        v-for="(section, id) in template.ux.sections"
        :key="id"
        v-bind:questionsSection="section"
        v-bind:chapterName="'content'"
      ></template-section>
    </div>
  </div>
</template>

<script>
import TemplateSection from "@/components/TemplateSection.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { TemplateSection },
  middleware: ["auth"],
  data() {
    return {
      templateImages: [],
      editorOption: {
        // Some Quill options...
        theme: "snow",
        placeholder: "Комментарий...",
        modules: {
          imageResize: true,
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
          imageUploader: {
            upload: (file) => {
              return new Promise(async (resolve, reject) => {
                let url = await this.uploadImageToTemplate({ file: file });
                this.templateImages.push(url.split("?")[0].slice(-20));
                resolve(url);
              });
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState(["template", "user"]),
  },
  methods: {
    ...mapActions([
      "getTemplate",
      "updateTemplate",
      "uploadImageToTemplate",
      "removeImageFromTemplate",
    ]),
    onEditorChange({ quill, html, text, param }) {
      quill.focus();
    },
    async addImageHandler(image, Editor, cursorLocation, resetUploader) {
      console.log("image has added!");
    },
    handleBlur(e) {
      this.updateTemplate();
      // Скрываем панель инструментов
      // Удаляем загруженные фотографии, к которым больше нет доступа (удалены из проекта)
      let existingImages = e.container.querySelectorAll(".ql-editor img");
      let list = Array.from(existingImages);
      let existingImagesNames = [];
      for (let image of list) {
        existingImagesNames.push(image.currentSrc.split("?")[0].slice(-20));
      }
      console.log(existingImagesNames);

      for (let i = 0; i < this.templateImages.length; i++) {
        const r1 = existingImagesNames.find(
          (image) => image === this.templateImages[i]
        );
        if (r1) {
        } else {
          console.log(this.templateImages[i]);
          this.removeImageFromTemplate({ imageID: this.templateImages[i] });
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
      // Показываем панель инструментов
      //Переносим все фотки в data

      if (this.templateImages.length == 0) {
        let allImages = e.container.querySelectorAll(".ql-editor img");
        let list = Array.from(allImages);
        for (let image of list) {
          this.templateImages.push(image.currentSrc.split("?")[0].slice(-20));
        }
      }
      console.log(this.templateImages);
      // Показываем панель инструментов
      let editingPanel = e.container.parentNode.querySelector(".ql-toolbar");
      editingPanel.classList.add("show-editing");
    },
  },
  async mounted() {
    if (this.user.admin) {
      await this.getTemplate();
    } else {
      this.$router.push("/");
    }
  },
};
</script>
<style lang="scss">
.template-container {
  margin-top: 64px;
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 32px;
    &:not(:first-child) {
      margin-top: 80px;
    }

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
  .metrics-template {
    margin-bottom: 32px;
    .quill-textarea {
      background-color: #fff;
      padding: 32px;
      border-radius: 12px;
      min-height: 200px;
      margin-bottom: 56px;
    }
  }
}
</style>
