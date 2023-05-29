<template>
  <div class="login-wrapper">
    <div class="login-logo-container">
      <img src="@/assets/img/moab-logo-grey.svg" alt="" />
    </div>
    <div class="login-container">
      <div class="login-header">
        <div class="login-title">
          Здравствуйте!
          <img src="@/assets/img/icons/hand.png" alt="" />
        </div>
      </div>
      <div class="login-row">
        <el-input
          id="emailInput"
          class="login-input"
          placeholder="E-mail"
          v-model="email"
          @input.native="resetErrors"
        ></el-input>
        <div class="error-message hidden">Введите email</div>
      </div>
      <div class="login-row">
        <el-input
          id="passwordInput"
          class="login-input"
          placeholder="Введите пароль"
          v-model="password"
          show-password
          @input.native="resetErrors"
        ></el-input>
        <div class="error-message hidden">Введите пароль</div>
      </div>

      <el-button
        @click="submit"
        class="login-btn"
        type="primary"
        :loading="loginInAction"
        >Войти</el-button
      >
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapMutations } from "vuex";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  getIdToken,
  signOut,
  updateProfile,
} from "firebase/auth";
export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      user: {
        id: "",
        email: "",
        name: "",
        photo: "",
      },
      loginInAction: false,
      authError: false,
      // Validation
      // passwordEmty: false,
      // showAuthError: false,
    };
  },
  methods: {
    resetErrors(e) {
      if (e.target.classList.contains("error")) {
        e.target.classList.remove("error");
        let inputErrors = e.target
          .closest(".login-row")
          .querySelectorAll(".error-message");

        let list = Array.from(inputErrors);
        console.log(list);
        for (let el of list) {
          console.log(el);
          if (!el.classList.contains("hidden")) {
            el.classList.add("hidden");
          }
        }
      }
    },
    async submit() {
      if (this.email == "") {
        document.querySelector("#emailInput").classList.add("error");
        document
          .querySelector("#emailInput")
          .closest(".login-row")
          .querySelector(".error-message")
          .classList.remove("hidden");
      }
      if (this.password == "") {
        document.querySelector("#passwordInput").classList.add("error");
        document
          .querySelector("#passwordInput")
          .closest(".login-row")
          .querySelector(".error-message")
          .classList.remove("hidden");
      } else {
        this.loginInAction = true;
        // let response = await this.firebaseAuth({
        //   email: this.email,
        //   password: this.password,
        // });
        // console.log(response);

        const auth = getAuth();

        // createUserWithEmailAndPassword(auth, this.email, this.password)
        //   .then((userCredential) => {
        //     // Signed in
        //     const user = userCredential.user;
        //     // ...
        //   })
        //   .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // ..
        //   });

        setPersistence(auth, inMemoryPersistence)
          .then(() => {
            signInWithEmailAndPassword(auth, this.email, this.password)
              .then((userCredential) => {
                console.log("user");
                console.log(userCredential);
                this.user.email = userCredential.user.email;
                this.user.id = userCredential.user.uid;
                this.user.photo = userCredential.user.photoURL;
                this.user.name = userCredential.user.displayName;

                getIdToken(userCredential.user).then((idToken) => {
                  fetch("/api/login", {
                    method: "POST",
                    body: JSON.stringify({ idToken }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((res) => {
                      let response = res.json();
                      if (response.status == 401) {
                        this.loginInAction = false;
                        console.log(error);
                        this.$message.error("Неверный логин или пароль");
                        return;
                      }
                      this.loginInAction = false;
                      console.log(" all ok");
                      this.$store.commit("setUser", this.user);
                      localStorage.setItem("user", JSON.stringify(this.user));
                      // console.log(object);
                      signOut(auth).then(() => {
                        this.$router.push({ path: "/projects-list" });
                      });
                      // updateProfile(auth.currentUser, {
                      //   displayName: "Катерина Ерошина",
                      //   photoURL:
                      //     "https://firebasestorage.googleapis.com/v0/b/moab-audit.appspot.com/o/avatars%2Fkaterina.png?alt=media&token=10c06e18-a171-45c1-8330-e8c9588ef4e0",
                      // })
                      //   .then(() => {
                      //     console.log("Profile updated!");
                      //   })
                      //   .catch((error) => {
                      //     console.log(error);
                      //   });
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                });
              })
              .catch((e) => {
                console.log(e);
                this.loginInAction = false;
                // console.log(error);
                this.$message.error("Неверный логин или пароль");
                return;
              });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.login-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-logo-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 56px;
    height: 56px;
    border-radius: 100%;
    background-color: #fff;
    filter: drop-shadow(0px 6.3px 12.6px rgba(37, 14, 94, 0.06));
    img {
      width: 34px;
      height: 34px;
    }
  }

  .login-container {
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 28px;
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    .login-row {
      width: 100%;
      position: relative;
    }

    .login-title {
      font-weight: 700;
      font-size: 22px;
      line-height: 27px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-bottom: 40px;
      img {
        width: 26px;
        height: auto;
      }
    }

    .login-input input {
      height: 56px;
      font-size: 16px;
      border-radius: 6px;
    }

    .login-btn {
      background-color: $mainPurple;
      border: none;
      height: 56px;
      width: 100%;
      border-radius: 6px;
      font-size: 16px;
      &:hover {
        background-color: $darkPurple;
      }
    }
  }

  .error-message {
    position: absolute;
    left: 0px;
    bottom: -18px;
    color: red;
    font-size: 12px;
    text-align: left;
    width: 100%;
    padding: 2px 0;
    transition: 0.2s ease-in-out;
  }

  .error {
    border: 1px solid red !important;
  }
  .hidden {
    opacity: 0;
    // transition: 0.5s ease-in-out;
  }
}
</style>
