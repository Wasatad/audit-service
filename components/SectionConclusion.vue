<template>
  <div class="section-conclusion">
    <div class="author-photo">
      <img
        v-if="author.name == 'Николай Кузнецов'"
        src="@/assets/img/nikolay.png"
        alt=""
      />
      <img
        v-if="author.name == 'Катерина Ерошина'"
        src="@/assets/img/katerina.png"
        alt=""
      />
    </div>
    <div class="conclusion-body">
      <div class="conclusion-text" v-html="text"></div>
      <div class="author">
        <img
          class="small-photo"
          v-if="author.name == 'Николай Кузнецов'"
          src="@/assets/img/nikolay.png"
          alt=""
        />
        <img
          class="small-photo"
          v-if="author.name == 'Катерина Ерошина'"
          src="@/assets/img/katerina.png"
          alt=""
        />
        <div class="author-info">
          <div class="author-name">{{ author.name }}</div>
          <div class="author-position">{{ author.position }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["text", "author"],
};
</script>

<style lang="scss" scoped>
.section-conclusion {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 80px;
  margin-bottom: 80px;
  padding-bottom: 72px;
  border-bottom: 1px solid #ebebfc;
  @media (max-width: 1000px) {
    gap: 40px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 20px;
  }

  .author-photo img {
    width: 280px;
    height: auto;
    @media (max-width: 1000px) {
      display: none;
    }
  }

  .conclusion-text {
    margin-top: 64px;
    margin-bottom: 36px;
    @media (max-width: 1000px) {
      margin-top: 0;
    }
  }

  .author {
    @media (max-width: 1000px) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .small-photo {
      display: none;
      @media (max-width: 1000px) {
        display: block;
        width: 180px;
        height: auto;
        margin-right: 24px;
      }
    }
    .author-name {
      font-weight: 900;
      font-size: 22px;
      color: $black;
      margin-bottom: 14px;
    }
    .author-position {
      font-weight: 300;
      font-size: 18px;

      color: #ed9f2a;
    }
  }
}
</style>
