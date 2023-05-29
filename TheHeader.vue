<template>
  <div>
    <div class="burger-menu">
      <img src="@/assets/img/moab-logo-min.svg" alt="" />
      <span
        @click="switchMobileMenu"
        v-if="!mobileMenuVisible"
        style="color: #fff; font-size: 32px"
        ><i class="fa-sharp fa-solid fa-bars"></i
      ></span>
      <span
        @click="switchMobileMenu"
        v-if="mobileMenuVisible"
        style="color: #fff; font-size: 32px"
        ><i class="fa-sharp fa-solid fa-xmark"></i
      ></span>
    </div>
    <div v-if="mobileMenuVisible" class="mobile-header">
      <div class="mobile-inner">
        <el-menu
          router
          :default-active="'/' + $route.path.split('/')[1]"
          class="el-menu-vertical"
          background-color="#0D0F14"
          text-color="#696B76"
          active-text-color="#fff"
        >
          <el-menu-item @click="switchMobileMenu" index="/projects-list">
            <i class="fa-regular fa-desktop"></i>
            <span>Проекты</span>
          </el-menu-item>
          <el-menu-item @click="switchMobileMenu" index="/useful-links">
            <i class="fa-regular fa-list-ol"></i>
            <span>Полезные ссылки</span>
          </el-menu-item>
          <el-menu-item @click="switchMobileMenu" index="/archive">
            <i class="fa-regular fa-window-restore"></i>
            <span>Архив</span>
          </el-menu-item>
          <el-menu-item @click="switchMobileMenu" index="/template-edit">
            <i class="fa-regular fa-gear"></i>
            <span>Настройки</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="header-container">
      <div class="header-inner">
        <!-- Project list breadcrumbs -->
        <div
          v-if="
            $route.path.split('/')[1] == 'projects-list' &&
            $route.path.split('/').length == 2
          "
          class="breadcrumbs"
        >
          <span style="font-size: 16px; color: #969fa8">
            <i class="fa-regular fa-house"></i>
          </span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>Проекты</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--/////////////////////////-->

        <!-- Project page breadcrumbs -->
        <div
          v-if="
            $route.path.split('/')[1] == 'projects-list' &&
            $route.path.split('/').length >= 3
          "
          class="breadcrumbs"
        >
          <span style="font-size: 16px; color: #969fa8">
            <i class="fa-regular fa-house"></i>
          </span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/projects-list' }"
              >Проекты</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ currentProject.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--/////////////////////////-->

        <!-- Useful links page breadcrumbs -->
        <div
          v-if="$route.path.split('/')[1] == 'useful-links'"
          class="breadcrumbs"
        >
          <span style="font-size: 16px; color: #969fa8">
            <i class="fa-regular fa-house"></i>
          </span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>Полезные ссылки</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--/////////////////////////-->

        <!-- Archive page breadcrumbs -->
        <div v-if="$route.path.split('/')[1] == 'archive'" class="breadcrumbs">
          <span style="font-size: 16px; color: #969fa8">
            <i class="fa-regular fa-house"></i>
          </span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>Архив</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--/////////////////////////-->

        <!-- Edit template page breadcrumbs -->
        <div
          v-if="$route.path.split('/')[1] == 'template-edit'"
          class="breadcrumbs"
        >
          <span style="font-size: 16px; color: #969fa8">
            <i class="fa-regular fa-house"></i>
          </span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>Редактирование шаблона</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--/////////////////////////-->

        <div class="profile-info">
          <el-dropdown>
            <div class="profile">
              <img :src="currUser.photo" alt="" />
              <div class="profile-info">
                <span class="user-email">{{ currUser.name }}</span>
                <div v-if="currUser.admin" class="profile-sticker">
                  <i class="fa-solid fa-crown"></i>
                  <span>Admin</span>
                </div>
                <i
                  style="color: #c0c4cc"
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </div>

              <el-dropdown-menu>
                <el-dropdown-item @click.native="signOut">
                  <i class="fa-regular fa-arrow-up-left-from-circle"></i
                  >Выйти</el-dropdown-item
                >
              </el-dropdown-menu>
            </div>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { getAuth, signOut } from "firebase/auth";
export default {
  data() {
    return {
      mobileMenuVisible: false,
      currUser: {},
      // projectName: "",

      // Pages
      // onProjectList: false,
      // onProjectPage: false,
      // onUsefulPage: false,
      // onArchivePage: false,
    };
  },
  computed: {
    ...mapState(["currentProject", "user"]),
  },

  methods: {
    signOut() {
      // const auth = getAuth();
      // signOut(auth)
      //   .then(() => {
      //     // Sign-out successful.
      //   })
      //   .catch((error) => {
      //     // An error happened.
      //   });
      fetch("/api/logout")
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });

      this.$router.push("/login");
    },
    switchMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible;
      if (!document.body.classList.contains("no-scroll")) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    },
  },
  async mounted() {
    console.log(this.$route.path.split("/"));
    console.log(JSON.parse(localStorage.getItem("user")));
    if (localStorage.getItem("user")) {
      this.$store.commit("setUser", JSON.parse(localStorage.getItem("user")));
      this.currUser = this.user;
    }
  },
};
</script>

<style lang="scss">
.burger-menu {
  background-color: #0d0f14;
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 102;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  @media (min-width: 700px) {
    display: none;
  }
}

.mobile-inner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
}
.mobile-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  background-color: #0d0f14;

  .el-menu {
    margin-top: 56px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .is-active {
      color: $mainPurple !important;
    }
  }
  @media (min-width: 700px) {
    display: none;
  }

  .support-container {
    width: 100%;
    height: 68px;
    margin: 0 auto;
    position: absolute;
    bottom: 0px;
    border-top: 1px solid rgba(30, 35, 49, 1);
    color: rgba(105, 107, 118, 1);

    span {
      transition: 0.1s ease-in-out;
    }

    .el-menu-vertical-bottom {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: #191b21;
      }

      .support-tab {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        i {
          margin-right: 15px;
          width: 24px;
          text-align: center;
          font-size: 16px;
          vertical-align: middle;
        }
      }
    }
  }
}
// .header-container {
//   background-color: #fff;
//   width: 100%;
//   transition: 0.2s ease-in-out;
//   .header-inner {
//     margin: 0 auto;
//   }
// }
// .maximized {
//   .header-inner {
//     padding: 0 20px 0 280px !important;
//   }
// }

// .maximized {
//   .header-inner {
//     max-width: 1440px;
//     @media (max-width: 700px) {
//       padding: 20px !important;
//     }
//   }
// }

// .header-inner {
//   height: 90px;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 16px;
//   font-size: 14px;
//   background-color: #fff;
//   padding: 0 20px 0 300px;

//   transition: 0.2s ease-in-out;

//   @media (max-width: 700px) {
//     margin-top: 60px !important;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 20px;
//     height: auto;
//     padding: 20px !important;
//   }
// }

.header-container {
  transition: 0.2s ease-in-out;
  background-color: #fff;
  width: 100%;
  // padding: 0 20px 0 280px !important;
}
.maximized .header-container {
  // padding: 0 20px 0 94px !important;
}

.header-inner {
  padding: 0 40px;
  margin: 0 auto;
  max-width: 1440px;

  height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  font-size: 14px;
}

.el-breadcrumb {
  line-height: 1.4 !important;
}

.breadcrumbs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  // .el-breadcrumb__item ~ .el-breadcrumb__item:hover {
  //   // color: $mainPurple !important;
  // }

  // .is-link:hover {
  //   color: $mainPurple !important;
  // }
}

.profile-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  .profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }
    @media (max-width: 500px) {
      img {
        display: none;
      }
    }
    .profile-info {
      .profile-sticker {
        background-color: #dbf4e9;
        color: #56ac8b;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 4px;
      }
    }
  }
}

.el-dropdown-menu {
  .el-dropdown-menu__item:last-of-type {
    &:hover {
      background-color: #ffffff;
      color: #f84f68;
    }
  }
}
</style>
