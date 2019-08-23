<template>
  <div class="goods">
    <!-- 按钮 -->
    <div style="margin-bottom: 15px">
      <el-button type="success" plain @click='goodsAdd'>添加商品</el-button>
    </div>
     <!-- 表格 -->
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column  type="index" width="50" :index='indexMethod'> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column label="创建时间">
        <template v-slot:default='{row}'>
        {{row.add_time|getTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot:default='{row}'>
         <el-button type="primary" size="small" plain icon="el-icon-edit"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block" style="margin-top: 10px">
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsList: [{
        add_time: 1524401758,
        goods_id: 994,
        goods_name: 'iphone',
        goods_price: 10,
        goods_number: 10,
        goods_weight: 10
      }],
      // 查询参数
      Pnp: '',
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 获取商品数据
    async getGoodsList () {
      const pagenum = this.pagenum
      const pagesize = this.pagesize
      const Pnp = this.Pnp
      const { data, meta } = await this.$axios.get('goods', { params: { Pnp, pagesize, pagenum } })
      console.log(data)
      if (meta.status === 200) {
        this.goodsList = data.goods
        this.total = data.total
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 分页符操作
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getGoodsList()
    },
    // 添加商品操作
    goodsAdd () {
      this.$router.push({ name: 'goodsAdd' })
    },
    // 自定义的table序号
    indexMethod (index) {
      return index + 1 + (this.pagenum - 1) * this.pagesize
    }
  }

}
</script>

<style>

</style>
