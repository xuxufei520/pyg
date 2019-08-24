<template>
  <div class="goods-add">
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" description="基本信息"></el-step>
      <el-step title="步骤 2" description="商品图片"></el-step>
      <el-step title="步骤 3" description="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-tabs v-model="avtiveTab" tab-position="left" @tab-click="toggleStep" stretch>
      <!-- 步骤一填写表单 -->
      <el-tab-pane label="基本信息" name="0">
        <el-form ref="goodsForm" :model="goodsForm" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="goodsForm.goods_name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="goodsForm.goods_price" placeholder="请输入商品价格"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="goodsForm.goods_weight" placeholder="请输入商品重量"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="goodsForm.goods_number" placeholder="请输入商品数量"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader v-model="goodsForm.goods_cat" :options="options" :props='props' @change="handleChange"></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 步骤二上传图片 -->
      <el-tab-pane label="商品图片" name="1">
        <el-upload
          :headers="headers"
          name="file"
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture-card"
          multiple
          :on-success='picSuccess'
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-tab-pane>
      <!-- 步骤三 (富文本) -->
      <el-tab-pane label="商品内容" name="2">
        <!-- <div> -->
        <quill-editor ref="myTextEditor" v-model="goodsForm.goods_introduce"></quill-editor>
        <!-- </div> -->
      </el-tab-pane>
      <!-- 按钮-步骤条联动 -->
      <el-button type="primary" v-show="active<2" style="margin-top: 12px;" @click="next">下一步</el-button>
      <el-button type="primary" v-show="active==2" style="margin-top: 12px;" @click='addGoods'>添加</el-button>
    </el-tabs>
  </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  created () {
    // 请求添加商品分类数据回显
    this.getAddGoodsList()
  },
  data () {
    return {
      // 步骤条已完成
      active: 0,
      // 分页切换
      avtiveTab: '0',
      // 步骤一表单数据=====三步全部的数据
      goodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: []
        // add_time: 1524401758,
        // goods_id: 994,
      },
      // 步骤一级联选择器
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }]
        }]
      }],
      // 级联选择器配置
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 步骤二上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      // 上传图片的请求头
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  components: {
    quillEditor // 声明组件quillEditor
  },
  methods: {
    // 请求添加商品分类数据回显
    async getAddGoodsList () {
      const { meta, data } = await this.$axios.get('categories', { params: { type: 3 } })
      // console.log(data)
      if (meta.status === 200) {
        this.options = data
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 步骤条下一步控件
    next () {
      this.active++
      this.avtiveTab = this.active + ''
      // console.log(this.activeTab)
    },
    // 点击标签切换步骤
    toggleStep (e) {
      // console.log(e.index)
      this.active = +e.index
      // console.log(this.active)
    },
    // 步骤一级联选择器
    handleChange (value) {
      console.log(value)
      // this.goodsForm.goods_cat = value
    },
    // 步骤二上传图片
    picSuccess (response, file, fileList) {
      // console.log('success')
      // console.log(response, 'res')
      if (response.meta.status === 200) {
        const path = response.data.tmp_path
        this.goodsForm.pics.push({ pic: path })
      }
    },
    // 删除图片
    handleRemove (file, fileList) {
      console.log('remove')
      const path = file.response.data.tmp_path
      this.goodsForm.pics = this.goodsForm.pics.filter(v => v.pic !== path)
      console.log(this.goodsForm.pics)
    },
    // 预览图片
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 添加商品 提交信息
    async addGoods () {
      // 验证表单
      const { meta } = await this.$axios.post('goods', {
        ...this.goodsForm,
        goods_cat: this.goodsForm.goods_cat.join(',')
      })
      // console.log(meta, data)
      if (meta.status === 201) {
        this.$message.success(meta.msg)
        // 跳转页面到goods
        this.$router.push({ name: 'goods' })
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style lang='scss' >

  .goods-add{
    .quill-editor{
      background-color: #fff;
      .ql-editor {
        min-height : 300px ;
      }
    }
  }

</style>
