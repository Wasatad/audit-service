<template>
  <div>
    <div class="message-wrapper">
      <i style="font-size: 18px; color: #6941c7" class="fa-regular fa-copy"></i>
      <div class="message-container">
        <div class="title">Ссылка на отчет скопирована</div>
        <div class="description">Вставьте ее в адресную строку браузера</div>
      </div>
      <img
        @click="close"
        class="close-icon"
        src="@/assets/img/icons/close-flash.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["isVisible"],
  methods: {
    close() {
      let flashAlert = document.querySelector(".message-wrapper");
      flashAlert.classList.remove("show");
      let that = this;
      setTimeout(() => {
        that.$emit("closeCopyMessage");
      }, 1000);
    },
  },

  mounted() {
    let flashAlert = document.querySelector(".message-wrapper");
    setTimeout(() => {
      flashAlert.classList.add("show");
    }, 500);

    let that = this;
    setTimeout(() => {
      if (flashAlert.classList.contains("show")) {
        flashAlert.classList.remove("show");
      }
      setTimeout(() => {
        that.$emit("closeCopyMessage");
      }, 1000);
    }, 6000);
  },
};
</script>

<style scoped lang="scss">
.message-wrapper {
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1001;
  padding: 24px 40px 24px 24px;
  bottom: 0;
  right: 0;
  transform: translate(100%, -60px);
  background-color: #fff;
  color: $black;
  border-radius: 10px;
  box-shadow: 0px 14px 29px -3px rgba(104, 69, 169, 0.25);
  transition: all 0.3s ease-in-out;
  &.show {
    transition: all 0.3s ease-in-out;
    transform: translate(-60px, -60px);
  }
  .message-container {
    overflow: hidden;
    position: relative;
    margin-left: 10px;
  }

  .close-icon {
    margin-left: 10px;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }

  .title {
    font-family: $black;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;
  }
  .description {
    color: #7b7c80;
    line-height: 140%;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.02em;

    span {
      font-weight: 600;
    }
  }
}
</style>
