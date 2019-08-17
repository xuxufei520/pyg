<template>
  <div class="users">
     <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type='success' plain>添加用户</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style lang='scss' scoped>
 //面包屑
  .el-breadcrumb{
    padding-top:10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  //输入框
  .el-input {
    margin-right: 10px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-input-group{
    width: 300px;
  }
</style>
