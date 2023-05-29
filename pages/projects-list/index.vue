<template>
  <div class="projects-list">
    <div class="section-header">
      <div class="section-title">Проекты</div>
      <el-button
        v-if="user.admin"
        @click="newProjectDialogVisible = true"
        class="add-project"
        type="primary"
      >
        <div class="btn-inner">
          <div class="add-project-icon">
            <img src="@/assets/img/icons/add-plus.svg" alt="" />
          </div>
          Создать новый
        </div>
      </el-button>
    </div>

    <!-- Окно добавление нового проекта -->
    <el-dialog
      class="new-project-modal"
      title="Добавить новый проект"
      :visible.sync="newProjectDialogVisible"
      width="30%"
      center
    >
      <el-input
        class="new-project-modal-input"
        placeholder="Имя проекта"
        v-model="newProjectName"
      ></el-input>
      <el-input placeholder="Адрес сайта" v-model="newProjectSite"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newProjectDialogVisible = false">Отмена</el-button>
        <el-button
          :loading="newProjectLoading"
          type="primary"
          class="addNewProject"
          @click="addNewProject"
          >Создать</el-button
        >
      </span>
    </el-dialog>

    <!-- Подтверждение удаления -->
    <el-dialog
      :visible.sync="confirmDeleteDialogVisible"
      width="30%"
      center
      class="confirm-delete-modal"
    >
      <span>Удалить аудит "{{ projectForDeleteName }}"?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDeleteDialogVisible = false"
          >Отмена</el-button
        >
        <el-button type="primary" @click="deleteProjectFromList"
          >Удалить</el-button
        >
      </span>
    </el-dialog>

    <!-- Карточки проектов -->
    <div class="project-cards">
      <project-card
        @deleteProject="delteConfirmation(project.projectID, project.name)"
        v-for="(project, id) in projects"
        :key="id"
        :name="project.name"
        :timestamp="project.timestamp"
        :website="project.website"
        :image="project.image"
        :id="project.projectID"
      ></project-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  middleware: ["auth"],
  name: "IndexPage",
  data() {
    return {
      newProjectName: "",
      newProjectSite: "",
      newProjectDialogVisible: false,
      newProjectLoading: false,
      confirmDeleteDialogVisible: false,

      projectForDeleteID: "",
      projectForDeleteName: "",
    };
  },
  computed: {
    ...mapState(["projects", "user"]),
  },
  methods: {
    ...mapActions(["downLoadProjectsList", "createProject", "deleteProject"]),
    async addNewProject() {
      this.newProjectLoading = true;
      await this.createProject({
        name: this.newProjectName,
        site: this.newProjectSite,
      });
      this.newProjectName = "";
      this.newProjectSite = "";
      this.newProjectLoading = false;
      this.newProjectDialogVisible = false;
    },
    delteConfirmation(id, name) {
      this.confirmDeleteDialogVisible = true;
      this.projectForDeleteID = id;
      this.projectForDeleteName = name;
    },
    async deleteProjectFromList() {
      await this.deleteProject({ projectID: this.projectForDeleteID });
      this.confirmDeleteDialogVisible = false;
    },
  },
  created() {
    this.downLoadProjectsList();
  },
};
</script>

<style lang="scss">
.projects-list {
  min-height: calc(100vh - 170px);
  margin-bottom: 40px;
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

    .add-project {
      background-color: rgba(0, 0, 0, 0) !important;
      border: none;
      padding: 0;
      margin-left: 4px;

      .btn-inner {
        color: $mainPurple;
        font-size: 16px;
        font-weight: 400;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        transition: 0.2s ease-in-out;
        &:hover {
          color: $darkPurple;
        }
      }

      .add-project-icon {
        width: 22px;
        height: 22px;
        background-color: $mainPurple;
        border-radius: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s ease-in-out;

        img {
          width: 12px;
          height: 12px;
        }
      }

      &:hover {
        .add-project-icon {
          background-color: $darkPurple;
          transform: rotate(90deg);
        }
      }
    }
  }
  .project-cards {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    flex-wrap: wrap;
  }
}

.new-project-modal {
  .el-dialog {
    border-radius: 6px;
  }
  .el-dialog__header {
    padding-top: 44px;
  }
  .el-dialog__title {
    color: $black !important;
    font-weight: 700;
    font-size: 24px;
  }
  .new-project-modal-input {
    margin-bottom: 12px;
  }
  .el-dialog__footer {
    padding-bottom: 44px;
  }
  .addNewProject {
    background-color: $mainPurple;
    border: none;
    &:hover {
      background-color: $darkPurple;
    }
  }
}

.confirm-delete-modal {
  .el-dialog {
    border-radius: 6px;
    max-width: 500px;
  }
  .el-dialog__body {
    text-align: center;
    font-size: 18px;
  }
  .el-dialog__footer {
    padding-bottom: 40px;
  }

  .el-button--primary {
    background-color: rgba(255, 0, 53, 1);
    border: none;
    &:hover {
      background-color: rgba(232, 12, 57, 1);
    }
  }
}
</style>
