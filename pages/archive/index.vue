<template>
  <div class="archive-cards-row">
    <div class="section-header">
      <div class="section-title">Архив</div>
    </div>
    <div class="archive-cards">
      <archive-preview
        v-for="(project, id) in archiveProjects"
        :key="id"
        :name="project.name"
        :site="project.site"
        :image="project.image"
        :link="project.link"
      ></archive-preview>
    </div>
  </div>
</template>

<script>
import ArchivePreview from "../../components/ArchivePreview.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { ArchivePreview },
  name: "IndexPage",
  computed: {
    ...mapState(["archiveProjects"]),
  },
  methods: {
    ...mapActions(["downLoadArchiveProjectsList"]),
  },
  created() {
    this.downLoadArchiveProjectsList();
  },
};
</script>

<style lang="scss">
.archive-cards-row {
  min-height: calc(100vh - 130px);
  .archive-cards {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 22px;
  }
  .section-header {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(235, 235, 252, 1);
    margin-bottom: 46px;

    .section-title {
      font-weight: 700;
      font-size: 32px;

      color: $black;
    }
  }
}
</style>
