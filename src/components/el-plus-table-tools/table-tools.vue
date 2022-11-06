<template>
  <slot name="tools" :data="slotData">
    <el-form :inline="true" :model="slotData.filters">
      <slot name="default" :data="slotData">
        {{ slotData }}
        <!--    <el-form-item label="标题">
        <el-input v-model="slotData.filters.title" placeholder="标题" />
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker v-model="slotData.filters.createTime" type="daterange" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="至" clearable />
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="slotData.filters.createBy" placeholder="发布人" />
      </el-form-item>
      <el-form-item label="产品名称/线路编号">
        <el-input v-model="slotData.filters.productName" placeholder="产品名称/线路编号" />
      </el-form-item>
      -->
      </slot>
      <div v-if="slotData.showAllFilters">
        <slot name="fullTools" :data="slotData">
          <!-- 
        <el-form-item label="副标题">
          <el-input v-model="slotData.filters.subTitle" placeholder="副标题" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="slotData.filters.content" placeholder="内容" />
        </el-form-item>
        <el-form-item label="媒体链接">
          <el-input v-model="slotData.filters.媒体链接" placeholder="媒体链接" />
        </el-form-item>
        <el-form-item label="媒体类型">
          <el-input v-model="slotData.filters.媒体类型" placeholder="媒体类型" />
        </el-form-item>
        <el-form-item label="默认佣金">
          <el-input v-model="slotData.filters.commission" placeholder="默认佣金" />
        </el-form-item>
        -->
        </slot>
      </div>
      <el-form-item>
        <el-link v-if="showAllFiltersExtend" :underline="false"
          @click="slotData.showAllFilters = !slotData.showAllFilters" style="margin: 0px 12px 0px 12px">{{
              slotData.showAllFilters
                ? '收起' : '展开'
          }}
          <el-icon v-show="slotData.showAllFilters">
            <ArrowUp />
          </el-icon>
          <el-icon v-show="!slotData.showAllFilters">
            <ArrowDown />
          </el-icon>
        </el-link>
        <el-button-group>
          <el-button v-loading="loading" type="primary" :icon="Search"
            @click="() => { slotData.queryChange('search'); }">{{ searchText }}</el-button>
          <el-button type="primary" :icon="Refresh" @click="() => { slotData.cleanFilters(); }">{{ ResetText }}
          </el-button>
        </el-button-group>
      </el-form-item>
      <slot name="buttons" :data="slotData">
        <!-- 
      <el-form-item>
        <el-button type="primary" icon="el-icon-edit" @click="addDataRow()">创建</el-button>
      </el-form-item>-->
      </slot>
    </el-form>
  </slot>
</template>
  
<script setup lang="ts">
import { reactive, ref, onActivated, onMounted, watch, withDefaults, computed } from 'vue'
import { ArrowUp, ArrowDown, Search, Refresh } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  modelValue?: any,
  loading?: boolean,
  searchText?: string,
  ResetText?: string,
  showAllFiltersExtend?: boolean
}>(), {
  loading: false,
  showAllFiltersExtend: false,
  searchText: "搜索",
  ResetText: "重置"
})

const emit = defineEmits<{
  (event: 'update:modelValue', param: any): void
  (event: 'search', param: string): void
}>()

const innerData = ref<any>({})
const slotData = reactive({
  showAllFilters: false,
  filters: innerData,
  queryChange: (txt: string) => {
    emit('update:modelValue', { ...innerData.value })
    emit('search', txt)
  },
  cleanFilters: () => {
    innerData.value = {};
  }
});
</script>
<style scoped>

</style>
  