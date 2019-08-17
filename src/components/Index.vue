<template>
  <div class="index">
    <!-- 大容器 -->
    <el-container class="top-container">
      <!-- 头部 -->
      <el-header>
        <div class="logo">
          <img src="../assets/logo.png" alt />
        </div>
        <div class="title">
          <h1>电商后台管理系统</h1>
        </div>
        <div class="msg">
          <span class="welcome">欢迎光临~</span>
          <a href class="logout">退出</a>
        </div>
      </el-header>
      <!-- 左侧和主体大容器 -->
      <el-container class="second-container">
        <!-- 左侧 -->
        <el-aside width="200px">
          <el-menu default-active="1-1" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose" background-color='#545c64' text-color='#fff' active-text-color='orange' unique-opened=true>
          <el-submenu index="1">
              <template slot="title">
                 <i class="el-icon-location"></i>用户管理
              </template>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>权限管理
              </template>
              <el-menu-item index="2-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
              <el-menu-item index="2-2"><i class="el-icon-menu"></i>权限列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>商品管理
              </template>
              <el-menu-item index="3-1"><i class="el-icon-menu"></i>商品类表</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-menu"></i>分类参数</el-menu-item>
              <el-menu-item index="3-3"><i class="el-icon-menu"></i>商品分类</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>订单管理
              </template>
              <el-menu-item index="4-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>数据统计
              </template>
              <el-menu-item index="5-1"><i class="el-icon-menu"></i>数据列表</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='scss' scope>
.index {
  height: 100%;
  .top-container {
    height: 100%;
  }
  // 顶部
  .el-header {
    background-color: #d8d8d8;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    .logo {
      img {
        height: 40px;
        vertical-align: middle;
      }
    }
    .title {
      flex: 1;
      color: #545c64;
    }
    .msg {
      font-weight: 700;
      .logout {
        color: orange;
      }
    }
  }
  //左侧和主体
  .second-container {
    height: 100%;
    // 左侧边栏
    .el-aside {
      background-color: #545c64;
      color: #fff;
      line-height: 200px;
      .el-menu {
        // border: 0;

      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
    }
    // 主体
    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
  }
}

</style>
