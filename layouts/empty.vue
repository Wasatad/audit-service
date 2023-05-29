<template>
  <div class="error-wrapper">
    <div class="error-content">
      <div class="error-text">
        <div class="error-text-top-title">Ой!</div>
        <div class="error-text-top-description">Страница не найдена</div>
      </div>

      <img class="error-img" src="@/assets/img/404-numbers.png" alt="" />

      <button class="error-back-btn" @click="goToPrev()">На главную</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToPrev() {
      const url = new URL("/", window.location.origin);
      window.location.href = url.toString();
    },
  },
};
</script>
<style lang="scss">
.error-wrapper {
  background-image: url("@/assets/img/error-bg.png");
  background-size: contain;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .error-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 100px;
    .error-text {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      gap: 24px;
      .error-text-top-title {
        font-weight: 700;
        color: #fff;
        font-size: 38px;
      }
      .error-text-top-description {
        color: #fff;
        font-size: 24px;
      }
    }

    .error-img {
      width: 500px;
    }

    .error-back-btn {
      height: 50px;
      width: 150px;
      border-radius: 8px;
      cursor: pointer;
      outline: none;
      border: none;
      color: #040553;
      background-color: #fff;
      transition: 0.2s ease-in-out;
      &:hover {
        border: 2px solid #191b80;
        background-color: #040553;
        color: #fff;
      }
    }
  }
}
</style>
