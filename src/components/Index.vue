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
        <span class="welcome"><i class="currentUsername">{{username}}</i>{{roleName}} 欢迎光临~</span>
        <a href="javascript:;" @click="logout" class="logout">退出</a>
      </div>
    </el-header>
    <!-- 左侧和主体大容器 -->
    <el-container class="second-container">
      <!-- 左侧 -->
      <el-aside width="200px">
        <!-- <template v-solt:default='menusData'> -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          :default-active="defaultActive"
          active-text-color="orange"
          unique-opened
          router >
          <el-submenu :index="item.path" v-for="item in menusData" :key="item.id">
            <template slot='title'><i class="el-icon-location"></i><span>{{item.authName}}</span></template>
            <el-menu-item :index='item2.path' v-for="item2 in item.children" :key="item2.id">
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- </template> -->
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
  data () {
    return {
      menusData: [
        {
          authName: '',
          children: [],
          id: 0,
          order: 0,
          path: ''
        }
      ],
      username: '',
      rid: 0,
      roleName: ''
    }
  },
  async created () {
    this.getMenus()
    this.getUserinfo()
    // console.log(this.rid, this.username)
    if (this.rid === 0) return
    const { meta, data } = await this.$axios.get(`roles/${this.rid}`)
    // console.log(data)
    if (meta.status === 200) {
      this.roleName = '(' + data.roleName + ')'
    } else {
      this.roleName = ''
    }
  },
  methods: {
    // 用户名右上角显示体验优化
    getUserinfo () {
      this.username = this.$route.query.username || ''
      this.rid = this.$route.query.rid || 0
    },
    // logout 功能
    async logout () {
      // 模态框 清token
      try {
        await this.$confirm('此操作将退出登录状态, 是否继续?', '提示', {
          type: 'warning'
        })
        this.$message.success('退出成功')
        localStorage.removeItem('token')
        this.$router.push('/login')
      } catch (error) {
        this.$message('取消退出')
      }
    },
    // 请求侧边栏
    async getMenus () {
      const { data, meta } = await this.$axios.get('menus')
      if (meta.status === 200) {
        // console.log(data)
        this.menusData = data
      } else {
        this.$message.error(meta.msg)
      }
    }
  },
  computed: {
    // getStr (num) {
    //   return num + ''
    // }
    defaultActive () {
      return this.$route.path.slice(1).split('-')[0]
    }
  }
}
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
      .currentUsername{
        // font-weight: 400;
        font-size: 14px ;
        color : purple;
      }
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
      .el-menu-vertical-demo {
        border: 0;
      }
    }
    // 主体
    .el-main {
      background-color: #e9eef3;
    }
  }
}
</style>
