<template>
  <div class="login" @keyup.enter="submitForm">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <img src="../assets/avatar.jpg" alt class="logo" />
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type='password' v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" >登录</el-button>
        <el-button class="form-reset" @click='resetForm'>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不为空', trigger: 'blur' },
          { min: 3, max: 12, message: '用户名长度在3-12位之间', trigger: ['blur', 'change'] }],
        password: [{ required: true, message: '密码不为空', trigger: 'blur' },
          { min: 3, max: 12, message: '密码长度在3-12位之间', trigger: ['blur', 'change'] }]
      } }
  },
  methods: {
    resetForm () {
      this.$refs.form.resetFields()
    },
    submitForm () {
      this.$refs.form.validate((isOk) => {
        // console.log(isOk)
        if (!isOk) return
        // 验证成功就提交表单
        console.log('验证成功,可以发送axios')
        axios.post('http://localhost:8888/api/private/v1/login', this.form).then(res => {
          const { meta } = res.data
          // console.log(meta)
          if (meta.status === 200) {
            this.$message({
              message: meta.msg,
              type: 'success',
              duration: 1000
            })
            this.$router.push({ name: 'index' })
          } else {
            this.$message.error(meta.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  height: 100%;
  background-color: #3a7890;
  overflow: hidden;
  .el-form {
  background-color: #fff;
  width: 400px;
  margin: 0 auto;
  margin-top: 140px;
  padding: 30px;
  padding-top: 100px;
  border-radius: 10px;
  position: relative;
    .logo {
      position: absolute;
      top: -70px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      border: 10px solid #fff;
    }
    .form-reset {
      margin-left: 50px;
    }
  }
}
</style>
