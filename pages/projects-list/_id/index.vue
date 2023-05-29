<template></template>

<script>
export default {
  middleware: ["auth"],
  name: "IndexPage",
  async beforeCreate() {
    // Находим среди проектов наш с подходящим id
    // Проверяем, если ли он в localStorage, если есть - берем оттуда, если не находится, ищем в базе.

    // Для примера будем искать его в сторе.
    // this.$store.commit("setCurrentProject", this.$route.params.id);
    await this.$store.dispatch("downLoadCurrentProject", this.$route.params.id);
    // Переходим на страницу проекта
    this.$router.push({
      path: `/projects-list/${this.$route.params.id}/metrics`,
    });
  },
};
</script>
