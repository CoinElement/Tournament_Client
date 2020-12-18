<template>
  <div>
    <el-header>
      <Header />
    </el-header>
    <el-aside>
      <Aside />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<script>
import Header from "@/components/Home/Header";
import Aside from "@/components/Home/Aside";

export default {
  components: { Header, Aside }
};
</script>

<style></style>
