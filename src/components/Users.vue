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
      <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
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
          <el-button type="primary" size="small" plain icon="el-icon-edit"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete"></el-button>
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
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width='40%'>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    this.getUsers()
  },
  data () {
    return {
      input: '',
      userList: [],
      query: '',
      pagenum: 1,
      pagesize: 4,
      total: 0,
      // 添加用户数据的弹框
      dialogFormVisible: false,
      // 添加数模态框中的表格
      addForm: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
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
    getUsers () {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          // console.log(res)
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.userList = data.users
            this.total = data.total
          }
        })
    },
    // 分页 每页条数
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
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
    userStatus (id, e) {
      // console.log(id)
      // console.log(e)
      axios
        .put(
          `http://localhost:8888/api/private/v1/users/${id}/state/${e}`,
          null,
          { headers: { Authorization: localStorage.getItem('token') } }
        )
        .then(res => {
          // console.log(res)
          const { meta } = res.data
          // console.log(meta.status)
          if (meta.status === 200) {
            // console.log('修改成功')
            this.getUsers()
            this.$message.success(meta.msg)
          }
        })
    },
    // 添加用户
    addUser (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          console.log('添加')
          // 发送axios请求添加用户 重渲染 还原表单
          axios.post('http://localhost:8888/api/private/v1/users', this.addForm, { headers: { Authorization: localStorage.getItem('token') } })
            .then(res => {
              // console.log(res)
              const { meta } = res.data
              if (meta.status === 201) {
                // console.log('ok')
                this.getUsers()
                this.$refs[addForm].resetFields()
              }
            }
            )
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
