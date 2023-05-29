<template>
  <div class="project-page">
    <project-info></project-info>
    <project-nav></project-nav>
    <div class="section-header">
      <div class="section-info">
        <h2 class="section-title">UX-факторы</h2>
        <div class="section-description">
          User Experience - это пользовательский опыт, то, что делает сайт
          удобным. Насколько вашим пользователям на вашем сайте? Получают ли они
          то, за чем пришли?
        </div>
      </div>
    </div>
    <checklist-section
      v-for="(section, id) in currentProject.data.ux.sections"
      :key="id"
      v-bind:questionsSection="section"
      v-bind:chapterName="'ux'"
    ></checklist-section>
  </div>
</template>

<script>
import ProjectInfo from "@/components/ProjectInfo.vue";
import ProjectNav from "@/components/ProjectNav.vue";
import ChecklistSection from "@/components/ChecklistSection.vue";
import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  components: { ProjectInfo, ProjectNav, ChecklistSection },
  name: "IndexPage",

  data() {
    return {};
  },
  computed: {
    ...mapState(["currentProject"]),
  },
  mounted() {},
};
</script>

<style lang="scss">
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  .questions-qty {
    font-size: 14px;
    color: rgba(150, 159, 168, 1);
  }
  .section-info {
    .section-title {
      margin-bottom: 14px;
    }
    .section-description {
      color: #969fa8;
      font-size: 15px;
      max-width: 1000px;
    }
  }
}
</style>
