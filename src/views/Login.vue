<template>
  <div>
    <div class="input-box">
      <el-input v-model="userName" placeholder="username" />
    </div>
    <div class="input-box">
      <el-input v-model="secretKey" placeholder="password" show-password />
    </div>
    <div class="button-box">
      <el-button @click="login">
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      secretKey: ""
    };
  },
  methods: {
    login: function() {
      this.axios
        .post(
          process.env.VUE_APP_BACKEND_BASE + "/user",
          {
            userName: this.userName,
            secretKey: this.secretKey
          },
          {
            "Content-Type": "application/json"
          }
        )
        .then(response => {
          console.log(response);
          if (response.data.msg == "success") {
            localStorage.USER_NAME = response.data.userName;
            localStorage.HOSTED_TOURNAMENT = response.data.hostedTournament;
            alert("登录成功!");
            this.$router.push("/table");
          } else {
            alert("用户名或密码输入错误!");
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
</style>
