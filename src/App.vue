<template>
  <ElPlusTable ref="tttt" @load-data="loadData" v-model:page-index="pageIndex" v-model:page-size="pageSize" showIndex
    showSelection>
    <!-- <el-table-column prop="test" label="test" align="center" /> -->
  </ElPlusTable>
  {{ pageIndex }}<br />
  {{ pageSize }}

  <button @click="() => { pageSize = 20; }"> 每页 20 条 </button>
  <button @click="() => { pageIndex = 3; }"> 第 3 页 </button>
  <button @click="() => { tttt?.Refresh() }"> 搜索 </button>
  <button @click="() => { tttt?.Reload() }"> 刷新 </button>
  <!-- <button @click="() => { debugger; tttt.filters = { aaaaa: 'dfdddd' } }"> 刷新 </button> -->
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ElPlusTable from "./components/el-plus-table";
import type { loadDataPage, loadDataCallback,tableExpose } from "./components/el-plus-table";

const tttt = ref<tableExpose>();
// tttt.value.
const pageIndex = ref(1);
const pageSize = ref(10);

const loadData = (param: loadDataPage, fun: loadDataCallback) => {
  // debugger
  // console.log('ffffff')

  setTimeout(() => {
    try {
      const { page, pageSize } = param;
      let tableData: { test: string }[] = [];

      for (let i = 0; i < pageSize; i++) {
        tableData.push({ test: page + '_' + i + '_test' });
      }

      fun.Success({ Total: 1000, Data: tableData })
    } catch (error) {
      fun.Fail(error)
    }

  }, 100)
};

</script>

<style scoped>

</style>
