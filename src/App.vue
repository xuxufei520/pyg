<template>
  <div id="app">

    <router-view />
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  //面包屑
  .el-breadcrumb {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
}

</style>
