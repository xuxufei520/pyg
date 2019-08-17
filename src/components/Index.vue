<template>

    <!-- 大容器 -->
    <el-container class="index">
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
          <a href="javascript:;" @click='logout' class="logout">退出</a>
        </div>
      </el-header>
      <!-- 左侧和主体大容器 -->
      <el-container class="second-container">
        <!-- 左侧 -->
        <el-aside width="200px">
          <el-menu default-active="1-1" class="el-menu-vertical-demo"  background-color='#545c64' text-color='#fff' active-text-color='orange' unique-opened router>
          <el-submenu index="1">
              <template v-slot:title>
                 <i class="el-icon-location"></i>用户管理
              </template>
              <el-menu-item index="/users"><i class="el-icon-menu"></i>用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template v-slot:title>
                <i class="el-icon-location"></i>权限管理
              </template>
              <el-menu-item index="/users"><i class="el-icon-menu"></i>角色列表</el-menu-item>
              <el-menu-item index="/users"><i class="el-icon-menu"></i>权限列表</el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

export default {

  methods: {
    logout () {
      // 模态框 清token
      this.$confirm('此操作将退出登录状态, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message.success('退出成功')
        localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message('取消退出')
      })
    }
  } }
</script>

<style lang='scss' scoped>
.index {
  height: 100%;
  // 顶部
  .el-header {
    background-color: #d8d8d8;
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
    // 左侧边栏
    .el-aside {
      background-color: #545c64;
      color: #fff;
      // line-height: 200px;
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
    }
    // 主体
    .el-main {
      background-color: #e9eef3;
    }
  }
}

</style>
