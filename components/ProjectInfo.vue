<template>
  <div>
    <!-- <div v-if="showResult" class="print-container">
      <finished-report
        @hideReport="showResult = false"
        :currentProject="currentProject"
      ></finished-report>
    </div> -->
    <div>
      <copy-message
        v-if="copyMessageVisible"
        @closeCopyMessage="closeCopyMessage"
        :isVisible="copyMessageVisible"
      ></copy-message>
      <div class="about-project-container">
        <div class="project-info">
          <div
            @click="$router.push({ path: '/projects-list/' })"
            class="link-back"
          >
            <span><</span> Назад
          </div>
          <h1 class="project-title">
            Аудит сайта<br /><span style="color: #6941c7">{{
              currentProject.name
            }}</span>
          </h1>
          <div class="main-buttons">
            <el-button
              @click="copyLink"
              class="download"
              type="default"
              icon="fa-light fa-copy main-btn-icon"
              >Копировать ссылку</el-button
            >
            <!-- <el-button
              @click="downloadReport"
              class="copy"
              type="default"
              icon="fa-regular fa-copy main-btn-icon"
              >Скачать .pdf</el-button
            > -->
          </div>
        </div>
        <div class="project-image">
          <div class="page-screenshot">
            <img :src="currentProject.image" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const { jsPDF } = require("jspdf");
// import { html2PDF } from "jspdf-html2canvas";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

import { mapState } from "vuex";
import CopyMessage from "@/components/CopyMessage.vue";
import FinishedReport from "./FinishedReport.vue";

export default {
  components: {
    CopyMessage,
    FinishedReport,
  },

  data() {
    return {
      copyMessageVisible: false,

      // Блок с результатом
      showResult: false,
    };
  },
  computed: {
    ...mapState(["currentProject"]),
  },
  methods: {
    async downloadReport() {
      this.showResult = true;
    },
    closeCopyMessage() {
      this.copyMessageVisible = false;
    },
    async copyLink() {
      // console.log(window.location.origin);
      // console.log(this.$route.params.id);
      // console.log(location);
      await navigator.clipboard.writeText(
        window.location.origin + "/result/" + this.$route.params.id
      );
      this.copyMessageVisible = true;

      // let content = `${window.location.origin}/result/${this.$route.params.id}`;
      // console.log(content);

      // const unsecuredCopyToClipboard = (text) => {
      //   const textArea = document.createElement("textarea");
      //   textArea.value = text;
      //   document.body.appendChild(textArea);
      //   textArea.focus();
      //   textArea.select();
      //   try {
      //     document.execCommand("copy");
      //   } catch (err) {
      //     console.error("Unable to copy to clipboard", err);
      //   }
      //   document.body.removeChild(textArea);
      // };

      // const copyToClipboard = (content) => {
      //   if (window.isSecureContext && navigator.clipboard) {
      //     navigator.clipboard.writeText(content);
      //   } else {
      //     unsecuredCopyToClipboard(content);
      //   }
      // };

      // copyToClipboard();
    },

    // downloadPDF() {
    //   const html2PDF = require("jspdf-html2canvas");

    //   this.showResult = true;

    //   html2canvas(document.querySelector(".print-container"), {
    //     allowTaint: true,
    //     useCORS: true,
    //   }).then((canvas) => {
    //     const imgWidth = 208;
    //     const pageHeight = 295;
    //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //     let heightLeft = imgHeight;
    //     let position = 0;
    //     heightLeft -= pageHeight;
    //     const doc = new jsPDF("p", "mm");
    //     doc.addImage(
    //       canvas,
    //       "PNG",
    //       0,
    //       position,
    //       imgWidth,
    //       imgHeight,
    //       "",
    //       "FAST"
    //     );
    //     while (heightLeft >= 0) {
    //       position = heightLeft - imgHeight;
    //       doc.addPage();
    //       doc.addImage(
    //         canvas,
    //         "PNG",
    //         0,
    //         position,
    //         imgWidth,
    //         imgHeight,
    //         "",
    //         "FAST"
    //       );
    //       heightLeft -= pageHeight;
    //     }
    //     doc.save("Downld.pdf");
    //   });
    // },
  },
  mounted() {
    console.log("=========");
    console.log(this.currentProject);
  },
};
</script>

<style lang="scss">
.print-container {
  position: absolute;
  z-index: 1000;
  bottom: 0;
  left: 0;
  transform: translate(0, -100%);
  // transform: translateY(-100%);
}
.about-project-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 40px 0 80px 0;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    text-align: center;
  }

  .link-back {
    margin-bottom: 50px;
    color: $darkGrey;
    cursor: pointer;
    @media (max-width: 900px) {
      margin: 24px 0;
    }
    span {
      position: relative;
      top: -1px;
      margin-right: 8px;
    }
  }

  .project-title {
    margin-bottom: 50px;
    @media (max-width: 1100px) {
      font-size: 40px;
    }
    @media (max-width: 900px) {
      margin-bottom: 32px;
    }
  }
  .project-image {
    position: relative;
    background-image: url("@/assets/img/laptop.png");
    width: 655px;
    height: 382px;
    background-size: contain;
    filter: drop-shadow(0px 16.9792px 43.8629px rgba(0, 0, 0, 0.18));
    @media (max-width: 1200px) {
      background-image: none;
      width: auto;
      max-width: 400px;
      height: auto;
    }
    .page-screenshot {
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

      @media (max-width: 1200px) {
        position: static;
        top: 0;
        left: 0;
        width: 100%;
        max-width: 400px;
        height: 300px;
        border-radius: 12px;
      }

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        object-position: top;
      }
    }
  }
  .main-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    @media (max-width: 900px) {
      justify-content: center;
    }
    .download {
      border: 1px solid rgba(17, 17, 17, 0.18);
      color: $black;
      font-size: 14px;
      font-weight: 400;
      height: 45px;
      background: none !important;
      display: flex;
      align-items: center;
      transition: 0.2s ease-in-out;

      .main-btn-icon {
        font-size: 18px !important;
        margin-right: 8px;
      }

      &:hover {
        background-color: $black !important;
        color: #fff;
      }
    }

    .copy {
      border: none;
      color: $black;
      font-size: 14px;
      font-weight: 400;
      height: 45px;
      background: none !important;
      display: flex;
      align-items: center;
      transition: 0.2s ease-in-out;

      .main-btn-icon {
        font-size: 18px !important;
        margin-right: 8px;
      }
    }
  }
}
</style>
