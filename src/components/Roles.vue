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
      <el-button type="success" plain @click="addRoles">添加角色</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="rolesList" style="width: 100%">
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
      <el-table-column label="操作">
        <template v-slot:default="{row}">
          <el-button type="primary" size="small" plain icon="el-icon-edit" @click="updateRoles(row)"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete" @click="delRoles(row.id)"></el-button>
          <el-button type="success" size="small" plain icon="el-icon-check" @click="assignRight(row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限弹框 -->
    <el-dialog  title="分配权限" :visible.sync="assignDialog" width="40%" @closed='clearBox'>
      <!-- 树状控件 -->
      <el-tree ref="tree" :data="assignRightTree" show-checkbox  :props="defaultProps" node-key='id' default-expand-all @check='checkedRoles' :default-checked-keys="checkedBox"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignDialog = false">取 消</el-button>
        <el-button type="primary" @click="assignRoles">分 配</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色模态框 -->
    <el-dialog :title="dialogTitle" :visible.sync="updateDialog" width="40%" @closed='clearBox("rolesForm")'>
      <!-- 表单 -->
      <el-form :model="rolesForm" :rules="updateRules" ref="rolesForm" label-width="100px" class="demo-rolesForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="rolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="updateDialog = false">取 消</el-button>
      <el-button type="primary" @click="updateRolesOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 当前角色rid
      rid: 0,
      // 分配权限弹框
      assignDialog: false,
      // 修改用户模态框
      updateDialog: false,

      // 复用的模态框标题
      dialogTitle: '',
      // 权限列表
      rolesList: [
        {
          id: 0, // rid
          children: [],
          roleName: '',
          roleDesc: ''
        }
      ],
      // 树状控件配置和数据
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      assignRightTree: [
        {
          id: 0, // rightId
          children: []
        }
      ],
      // 树状默认选中
      checkedBox: [],
      // 提交的全部选中数据
      SendCheckedBox: [],
      // 修改用户
      rolesForm: {
        roleName: '',
        roleDesc: ''
      },
      // 修改用户
      updateRules: {
        roleName: [{ required: true, message: '角色名称不为空', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '角色描述不为空', trigger: 'blur' }]
      }

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
        this.rolesList = data
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
    },
    // 分配权限模态框
    async assignRight (row) {
      this.rid = row.id
      this.assignDialog = true
      // 请求权限列表 并回显数据
      const { data, meta } = await this.$axios.get('rights/tree')
      if (meta.status === 200) {
        console.log(data)
        // 渲染树状图
        this.assignRightTree = data
        // 数据回显
        // console.log(row)
        row.children.forEach(item => {
          item.children.forEach(item2 => {
            item2.children.forEach(item3 => {
              this.checkedBox.push(item3.id)
              // console.log(item3.id)
            })
          })
        })
        //  遍历后
        // console.log(this.checkedBox)
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 分配权限的模态框中的树被选中或取消时
    checkedRoles (data, checked) {
      // console.log(this.checkedBox)
      console.log(data, checked)
      this.checkedBox = checked.checkedKeys
      this.SendCheckedBox = [...checked.checkedKeys, ...checked.halfCheckedKeys]
    },
    // // 请求后台分配权限
    async assignRoles () {
      this.assignDialog = false
      console.log(this.SendCheckedBox)
      const rids = this.SendCheckedBox.join(',')
      console.log(this.rid, rids)
      const { meta } = await this.$axios.post(`roles/${this.rid}/rights`, { rids })
      console.log(meta)
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        this.getRolesList()
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 模态框关闭时 清空当前CheckBox
    clearBox (formName) {
      this.checkedBox = []
      this.rid = 0
      this.$refs[formName].resetFields()
    },
    // 删除角色
    async delRoles (id) {
      console.log(id)
      try {
        await this.$confirm('你确定要删除该角色吗?', '温馨提示', { type: 'warning' })
        const { meta } = await this.$axios.delete(`roles/${id}`)
        // console.log(data, meta)
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          this.getRolesList()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      }
    },
    // 修改角色
    updateRoles (row) {
      console.log(row)
      this.dialogTitle = '修改角色'
      this.updateDialog = true
      this.rid = row.id
      this.rolesForm.roleName = row.roleName
      this.rolesForm.roleDesc = row.roleDesc
    },
    // 确认修改
    async updateRolesOk () {
      this.updateDialog = false
      if (this.dialogTitle === '修改角色') {
        const { data, meta } = await this.$axios.put(`roles/${this.rid}`, this.rolesForm)
        console.log(data)
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          this.getRolesList()
        } else {
          this.$message.error(meta.msg)
        }
      }
      if (this.dialogTitle === '添加角色') {
        const { data, meta } = await this.$axios.post(`roles`, this.rolesForm)
        console.log(data, meta)
        if (meta.status === 201) {
          this.$message.success(meta.msg)
        } else {
          this.$message.error(meta.msg)
        }
      }
    },
    // 添加角色
    addRoles () {
      this.dialogTitle = '添加角色'
      this.updateDialog = true
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
