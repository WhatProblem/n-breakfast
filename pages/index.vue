<template>
  <div class="container">
    <div class="main">
      <el-container>
        <el-aside width="236px">
          <Navbar/>
        </el-aside>
        <el-container>
          <el-header height="90px">
            <div class="header">
              Header
              <span>服务端渲染数据：{{title}}</span>
            </div>
            <div class="bread">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-header>
          <el-main>
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
  },
  async asyncData({ params,$axios }) {
    const { data } = await $axios.$get('/getTest');
    console.log(data)
    return { title: data.title };
  }
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
.el-header,
.el-footer {
  background-color: $header-bg;
  color: $header-color;
  text-align: center;
  .header {
    position: relative;
    width: 100%;
    height: 60px;
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
