<template>
  <ElPlusTableTools v-model="param" :showAllFiltersExtend="true">
    <template #='slotData'>
      <el-form-item label="标题">
        <el-input v-model="slotData.data.filters.title" placeholder="标题" />
      </el-form-item>
    </template>
    <template #fullTools='slotData'>
      <el-form-item label="标题">
        <splitData v-model="slotData.data.filters" :keys="['StartDate', 'EndDate']">
          <template v-slot:default='value'>
            <el-date-picker v-model="value.data.arror" type="daterange" range-separator="To"
              start-placeholder="Start date" end-placeholder="End date" format="YYYY年MM月DD日"
              value-format="YYYY-MM-DD" />
          </template>
        </splitData>
      </el-form-item>
    </template>
    <template #buttons>
     顶顶顶顶顶顶顶顶顶顶顶
    </template>
  </ElPlusTableTools>
  <ElPlusTable ref="tttt" @load-data="loadData" v-model:page-index="pageIndex" v-model:page-size="pageSize"
    :param="param" showIndex showSelection>
    <!-- <el-table-column prop="test" label="test" align="center" /> -->
  </ElPlusTable>
  {{ pageIndex }}<br />
  {{ pageSize }}
  <el-input v-model="param.aaa" />
  <button @click="() => { pageSize = 20; }"> 每页 20 条 </button>
  <button @click="() => { pageIndex = 3; }"> 第 3 页 </button>
  <button @click="() => { tttt?.Refresh() }"> 搜索 </button>
  <button @click="() => { tttt?.Reload() }"> 刷新 </button>
  <!-- <button @click="() => { debugger; tttt.filters = { aaaaa: 'dfdddd' } }"> 刷新 </button> -->

  <el-divider />

  <splitData v-model="param" :keys="['StartDate', 'EndDate']">
    <template v-slot:default='value'>
      <el-date-picker v-model="value.data.arror" type="daterange" range-separator="To" start-placeholder="Start date"
        end-placeholder="End date" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" />
    </template>
  </splitData>
  <splitData v-model="param" :keys="['StartDate', 'EndDate']">
    <template v-slot:default='value'>
      <el-date-picker v-model="value.data.arror" type="daterange" range-separator="To" start-placeholder="Start date"
        end-placeholder="End date" format="YYYY年MM月DD日" value-format="YYYY-MM-DD" />
    </template>
  </splitData>
  {{ param }}
  <el-divider />

  <test1122 />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ElPlusTable from "./components/el-plus-table";
import ElPlusTableTools from "./components/el-plus-table-tools";

import splitData from "./components/split-data";
import test1122 from "./test.vue";
import type { loadDataPage, loadDataCallback, tableExpose } from "./components/el-plus-table";

const tttt = ref<tableExpose>();
// tttt.value.
const pageIndex = ref(1);
const pageSize = ref(10);
const param = ref({ aaa: 'ssssss' });
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
