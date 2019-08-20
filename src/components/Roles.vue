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
        <template v-slot:default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.num }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"  width="50"></el-table-column>
      <el-table-column label="角色名称" prop="username"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column label="操作" prop="todo">
        <template v-slot:default="{row}">
          <el-button  type="primary" size="small" plain icon="el-icon-edit"></el-button>
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
      tableData: [{
        num: '12987122',
        username: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        todo: ''
      }]
    }
  },
  methods: {
    async getRolesList () {
      const res = await this.$axios.get('roles')
      console.log(res)
    }

  },
  created () {
    this.getRolesList()
  }
}
</script>

<style lang='scss' scoped>
.roles {
  //面包屑
  .el-breadcrumb {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  // 表格
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
