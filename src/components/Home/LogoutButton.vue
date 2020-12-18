<template>
  <div>
    <el-button @click="onLogout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    onLogout: function() {
      this.$store.commit("user/logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
