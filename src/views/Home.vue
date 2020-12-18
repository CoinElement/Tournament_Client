<template>
  <div>
    <el-header class="header">
      <Header />
    </el-header>
    <el-aside>
      <SideBar />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<script>
import Header from "@/components/Home/Header";
import SideBar from "@/components/Home/SideBar";

export default {
  components: { Header, SideBar }
};
</script>

<style></style>
