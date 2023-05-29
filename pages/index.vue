<template></template>

<script>
export default {
  middleware: ["auth"],
  name: "IndexPage",
  beforeCreate() {
    this.$router.push({
      path: `/projects-list/`,
    });
  },
};
</script>
