<template>
  <div class="nav-container">
    <div class="project-nav">
      <el-menu
        router
        :default-active="$route.path"
        background-color="#F8F8FA"
        class="project-tab-menu-horizontal"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          :index="'/projects-list/' + this.$route.params.id + '/' + 'metrics'"
          ><i
            class="fa-regular fa-magnifying-glass-chart"
            style="margin-right: 12px"
          ></i
          >Метрика</el-menu-item
        >
        <el-menu-item
          :index="
            '/projects-list/' + this.$route.params.id + '/' + 'perfomance'
          "
          ><i class="fa-regular fa-gauge-high" style="margin-right: 12px"></i
          >Производительность</el-menu-item
        >
        <el-menu-item
          :index="'/projects-list/' + this.$route.params.id + '/' + 'content'"
          ><i class="fa-regular fa-pen-nib" style="margin-right: 12px"></i
          >Контент</el-menu-item
        >
        <el-menu-item
          :index="
            '/projects-list/' + this.$route.params.id + '/' + 'user-interface'
          "
          ><i class="fa-regular fa-paintbrush" style="margin-right: 12px"></i
          >UI</el-menu-item
        >
        <el-menu-item
          :index="
            '/projects-list/' + this.$route.params.id + '/' + 'user-experience'
          "
          ><i
            class="fa-regular fa-objects-column"
            style="margin-right: 12px"
          ></i
          >UX</el-menu-item
        >
        <el-menu-item
          :index="
            '/projects-list/' + this.$route.params.id + '/' + 'conclusion'
          "
          ><i class="fa-regular fa-memo-pad" style="margin-right: 12px"></i
          >Вывод</el-menu-item
        >
      </el-menu>
      <el-menu
        router
        :default-active="$route.path"
        class="project-tab-menu-vertical"
        @select="handleSelect"
      >
        <el-menu-item
          :index="'/projects-list/' + this.$route.params.id + '/' + 'metrics'"
          ><i
            class="fa-regular fa-magnifying-glass-chart"
            style="margin-right: 12px"
          ></i
          >Метрика</el-menu-item
        >
        <el-menu-item
          :index="
            '/projects-list/' + this.$route.params.id + '/' + 'perfomance'
          "
          ><i class="fa-regular fa-gauge-high" style="margin-right: 12px"></i
          >Производительность</el-menu-item
        >
        <el-menu-item
          :index="'/projects-list/' + this.$route.params.id + '/' + 'content'"
          ><i class="fa-regular fa-pen-nib" style="margin-right: 12px"></i
          >Контент</el-menu-item
        >
        <el-menu-item
          :index="
            '/projects-list/' + this.$route.params.id + '/' + 'user-experience'
          "
          ><i
            class="fa-regular fa-objects-column"
            style="margin-right: 12px"
          ></i
          >UX</el-menu-item
        >
        <el-menu-item
          :index="
            '/projects-list/' + this.$route.params.id + '/' + 'conclusion'
          "
          ><i class="fa-regular fa-memo-pad" style="margin-right: 12px"></i
          >Вывод</el-menu-item
        >
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect() {},
    getDataFromServer() {
      console.log(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-container {
  margin-bottom: 64px;
  .project-nav {
    .project-tab-menu-horizontal {
      background-color: rgba(243, 243, 248, 0) !important;
      border-top: 1px solid rgba(224, 224, 242, 1);
      border-bottom: 1px solid rgba(224, 224, 242, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 35px;

      @media (max-width: 800px) {
        display: none;
      }

      .el-menu-item {
        font-weight: 400;
        font-size: 16px;

        color: rgba(161, 156, 170, 1);
        padding: 0 24px;
        margin-right: 56px;
        background-color: rgba(243, 243, 248, 0) !important;

        @media (max-width: 1200px) {
          margin-right: 32px;
        }
        @media (max-width: 1100px) {
          padding: 0 16px;
        }
        @media (max-width: 1000px) {
          font-size: 12px;
          margin-right: 12px;
        }

        &:hover {
          background-color: rgba(243, 237, 249, 0.6) !important;
        }
      }
      .is-active {
        color: $mainPurple;
        border-bottom: 2px solid $mainPurple;
      }
    }

    .project-tab-menu-vertical {
      background-color: #ebeefc;

      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      border-right: none;

      margin-bottom: 32px;
      padding: 24px 0;
      width: 250px;

      @media (min-width: 800px) {
        display: none;
      }
      .el-menu-item {
        height: 32px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
}
</style>
