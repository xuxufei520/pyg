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
      <el-input placeholder="请输入搜索关键字" v-model="query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click='searchUsers'></el-button>
      </el-input>
      <el-button type="success" plain @click="dialogAddFormVisible = true">添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="username" label="姓名" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
      <el-table-column label="用户状态" align="center">
        <template v-slot:default="{row}">
          <el-switch
            v-model="row.mg_state"
            @change="userStatus(row.id,$event)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template v-slot:default="{row}">
          <el-button type="primary" size="small" plain icon="el-icon-edit" @click="updateUser(row.id)"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete" @click='delUser(row.id)'></el-button>
          <el-button type="success" size="small" plain icon="el-icon-check">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogAddFormVisible" width='40%'>
      <!-- form表单 -->
      <el-form
        :model="addForm"
        status-icon
        :rules="addFormRules"
        ref="addForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model.trim="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model.number="addForm.mobile"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户弹框 -->
    <el-dialog title="修改用户" :visible.sync="dialogUpdateFormVisible" width='40%'>
      <!-- form表单 -->
      <el-form
        :model="updateForm"
        status-icon
        :rules="addFormRules"
        ref="updateForm"
        label-width="100px"
      >
        <el-form-item label="用户名">
          <el-button type="info" disabled plain>{{updateForm.username}}</el-button>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model.number="updateForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserOk('updateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created () {
    this.getUsers()
  },
  data () {
    return {
      userList: [],
      query: '',
      pagenum: 1,
      pagesize: 4,
      total: 0,
      // 添加用户数据的弹框
      dialogAddFormVisible: false,
      // 修改用户数据的弹框
      dialogUpdateFormVisible: false,
      // 添加数模态框中的表格
      addForm: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      // 修改用户信息表格
      updateForm: {
        username: '',
        mobile: '',
        email: ''
      },
      // 添加用户表单验证功能
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '用户名长度在 3 到 12 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '密码长度在 3 到 12 个字符', trigger: ['blur', 'change'] }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    // 渲染用户列表
    async getUsers () {
      try {
        const { data, meta } = await this.$axios.get('users', {
          params: { query: this.query, pagenum: this.pagenum, pagesize: this.pagesize } })
        if (meta.status === 200) {
          this.userList = data.users
          this.total = data.total
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 分页 每页条数
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagenum = 1
      this.pagesize = val
      this.getUsers()
    },
    // 分页 跳转页码
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUsers()
    },
    //  更改用户状态
    async userStatus (id, e) {
      const { meta } = await this.$axios.put(`users/${id}/state/${e}`)
      if (meta.status === 200) {
        // console.log('修改成功')
        this.$message.success(meta.msg)
      }
    },
    // 添加用户
    async addUser (addForm) {
      try {
        await this.$refs[addForm].validate()
        this.dialogAddFormVisible = false
        // 发送axios请求添加用户 重渲染 还原表单
        const { meta } = await this.$axios.post('users', this.addForm)
        if (meta.status === 201) {
          // 跳转到新增位置
          this.$message.success(meta.msg)
          this.total++
          this.pagenum = Math.ceil(this.total / this.pagesize)
          this.getUsers()
          this.$refs[addForm].resetFields()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (error) { console.log(error) }
    },
    // 删除用户
    async delUser (id) {
      // 弹出模态框 是否删除 发送axios 提示tip
      try {
        await this.$confirm('确认此操作吗, 是否继续?', '温馨提示', { type: 'warning' })
        this.$message.success('删除成功')
        const { meta } = await this.$axios.delete(`users/${id}`)
        if (meta.status === 200) {
          if (this.userList.length === 1 && this.pagenum > 1) {
            this.pagenum--
          }
        }
        this.getUsers()
      } catch (error) {
        this.$message('已取消删除')
      }
    },
    // 条件搜索查询用户
    searchUsers () {
      this.pagenum = 1
      this.getUsers()
    },
    // 修改用户信息
    async updateUser (id) {
      this.dialogUpdateFormVisible = true
      const { data, meta } = await this.$axios.get(`users/${id}`)
      // console.log(data, meta)
      if (meta.status === 200) {
        this.updateForm = data
      }
    },
    // 修改完成用户信息
    async updateUserOk (updateForm) {
      // 表单效验
      try {
        await this.$refs[updateForm].validate()
        const { meta } = await this.$axios.put(`users/${this.updateForm.id}`, this.updateForm)
        if (meta.status === 200) {
          this.dialogUpdateFormVisible = false
          this.getUsers()
        }
      } catch (error) { console.log(error) }
    }
  }
}
</script>

<style lang='scss' scoped>
.users {
  //面包屑
  .el-breadcrumb {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  //输入框
  .el-input {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-input-group {
    width: 300px;
  }
  //分页符
  .block {
    padding-top: 10px;
  }
}
</style>
