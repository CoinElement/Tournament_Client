<template>
  <el-card class="box-card">
    <el-form :model="formData">
      <el-form-item prop="userName" label="用户名" label-width="70px">
        <el-input v-model="formData.userName" auto-complete="on" />
      </el-form-item>
      <el-form-item prop="secretKey" label="密码" label-width="70px">
        <el-input
          v-model="formData.secretKey"
          auto-complete="on"
          show-password
        />
      </el-form-item>
    </el-form>
    <div class="input-box"></div>
    <div class="button-box">
      <el-button @click="login">
        登录
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        userName: "",
        secretKey: ""
      }
    };
  },
  methods: {
    login: function() {
      var notifi = this.$notify({
        type: "info",
        message: "登录中",
        title: "稍等"
      });
      this.axios
        .post("/user", this.formData)
        .then(response => {
          console.log(response);
          if (response.data.msg == "success") {
            this.$store.commit("user/login", response.data.userName);
            notifi.close();
            this.$notify({
              message: "登录成功",
              type: "success"
            });
            this.$router.push("/home/");
          }
        })
        .catch(error => {
          notifi.close();
          if (error.response && error.response.status == 400) {
            this.$notify.error("用户名或密码错误");
          } else {
            this.$notify.error("登录失败");
          }
        });
    }
  }
};
</script>

<style scoped>
.input-box {
  margin: 20px;
}
.box-card {
  position: absolute;
  width: 500px;
  height: 250px;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -125px;
}
</style>
