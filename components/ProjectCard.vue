<template>
  <div class="card-wrapper">
    <div
      v-if="user.admin"
      @click="deleteProjectFromList"
      class="delete-project-card"
    >
      <img src="@/assets/img/icons/trash-can.svg" alt="" />
    </div>
    <div @click="openProject" class="card-img">
      <img :src="image" alt="" />
    </div>
    <div class="project-description">
      <div class="project-info">
        <div class="project-name">{{ name }}</div>
        <div class="project-date">{{ formatedDate }}</div>
      </div>
      <div class="project-website">
        <img src="@/assets/img/icons/globe.svg" alt="" />
        <a :href="website" target="blank">{{ website }}</a>
      </div>
    </div>
    <el-button @click="openProject" class="project-card-btn" type="primary">
      Открыть</el-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["name", "timestamp", "website", "image", "id"],
  data() {
    return {
      formatedDate: "",
    };
  },
  methods: {
    setDate() {
      let dateFormat = new Date(+this.timestamp);
      let date = dateFormat.getDate();
      if (date < 10) {
        date = "0" + date;
      }
      let month = dateFormat.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let year = dateFormat.getFullYear();
      this.formatedDate = date + "." + month + "." + year;
    },
    openProject() {
      this.$router.push({ path: `/projects-list/${this.id}` });
    },
    deleteProjectFromList() {
      this.$emit("deleteProject");
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.setDate();
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  background-color: #fff;
  padding: 20px 20px 26px 20px;
  width: calc(33.5% - 15px);
  min-width: 330px;
  border-radius: 15px;
  @media (max-width: 1190px) {
    width: calc(50% - 15px);
  }
  @media (max-width: 850px) {
    width: 100%;
  }

  .delete-project-card {
    position: absolute;
    top: 0;
    right: 0;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.11);
    border-radius: 100%;
    transform: translate(50%, -50%);
    cursor: pointer;
    visibility: hidden;
  }
  &:hover {
    .delete-project-card {
      visibility: visible;
    }
  }
  .card-img {
    width: 100%;
    height: 240px;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 22px;
    cursor: pointer;
    img {
      width: 100%;
      height: auto;
      border-radius: 12px;
      object-fit: contain;
      object-position: top;
    }
  }
  .project-description {
    .project-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .project-name {
        font-weight: 700;
        font-size: 22px;
        color: $black;
        max-width: 290px;
      }
      .project-date {
        font-weight: 400;
        font-size: 14px;
        color: #adadad;
      }
    }
    .project-website {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-weight: 400;
      font-size: 16px;
      color: $mainPurple;
      margin-bottom: 18px;
      a {
        color: $mainPurple;
        text-decoration: none;
      }
    }
  }
  .project-card-btn {
    background-color: $mainPurple;
    width: 100%;
    height: 56px;
    font-weight: 400;
    font-size: 16px;
    border: none;
    border-radius: 7px;
    &:hover {
      background-color: $darkPurple;
    }
  }
}
</style>
