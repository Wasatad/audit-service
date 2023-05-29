<template>
  <div class="archiev-preview-card">
    <div class="card-image">
      <a target="blank" :href="link">
        <img :src="image" alt="" />
      </a>
    </div>
    <div class="archive-card-description">
      <div class="card-title">{{ name }}</div>
      <a target="blank" :href="site" class="card-link">{{ site }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image", "site", "link", "name"],
};
</script>

<style lang="scss">
.archiev-preview-card {
  width: calc(25% - 18px);
  @media (max-width: 1200px) {
    width: calc(33% - 22px);
  }
  @media (max-width: 1000px) {
    width: calc(50% - 22px);
  }
  @media (max-width: 700px) {
    width: calc(100%);
  }
}

.card-image {
  width: 100%;
  max-width: 322px;
  height: 180px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 14px;
  transition: 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 13px 18px rgba(57, 31, 116, 0.2);
  }
}

.archive-card-description {
  .card-title {
    font-weight: 700;
    font-size: 18px;
    color: #0d0f14;
    margin-bottom: 4px;
  }
  .card-link {
    color: #979799;
    font-weight: 400;
    font-size: 13px;
    text-decoration: underline;
    transition: 0.2s ease-in-out;
    &:hover {
      color: #6941c7;
    }
  }
}
</style>
