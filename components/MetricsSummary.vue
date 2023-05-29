<template>
  <div class="metrics-wrapper">
    <div class="metrics-text-container">
      <div class="metrics-text" v-html="metrics"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["metrics"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.metrics-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  padding: 56px;
  margin-bottom: 50px;
  border-radius: 12px;
  width: 100%;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
  .metrics-text-container {
    width: 100%;
    // @media (max-width: 1000px) {
    //   width: 100%;
    // }
    .metrics-text {
      // max-width: 770px;
      width: 100%;
      // padding-right: 56px;
      font-size: 16px;
      line-height: 130%;
    }
  }
}
</style>
