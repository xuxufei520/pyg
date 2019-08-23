<template>
  <div class="categories">
    <!-- 添加按钮 -->
    <el-button type="success" plain style="margin-bottom:15px" @click="showAddDiakog">添加分类</el-button>
    <!-- 表格 -->
    <el-table
    :data="categoriesList"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="玩命加载中"
     :tree-props="{ children: 'children' }"
     row-key="cat_id">
      <el-table-column label="分类名称" prop="cat_name"></el-table-column>
      <el-table-column label="是否有效">
        <template #default='{row}'>
          {{row.cat_deleted? '否':'是'}}
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="cat_level"></el-table-column>
      <el-table-column label="操作">
        <template #default='{row}'>
          <el-button type="primary" size="small" icon="el-icon el-icon-edit" plain></el-button>
          <el-button type="danger" size="small" icon='el-icon el-icon-delete' plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加商品对话框 -->
    <el-dialog
    @closed='closeDialog'
      title="添加分类"
      :visible.sync="dialogVisible"
      width="40%" >
      <el-form :model="addCategroiesForm" ref = addCategroiesForm :rules = 'rules'  label-width="80px">
        <el-form-item label='分类名称' prop="cat_name">
          <el-input v-model='addCategroiesForm.cat_name' placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" prop="cat_pid">
           <el-cascader
            clearable
            v-model="addCategroiesForm.cat_pid"
            :options="options"
            :props="props"
            @change="handleChange"></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategroies">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  created () {
    this.getcategoriesList()
  },
  data () {
    return {
      categoriesList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      loading: false,
      // 添加商品对话框
      dialogVisible: false,
      //  表单效验
      rules: { cat_name: [{ required: true, message: '分类名称不能为空', trigger: ['blur', 'change'] }] },
      // 表单数据的绑定
      addCategroiesForm: {
        cat_name: '',
        cat_pid: [],
        cat_level: ''
      },
      // 级联选择器的配置数据
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        childen: 'children',
        checkStrictly: true
      }
    }
  },
  methods: {
    // 获取数据类表
    async getcategoriesList () {
      this.loading = true
      const pagenum = this.pagenum
      const pagesize = this.pagesize
      const { meta, data } = await this.$axios.get('categories', { params: { type: 3, pagenum, pagesize } })
      if (meta.status === 200) {
        this.categoriesList = data.result
        this.total = data.total
        this.loading = false
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 分页符控制
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getcategoriesList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getcategoriesList()
    },
    //  点击添加商品按钮
    async showAddDiakog () {
      this.dialogVisible = true
      const { data, meta } = await this.$axios.get('categories?type=2')
      if (meta.status === 200) {
        this.options = data
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 级联选择器
    handleChange (value) {
      console.log(value)
    },
    // 添加商品
    async addCategroies () {
      // 表单效验通过后发axios

      try {
        await this.$refs.addCategroiesForm.validate()
        const { meta } = await this.$axios.post('categories', {
          cat_pid: this.addCategroiesForm.cat_pid[this.addCategroiesForm.cat_pid.length - 1] || 0,
          cat_level: this.addCategroiesForm.cat_pid.length,
          cat_name: this.addCategroiesForm.cat_name })
        // console.log(data, meta)
        if (meta.status === 201) {
          this.dialogVisible = false
          this.$message.success(meta.msg)
        }
      } catch (error) {
        console.log(error)
        this.$message.error('请填写商品名称')
      }
    },
    // 关闭模态框重置校验项
    closeDialog () {
      this.$refs.addCategroiesForm.resetFields()
    }

  }
}
</script>

<style>

</style>
