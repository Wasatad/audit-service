<template>
  <div class="result-wrapper">
    <div class="result-page">
      <h1 class="report-title">
        Аудит сайта
        <!-- <span style="color: #6941c7">{{ report.name }}</span> -->
        <a :href="currentProject.website" target="blank">{{
          currentProject.name
        }}</a>
      </h1>
      <div class="result-image">
        <div class="result-screenshot">
          <img :src="currentProject.image" alt="" />
        </div>
      </div>
      <!-- Content -->
      <div class="section-header">
        <div class="section-info">
          <h2 class="section-title">Лидген и контент</h2>
          <div class="section-description">
            Насколько ключевые страницы сайта отвечают поставленным задачам?
            <br />Что мешает конвертировать трафик в заявки?
          </div>
        </div>
      </div>
      <div
        v-for="(section, id) in content.sections"
        :key="section.name"
        class="section-wrapper"
      >
        <div class="title">{{ id + 1 }}. {{ section.name }}</div>
        <result-section
          class="result-section"
          v-for="question in section.questions"
          :key="question.question"
          v-bind:question="question"
          v-bind:sectionName="section.name"
        ></result-section>
      </div>

      <section-conclusion
        v-if="content.conclusion != 'Введите вывод'"
        v-bind:text="content.conclusion"
        v-bind:author="content.author"
      >
      </section-conclusion>

      <!-- UI -->
      <div class="section-header">
        <div class="section-info">
          <h2 class="section-title">UI</h2>
          <div class="section-description">
            User Interface Design - это “то, что делает сайт красивым”.
            Оформление элементов интерфейса сайта влияет на конверсию.
            Соблюдение базовых принципов веб-дизайна упрощает работу с
            материалом страницы, располагает пользователя, повышает доверие к
            бренду и быстрее приводит посетителей к цели.
          </div>
        </div>
      </div>
      <div
        v-for="(section, id) in ui.sections"
        :key="section.name"
        class="section-wrapper"
      >
        <div class="title">{{ id + 1 }}. {{ section.name }}</div>
        <result-section
          class="result-section"
          v-for="question in section.questions"
          :key="question.question"
          v-bind:question="question"
          v-bind:sectionName="section.name"
        ></result-section>
      </div>

      <section-conclusion
        v-if="ui.conclusion != 'Введите вывод'"
        v-bind:text="ui.conclusion"
        v-bind:author="ui.author"
      >
      </section-conclusion>

      <!-- UX -->
      <div class="section-header">
        <div class="section-info">
          <h2 class="section-title">UX-факторы</h2>
          <div class="section-description">
            User Experience - это пользовательский опыт, то, что делает сайт
            удобным. Насколько вашим пользователям на вашем сайте? Получают ли
            они то, за чем пришли?
          </div>
        </div>
      </div>
      <div
        v-for="(section, id) in ux.sections"
        :key="section.name"
        class="section-wrapper"
      >
        <div class="title">{{ id + 1 }}. {{ section.name }}</div>
        <result-section
          class="result-section"
          v-for="question in section.questions"
          :key="question.question"
          v-bind:question="question"
          v-bind:sectionName="section.name"
        ></result-section>
      </div>

      <!-- <section-conclusion
      v-if="ux.conclusion != 'Введите вывод'"
      v-bind:text="ux.conclusion"
      v-bind:author="ux.author"
    >
    </section-conclusion> -->
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  props: ["currentProject"],
  data() {
    return {
      content: {},
      ui: {},
      ux: {},
    };
  },
  methods: {
    // downloadPDF() {
    //   const html2PDF = require("jspdf-html2canvas");
    //   let downloadLink = document.createElement("a");
    //   downloadLink.setAttribute("download", "CanvasAsImage.png");

    //   let el = document.querySelector(".result-wrapper");
    //   html2canvas(el, {
    //     allowTaint: true,
    //     useCORS: true,
    //     // scale: "1.2",
    //   }).then((canvas) => {
    //     let dataURL = canvas.toDataURL("image/png");
    //     let url = dataURL.replace(
    //       /^data:image\/png/,
    //       "data:application/octet-stream"
    //     );
    //     downloadLink.setAttribute("href", url);
    //     downloadLink.click();
    //   });
    // },
    downloadPDF() {
      const html2PDF = require("jspdf-html2canvas");

      html2canvas(document.querySelector(".result-wrapper"), {
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF("p", "mm");
        doc.addImage(
          canvas,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(
            canvas,
            "PNG",
            0,
            position,
            imgWidth,
            imgHeight,
            "",
            "FAST"
          );
          heightLeft -= pageHeight;
        }
        doc.save("Downld.pdf");
      });
      this.$emit("hideReport");
    },
  },
  created() {
    // Наполняем контентом блок с результатами
    this.content = this.currentProject.data.content;

    for (let i = 0; i < this.content.sections.length; i++) {
      this.content.sections[i].questions = this.content.sections[
        i
      ].questions.filter((question) => {
        return question.answer != "";
      });
    }
    for (let i = 0; i < this.content.sections.length; i++) {
      this.content.sections = this.content.sections.filter((section) => {
        return section.questions.length > 0;
      });
    }

    this.ui = this.currentProject.data.ui;
    for (let i = 0; i < this.ui.sections.length; i++) {
      this.ui.sections[i].questions = this.ui.sections[i].questions.filter(
        (question) => {
          return question.answer != "";
        }
      );
    }
    for (let i = 0; i < this.ui.sections.length; i++) {
      this.ui.sections = this.ui.sections.filter((section) => {
        return section.questions.length > 0;
      });
    }

    this.ux = this.currentProject.data.ux;
    for (let i = 0; i < this.ux.sections.length; i++) {
      this.ux.sections[i].questions = this.ux.sections[i].questions.filter(
        (question) => {
          return question.answer != "";
        }
      );
    }
    for (let i = 0; i < this.ux.sections.length; i++) {
      this.ux.sections = this.ux.sections.filter((section) => {
        return section.questions.length > 0;
      });
    }
  },
  async mounted() {
    setTimeout(() => {
      this.downloadPDF();
    }, 5000);
  },
};
</script>

<style lang="scss">
.result-wrapper {
  z-index: 1000;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  margin: 0 auto;
  background-color: #fff;
}
.result-page {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;

  position: relative;
  .report-title {
    margin-bottom: 24px;

    a {
      color: $mainPurple;
      text-decoration: none;
    }
  }
  .result-image {
    position: relative;
    background-image: url("@/assets/img/laptop.png");
    width: 655px;
    height: 382px;
    margin-bottom: 80px;
    background-size: contain;
    filter: drop-shadow(0px 16.9792px 43.8629px rgba(0, 0, 0, 0.18));
    .result-screenshot {
      position: absolute;
      overflow: hidden;
      top: 26px;
      left: 82px;
      background-color: rgb(208, 208, 238);
      // background: url("@/assets/img/screenshots/screenshot.png");
      // background-size: cover;
      // background-repeat: no-repeat;
      width: 490px;
      height: 307px;
      img {
        width: 490px;
        height: 307px;
        object-fit: cover;
      }
    }
  }

  .section-wrapper {
    width: 100%;
    background-color: white;
    border-radius: 12px;
    margin-bottom: 32px;

    .title {
      background-color: rgba(216, 216, 255, 0.32) !important;
      height: 76px;
      padding: 0 28px 0 40px;
      font-size: 18px;
      color: #5c5374 !important;
      font-weight: 400;
      border-radius: 12px 12px 0 0;
      border: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    .result-info {
      .result-description {
        color: #969fa8;
        font-size: 15px;
        max-width: 1000px;
        text-align: center;
      }
    }
  }
  .section-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    width: 100%;
    text-align: center;
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

  .result-section:not(:last-of-type) {
    border-bottom: 1px solid #ebebfc;
  }
}
</style>
