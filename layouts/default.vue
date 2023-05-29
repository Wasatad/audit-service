<template>
  <div ref="appContainer" class="app-container maximized">
    <TheHeader />
    <el-container>
      <div ref="sidebar" class="sidebar-panel sidebar-minimized">
        <div class="sidebar-top">
          <div v-if="!sidebarMinimized" class="logo-container">
            <img src="@/assets/img/moab-logo.svg" alt="" />
          </div>
          <div v-if="sidebarMinimized" class="logo-container">
            <img src="@/assets/img/moab-logo-min.svg" alt="" />
          </div>
          <div class="nav-container">
            <el-menu
              router
              :default-active="'/' + $route.path.split('/')[1]"
              class="el-menu-vertical"
              @open="handleOpen"
              @close="handleClose"
              background-color="#0D0F14"
              text-color="#696B76"
              active-text-color="#fff"
            >
              <el-menu-item index="/projects-list">
                <i class="fa-regular fa-desktop"></i>
                <span>Проекты</span>
              </el-menu-item>
              <el-menu-item index="/useful-links">
                <i class="fa-regular fa-bookmark"></i>
                <span>Полезное</span>
              </el-menu-item>
              <el-menu-item index="/archive">
                <i class="fa-regular fa-box-archive"></i>
                <span>Архив</span>
              </el-menu-item>
              <el-menu-item v-if="user.admin" index="/template-edit">
                <i class="fa-regular fa-gear"></i>
                <span>Настройки</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="sidebar-bottom">
          <div @click="hideSidebar" class="sidebar-bottom-container">
            <div
              :class="[sidebarMinimized ? openSidebar : '']"
              class="collapse-bottom"
            >
              <img src="@/assets/img/icons/collapse-sidebar.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="main-container">
        <Nuxt />
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      sidebarMinimized: true,

      //CSS
      openSidebar: "open-sidebar",
    };
  },
  methods: {
    handleOpen() {
      console.log("is opened");
    },
    handleClose() {
      console.log("is closed");
    },
    hideSidebar() {
      this.sidebarMinimized = !this.sidebarMinimized;
      if (!this.$refs.sidebar.classList.contains("sidebar-minimized")) {
        this.$refs.sidebar.classList.add("sidebar-minimized");
        this.$refs.appContainer.classList.add("maximized");
      } else {
        this.$refs.sidebar.classList.remove("sidebar-minimized");
        this.$refs.appContainer.classList.remove("maximized");
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss">
html {
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  font-family: "Inter", sans-serif;
}

* {
  box-sizing: border-box;
}

h1 {
  font-weight: 600;
  font-style: normal;
  font-size: 56px;
  color: $black;
  @media (max-width: 500px) {
    font-size: 26px;
  }
}

h2 {
  font-weight: 700;
  font-style: normal;
  font-size: 32px;
  color: $black;
}

h3 {
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
  color: $black;
}

//Сбрасываем CSS
ul[class],
ol[class] {
  padding: 0;
}

/* Убираем внешние отступы */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Выставляем основные настройки по-умолчанию для body */
body {
  min-height: 100vh;
  background-color: $lightBG;
  color: $black;
}

/* Удаляем стандартную стилизацию для всех ul и il, у которых есть атрибут class*/
ul[class],
ol[class] {
  list-style: none;
}

/* Элементы a, у которых нет класса, сбрасываем до дефолтных стилей */

a {
  text-decoration: none;
}

/* Упрощаем работу с изображениями */
img {
  display: block;
}

/* Наследуем шрифты для инпутов и кнопок */
input,
button,
textarea,
select {
  font: inherit;
}

button {
  outline: none;
}

textarea:focus,
input:focus {
  outline: none;
}

textarea {
  border: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.no-scroll {
  margin: 0;
  height: 100%;
  overflow: hidden;
}

//Общие стили для форм

label {
  display: block;
  font-weight: 400;
  font-size: 14px;
  color: $darkGrey;
  // margin-bottom: 10px;
}

.el-tooltip__popper.is-light {
  background: #fff;
  border: none !important;
  color: #606266 !important;
  font-size: 14px;
}

.el-dropdown-menu {
  padding: 4px 0 !important;
}

.popper__arrow {
  border-left-color: rgba(0, 0, 0, 0) !important;
  border-right-color: rgba(0, 0, 0, 0) !important;
}

.el-select-dropdown__item.selected {
  color: $mainPurple;
  font-weight: 400;
}
.is-focus .el-input__inner {
  border-color: rgba(201, 201, 201, 1) !important;
}
input:focus {
  border-color: rgba(201, 201, 201, 1) !important;
}

// Настройки дефолтного лейаута

.app-container {
  transition: 0.2s ease-in-out;
  background-image: url("@/assets/img/bg-abstract.png");
  background-repeat: no-repeat;
  width: 100%;
  padding: 0 0 0 280px !important;
}
.app-container.maximized {
  padding: 0 0 0 94px !important;
  @media (max-width: 700px) {
    padding: 60px 0 0 0 !important;
  }
}

.main-container {
  padding: 0 40px;
  margin: 0 auto;
  min-height: calc(100vh - 90px);
}

.sidebar-minimized {
  max-width: 94px !important;

  .nav-container span {
    visibility: hidden;
  }
  .support-container span {
    visibility: hidden;
  }
}

.sidebar-panel {
  height: 100vh;
  width: 100%;
  max-width: 280px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  overflow: hidden;
  background-color: $black;
  color: $darkGrey;
  text-align: left;
  border-color: $black !important;
  font-weight: 500;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  transition: 0.2s ease-in-out;

  @media (max-width: 700px) {
    display: none;
  }

  .sidebar-top {
    width: 100%;
  }

  .logo-container {
    height: 90px;
    width: 100%;
    border-bottom: 1px solid rgba(30, 35, 49, 1);
    padding-left: 29px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // transition: 2s ease-in-out !important;
    // img {
    //   transition: 2s ease-in-out !important;
    // }
    img {
      max-width: 150px;
    }
  }

  .nav-container {
    padding-top: 50px;
    span {
      transition: 0.1s ease-in-out;
    }
  }

  .el-menu {
    border-right: none;

    .el-menu-item {
      padding-left: 34px !important;
      border-right: 4px solid $black !important;
      font-size: 16px;

      i {
        margin-right: 15px;
        width: 24px;
        text-align: center;
        font-size: 16px;
        vertical-align: middle;
      }
    }

    .el-menu-item:hover {
      background-color: #191b21 !important;
    }

    .is-active {
      border-right: 4px solid $mainPurple !important;
    }
  }

  .open-sidebar img {
    transform: scale(-1, 1);
  }
  .sidebar-bottom-container {
    width: 330px;
    height: 40px;
    border-top: 1px solid rgba(30, 35, 49, 1);
    background-color: rgb(3, 3, 3);
    color: rgba(105, 107, 118, 1);
    @media (max-width: 900px) {
      display: none;
    }
    .collapse-bottom {
      padding-left: 34px;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      transition: 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: #191b21;
      }

      img {
        transition: 0.2s ease-in-out;
        width: 24px;
      }
    }
  }
}

.main-container {
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  transition: 0.2s ease-in-out;
}

// Блок "Почему это важно?"
blockquote {
  border-left: 3px solid rgb(105, 65, 199) !important;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
  padding-left: 36px !important;
  padding-right: 16px !important;
  background-color: rgba(105, 65, 199, 0.04) !important;
}

.template-question,
.result-question,
.question {
  p + blockquote {
    &:before {
      content: "Почему это важно?";
      display: block;
      font-weight: 700;
      font-size: 16px;
      padding-top: 24px;
      margin-bottom: 8px;
      color: rgb(105, 65, 199);
    }
  }

  blockquote:first-of-type {
    &:before {
      content: "Почему это важно?";
      display: block;
      font-weight: 700;
      font-size: 16px;
      padding-top: 24px;
      margin-bottom: 8px;
      color: rgb(105, 65, 199);
    }
  }
}

.blockquote-title {
  display: block;
  font-weight: 700;
  font-size: 16px;
  padding-top: 16px !important;
  margin-bottom: 8px;
  color: rgb(105, 65, 199);
}

blockquote:has(+ p) {
  padding-bottom: 24px !important;
}

blockquote:has(+ blockquote) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

blockquote:last-of-type {
  padding-bottom: 24px !important;
}

.question .status-green + .question-body blockquote {
  opacity: 0.2;
}

.question .status-empty + .question-body blockquote {
  opacity: 0.2;
}

.result-question .status-green + .question-body blockquote {
  display: none;
}

//PopConfirm
.el-popconfirm {
  .el-popconfirm__main {
    margin-bottom: 6px;
  }
  .el-button--text {
    color: #606266;
    &:hover {
      color: #414349;
    }
  }
  .el-button--primary {
    background-color: #f84f68;
    border: none;
    &:hover {
      background-color: #fa405c;
    }
  }
}

// Quill editor styles
.ql-toolbar {
  visibility: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  justify-content: center;

  z-index: 100;
  background-color: #fff;
  border: none !important;
  transition: 0.2s ease-in-out;
}

.show-editing {
  visibility: visible;
  box-shadow: 0px 7px 14px rgba(83, 64, 128, 0.09);
  transform: translate(-50%, 0);
}

// Text-ediror style
.ql-editor {
  min-height: 45px !important;
}
.ql-container {
  border: none !important;
}
.ql-editor.ql-blank {
  &:before {
    color: #d2d2d2 !important;
  }
}

.ql-size-large {
  font-size: 16px !important;
  line-height: 200%;
}

.result-page {
  .ql-size-large {
    font-size: 18px !important;
    line-height: 200%;
  }
}

.ql-size-huge {
  font-size: 22px !important;
}

.result-page {
  .ql-size-huge {
    font-size: 28px !important;
  }
}
</style>
