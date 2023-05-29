<template>
  <div class="main-container">
    <div class="logo-container">
      <a href="https://moab.pro/" target="blank" class="corporate-logo">
        <img src="@/assets/img/moab-logo-colored.svg" alt="" />
      </a>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.main-container {
  @media (max-width: 500px) {
    padding: 0 15px;
  }
}
.logo-container {
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  .corporate-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    width: 300px;
    padding-bottom: 24px;

    border-bottom: 1px solid #ebebfc;
  }
}
</style>
