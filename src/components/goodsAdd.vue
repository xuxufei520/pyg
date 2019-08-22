<template>
  <div class="goods-add">
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" description="基本信息"></el-step>
      <el-step title="步骤 2" description="商品图片"></el-step>
      <el-step title="步骤 3" description="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-tabs tab-position="left" @tab-click='toggleStep' stretch>
      <el-tab-pane label="基本信息">
        <el-form ref="goodsForm" :model="goodsForm" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="goodsForm"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="goodsForm"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="goodsForm"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="goodsForm"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
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
      goodsForm: {}
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
    }

  }
}
</script>

<style>

</style>
