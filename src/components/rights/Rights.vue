<template>
  <div class="rights">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="rightsList" style="width: 100%">
      <el-table-column  type="index" width="50"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column label="层级">
        <template v-slot:default='{row}'>
          <span v-if='row.level==="0"'>一级</span>
          <span v-if='row.level==="1"'>二级</span>
          <span v-if='row.level==="2"'>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsList: [{
        authName: '',
        path: '',
        level: ''
      }]
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    async getRightList () {
      const { data, meta } = await this.$axios.get(`rights/list`)
      // console.log(data)
      if (meta.status === 200) {
        this.rightsList = data
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style>
</style>
