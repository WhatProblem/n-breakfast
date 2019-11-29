<template>
  <div class="navbar">
    <!-- active-text-color="#ffd04b" -->
    <el-menu default-active="2" @open="handleOpen" @close="handleClose" class="el-menu-vertical-demo" >
      <el-menu-item index="1111" @click="navTo('/home')">
        <i class="el-icon-s-home iconcolor"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="1112" @click="navTo('/goodsManage')">
        <i class="el-icon-s-management iconcolor"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location iconcolor"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="navTo('/')">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu iconcolor"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document iconcolor"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting iconcolor"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navTo(path) {
      this.$router.push({ path });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/style.scss";
.iconcolor{
  color: $common-color;
}
.navbar {
  background-color: $sidebar-bg;
  /deep/ .el-menu {
    background-color: $sidebar-bg;
  }
  .el-menu-item {
    text-align: left;
    color: $sidebar-color;
    &:hover {
      background-color: $sidebar-active-bg;
    }
    &:focus {
      background-color: $sidebar-active-bg;
    }
  }
  /deep/ .el-submenu__title {
    text-align: left;
    color: $sidebar-color;
    &:hover {
      background-color: $sidebar-active-bg;
    }
  }
  /deep/ .el-menu-item-group__title {
    text-align: left;
    cursor: not-allowed;
  }
  /deep/ .el-menu-item.is-active {
    color: $sidebar-active-color;
  }
  /deep/ .el-menu {
    width: 100%;
    background-color: $sidebar-bg;
    .el-menu-vertical-demo {
      background-color: $sidebar-bg;
    }
  }
}
</style>
