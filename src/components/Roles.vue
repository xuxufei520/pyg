<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <div style="margin-top: 15px;margin-bottom: 15px">
      <el-button type="success" plain @click="dialogAddFormVisible = true">添加角色</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template v-slot:default="{row}">
          <el-row class='item' v-for="item in row.children" :key="item.id">
            <el-col :span="4"><el-tag closable @close='delRight(row,item.id)'>{{item.authName}}</el-tag><i class="el-icon-arrow-right"></i></el-col>
            <el-col :span="20">
              <el-row class='item2' v-for='item2 in item.children' :key='item2.id'>
                   <el-col :span="4"><el-tag type="success" closable @close='delRight(row,item2.id)'>{{item2.authName}}</el-tag><i class="el-icon-arrow-right"></i></el-col>
                    <el-col :span="20">
                      <el-tag class="item3" v-for='item3 in item2.children' :key='item3.id' type="warning" closable @close='delRight(row,item3.id)'>{{item3.authName}}</el-tag>
                    </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop="todo">
        <template v-slot:default="{row}">
          <el-button type="primary" size="small" plain icon="el-icon-edit"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete"></el-button>
          <el-button type="success" size="small" plain icon="el-icon-check">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogAddFormVisible: false,
      tableData: [
        {
          id: 0, // rid
          children: [],
          roleName: '',
          roleDesc: ''
        }
      ]
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    // 渲染列表
    async getRolesList () {
      const { data, meta } = await this.$axios.get('roles')
      // console.log(data)
      if (meta.status === 200) {
        this.tableData = data
      }
    },
    // 删除权限
    async delRight (row, rightId) {
      // 这里传入整个row而不是只传id 是因为删除操作后 row(row.children)重新赋值 实现双向绑定(局部更新) 避免刷新页面
      // console.log(row)
      // console.log(row.id)
      const { meta, data } = await this.$axios.delete(`roles/${row.id}/rights/${rightId}`)
      if (meta.status === 200) {
        // console.log(data)
        row.children = data
        this.$message.success(meta.msg)
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.roles {
  // 表格内嵌部分
  .item{
    padding: 10px 0;
    border-bottom: 1px dotted #ccc;
    .item2{
      // padding: 0 0 5px;
      .item3{
        margin: 0 5px 5px 0;
        }
      }
    }
}
</style>
