<template>
  <div>
    <div class="input-box">
      <el-input v-model="userName" placeholder="用户名" />
    </div>
    <div class="input-box">
      <el-input v-model="secretKey" placeholder="密码" show-password />
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
        .post("/user", {
          userName: this.userName,
          secretKey: this.secretKey
        })
        .then(response => {
          console.log(response);
          if (response.data.msg == "success") {
            this.$store.commit("user/login", response.data.userName);
            alert("登录成功!");
            this.$router.push("/home/");
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
