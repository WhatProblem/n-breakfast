<template>
  <div class="container">
    <div class="main">
      <el-container>
        <el-aside width="236px">
          <Navbar/>
        </el-aside>
        <el-container>
          <el-header height="50px">
            <div class="header">
              <div class="search-component">
                <el-input class="search"></el-input><span class="el-icon-search"></span>
              </div>
              <div class="proflie">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <img class="profile_header" src="../static/arent.jpg" alt=""><i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- <span>服务端渲染数据：{{title}}</span> -->
            </div>
          </el-header>
          <el-main>
            <div class="bread">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <nuxt-child></nuxt-child>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Navbar from "~/components/Navbar.vue";
export default {
  layout: "default",
  components: {
    Logo,
    Navbar
  }
  // async asyncData({ params,$axios }) {
  //   const { data } = await $axios.$get('/getTest');
  //   console.log(data)
  //   return { title: data.title };
  // }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/style.scss";
.container {
  width: 100%;
  height: 100%;
  .main {
    width: 100%;
    height: 100%;
  }
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-header,
.el-footer {
  background-color: $header-bg;
  color: $header-color;
  text-align: center;
  .header {
    position: relative;
    width: 100%;
    height: 60px;
    text-align: right;
  }
  .proflie{
    width: 74px;
    height: 45px;
    margin-left: 33px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 3px;
  }
  .profile_header{
    width: 45px;
    height: 45px;
  }
  .search {
    width: 220px;
    height: 30px;
    margin-right: 10px;
  }
  .search-component {
    width: 265px;
    display: inline-block;
    vertical-align: middle;
    height: 40px;
    margin-top: 2px;
  }
  .bread {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    /deep/ .el-breadcrumb__separator {
      color: $header-color;
    }
    /deep/ .el-breadcrumb__inner {
      color: $header-color;
    }
    /deep/ .el-breadcrumb__inner.is-link {
      color: $header-bread-active-color;
    }
  }
}

.el-aside {
  background-color: $sidebar-bg;
  color: $sidebar-color;
  text-align: center;
  border-top: 50px solid #ffffff;
  border-left: 10px solid #ffffff;
  border-bottom: 10px solid #ffffff;
}

.el-main {
  background-color: $main-bg;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  // line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  // line-height: 320px;
}

/*滚动条整体样式*/
.el-aside::-webkit-scrollbar {
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

/*滚动条里面小方块*/
.el-aside::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

/*滚动条里面轨道*/
.el-aside::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.el-card {
  width: 100%;
}
.box-card {
  width: 100%;
  text-align: left;
}
</style>
