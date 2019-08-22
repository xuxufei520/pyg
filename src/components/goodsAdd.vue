<template>
  <div class="goods-add">
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" description="基本信息"></el-step>
      <el-step title="步骤 2" description="商品图片"></el-step>
      <el-step title="步骤 3" description="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-tabs tab-position="left" @tab-click="toggleStep" stretch>
      <!-- 步骤一填写表单 -->
      <el-tab-pane label="基本信息">
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
            <div class="block">
              <el-cascader v-model="goodsForm.goods_cat" :options="options" @change="handleChange"></el-cascader>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 步骤二上传图片 -->
      <el-tab-pane label="商品图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
    <!-- 按钮-步骤条联动 -->
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 步骤条已完成
      active: 0,
      // 步骤一表单数据
      goodsForm: {
        goods_name: '',
        goods_cat: '',
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
      // 步骤二上传图片
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    // 步骤条下一步控件
    next () {
      if (this.active++ > 2) this.active = 0
    },
    // 点击标签切换步骤
    toggleStep (e) {
      console.log(e)
      if (e._uid === 20) {
        this.active = 1
      }
      if (e._uid === 21) {
        this.active = 2
      }
      if (e._uid === 22) {
        this.active = 3
      }
    },
    // 步骤一级联选择器
    handleChange (value) {
      console.log(value)
      // this.goodsForm.goods_cat = value
    },
    // 步骤二上传图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style>
</style>
