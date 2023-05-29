<template>
  <div class="summary-wrapper">
    <div class="summary-text-container">
      <div class="summary-text" v-html="summary"></div>
    </div>
    <!-- <div class="summary-form-container">
      <div class="summary-form">
        <img
          class="letter-illustration"
          src="@/assets/img/letter-illustration.svg"
          alt=""
        />
        <div class="form-title">Обратная связь</div>
        <div class="form-subtitle">
          Остались вопросы или хотите обсудить доработки?
        </div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item>
            <el-input v-model="form.name" placeholder="Ваше имя"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="form.message"
              placeholder="Текст сообщения"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Отправить</el-button>
          </el-form-item>
          <el-checkbox class="policy-checkbox" v-model="policyChecked"
            >Я даю согласие на обработку моей персональной информации на
            условиях, определённых
            <a target="blank" href="https://moab.pro/personal-data/"
              >Политикой конфиденциальности</a
            ></el-checkbox
          >
        </el-form>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["summary"],
  data() {
    return {
      form: {},
      policyChecked: false,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
  },
};
</script>

<style lang="scss">
.summary-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  padding: 56px;
  border-radius: 12px;
  width: 100%;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
  .summary-text-container {
    // width: 70%;
    width: 100%;
    @media (max-width: 1000px) {
      width: 100%;
    }
    .summary-text {
      // max-width: 770px;
      width: 100%;
      padding-right: 32px;

      font-size: 16px;
      line-height: 130%;
      @media (max-width: 1000px) {
        border-right: none;
        padding-right: 0;
        padding-bottom: 40px;
        margin-bottom: 40px;
        border-bottom: 2px solid #f8f8fa;
      }
    }
  }

  .summary-form-container {
    text-align: center;
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 56px;
    padding-left: 32px;
    border-left: 2px solid #f8f8fa;
    @media (max-width: 1000px) {
      width: 100%;
      margin-left: 0;
      border: none;
    }
    .summary-form {
      max-width: 340px;
      width: 100%;

      .letter-illustration {
        margin: 0 auto;
        position: relative;
        top: 10px;
      }

      .form-title {
        font-weight: 700;
        font-size: 18px;
        color: #0d0f14;
        margin-bottom: 7px;
      }
      .form-subtitle {
        font-weight: 300;
        font-size: 14px;
        line-height: 17px;
        color: #969fa8;
        margin-bottom: 24px;
      }
      .el-form-item__content {
        margin-left: 0 !important;
      }
      .el-form-item {
        margin-bottom: 16px;
      }
      .el-input {
        width: 100%;
        .el-input__inner {
          border-radius: 8px;
          height: 50px;
          // border: 1px solid #e5e5ed;
        }
      }
      .el-textarea {
        .el-textarea__inner {
          border-radius: 8px;
          height: 130px;
        }
        .el-textarea__inner:focus {
          border-radius: 8px;
          height: 130px;
          border-color: #5733ad;
        }
      }
      .el-button {
        height: 60px;
        width: 100%;
        border-radius: 8px;
        background-color: #6941c7;
        border-color: #6941c7;

        &:hover {
          background-color: #5733ad;
          border-color: #5733ad;
        }
      }
      .policy-checkbox {
        white-space: normal;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: left;

        .el-checkbox__label {
          font-size: 12px;
        }

        &.is-checked {
          .el-checkbox__label {
            color: #5733ad;
          }
        }

        .el-checkbox__input.is-focus {
          .el-checkbox__inner {
            border-color: #5733ad;
          }
        }
        .el-checkbox__input:hover {
          .el-checkbox__inner {
            border-color: #5733ad;
          }
        }

        .el-checkbox__input.is-checked {
          .el-checkbox__inner {
            background-color: #5733ad;
            border-color: #5733ad;
          }
        }
      }
      a:active {
        color: #5733ad;
      }
    }
  }
}
</style>
