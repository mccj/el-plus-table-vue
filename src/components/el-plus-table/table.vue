<template>
  <div class="system-table-box" v-loading="listState.loading">
    <!-- <slot name="tool" :State="listState" :Filters="filters" :Operation="{ QuerySearch: () => init() }">
  </slot>
    <slot name="content" :State="listState" :DataTotal="innerTotal" :DataItem="innerData ?? innerDatas"
      :Operation="{ QuerySearch: () => init() }">
      <slot :State="listState" :DataTotal="innerTotal" :DataItem="item" v-for="item in innerDatas"
        :Operation="{ QuerySearch: () => init() }">
        {{ item }}
      </slot>
    </slot>
-->
    <el-table v-bind="$attrs" ref="table" class="system-table" border height="100%" :data="innerDatas"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="50" v-if="showSelection" />
      <el-table-column label="序号" width="60" align="center" v-if="showIndex">
        <template #default="scope">
          {{ (currentPage - 1) * innerPageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination v-if="showPage" background class="system-page" :layout="pageLayout" :page-sizes="pageSizes"
      :total="innerTotal" v-model:current-page="currentPage" v-model:page-size="innerPageSize"
      :default-page-size="pageSize" :default-current-page="currentPage">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onActivated, onMounted, watch, withDefaults } from 'vue'
import type { loadDataPage, loadDataCallback, dataFormatCallback } from './table'
import { isPromise } from './table'

const props = withDefaults(defineProps<{
  showSelection?: boolean, // 是否展示选择框，默认否
  showIndex?: boolean, // 是否展示index选择，默认否
  showPage?: boolean, // 是否展示页级组件，默认是

  pageIndex?: number,
  pageSize?: number,
  pageSizes?: number[],
  query?: (info: any) => any,
  param?: object | (() => any),
  filters?: any,
  pageLayout?: string, // 分页需要显示的东西，默认全部
  dataFormat?: ((data: any, fun: dataFormatCallback) => void),
}>(),
  {
    showSelection: false,// 是否展示选择框，默认否
    showIndex: false, // 是否展示index选择，默认否
    showPage: true, // 是否展示页级组件，默认是
    // //     select: { type: Array, default: () => [] }, // 已选择的数据，与selection结合使用
    pageIndex: 1,
    pageSize: 10,
    pageSizes: () => [10, 20, 50, 100],
    filters: {},
    pageLayout: "total, sizes, prev, pager, next, jumper", // 分页需要显示的东西，默认全部
  })

const emit = defineEmits<{
  (event: 'load-data', param: loadDataPage, fun: loadDataCallback): void,
  (event: 'update:pageIndex', pageIndex: number): void,
  (event: 'update:pageSize', pageSize: number): void,
  (event: "selection-change", pageSize: number[]): void,

  // (event: 'load-data-error', param: any): void
}>()

const table: any = ref(null)
const innerDatas = ref<any[]>([]);
const innerData = ref<any>();
const innerPageSize = ref(10);
const innerTotal = ref(0);
const currentPage = ref(1);
// const finished = ref(false);
const listState = reactive({
  // page: 0,
  // list: [],
  loading: false,
  error: false
});


// watch(() => props.param, () => init)

watch(() => props.pageIndex, (newValue, oldValue) => {
  if (newValue !== currentPage.value) {
    currentPage.value = newValue ?? 10;
  }
})

watch(() => currentPage.value, (newValue, oldValue) => {
  // debugger
  if (newValue !== props.pageIndex) {
    emit('update:pageIndex', newValue);
  }

  if (newValue !== oldValue) {
    loadDataDelay();
  }
});

watch(() => props.pageSize, (newValue, oldValue) => {
  if (newValue !== innerPageSize.value) {
    innerPageSize.value = newValue ?? 10;
  }
})

watch(() => innerPageSize.value, (newValue, oldValue) => {
  // debugger
  if (newValue !== props.pageSize) {
    emit('update:pageSize', newValue);
  }

  if (newValue !== oldValue) {
    loadDataDelay();
  }
});

onMounted(async () => {
  await init()
});

// 解决BUG：keep-alive组件使用时，表格浮层高度不对的问题
onActivated(() => {
  table.value.doLayout()
})

// 选择监听器
const handleSelectionChange = (val: []) => {
  // debugger
  emit("selection-change", val)
}

// const refresh = async (done?: () => any) => {
//   await init(done);
//   // message.showToast({
//   //   title: '刷新成功',
//   //   icon: 'success'
//   // })
// }
const init = async (done?: () => any) => {
  // 清空列表数据
  // finished.value = false;
  listState.error = false;
  innerDatas.value = [];
  innerTotal.value = 0;
  currentPage.value = 1;
  loadDataDelay(done)
}
let timerDelay = false;
const loadDataDelay = (done?: () => any) => {
  // debugger
  if (timerDelay) return;

  timerDelay = true;
  setTimeout(() => {
    if (timerDelay == true) {
      timerDelay = false;
      loadData(done);
    }
  }, 100)
}
const loadData = async (done?: () => any) => {
  // 将 loading 设置为 true，表示处于加载状态
  listState.loading = true;
  // currentPage.value++;
  // debugger
  let info: loadDataPage = {
    page: currentPage.value,
    pageSize: innerPageSize.value,
    // start: this.innerStart,
    // end: this.innerEnd,
    // sort: JSON.parse(JSON.stringify(this.sortData)),
    // filters: JSON.parse(JSON.stringify(this.filters)),
  };
  // debugger
  const info2: loadDataPage = Object.assign({}, (props.query ? await props.query(info) : info), ((typeof props.param == "function") ? props.param() : props.param), props.filters)

  console.log(info2);
  const fun = {
    setLoading: (value: boolean) => {
      listState.loading = value;
      // this.$emit("update:loading", value);
    },
    setTotal: (value: number) => {
      innerTotal.value = value;
      // this.$emit("update:total", value);
    },
    setData: (value: any) => {
      // debugger
      console.log(value);
      let _setData = (value: any[]) => {
        if (!value) value = [];
        if (Array.isArray(value)) {
          innerDatas.value = value;
          // for (let i = 0; i < value.length; i++) {
          //   innerDatas.value.push(value[i]);
          // }
          // // debugger
          // if (innerDatas.value.length >= innerTotal.value) {
          //   finished.value = true;
          // }
        }
      };
      let _setTotal = (value: number) => {
        if (!value || value <= 0) value = 0;
        //  console.log(value)
        innerTotal.value = value;
        // this.$emit("update:total", value);

        // if (innerDatas.value.length >= innerTotal.value) {
        //   finished.value = true;
        // }
      };

      if (!value) value = { data: [], total: 0 };
      if (Array.isArray(value)) {
        _setData(value);
      } else {
        // debugger
        let tl = value.total ?? value.Total;
        // console.log(tl);
        if (Number.isInteger(tl)) {
          _setTotal(tl);
        }

        let dt = value.data ?? value.Data ?? value.rows ?? value.Rows;
        if (Array.isArray(dt)) {
          _setData(dt);
        }
      }
    }
  };
  //       if (this.url) {
  await getData(info2).then(data => {
    // debugger
    if ((data.hasOwnProperty('success') && data.success == false) ||
      (data.hasOwnProperty('Success') && data.Success == false) ||
      (data.hasOwnProperty('isSuccess') && data.isSuccess == false) ||
      (data.hasOwnProperty('IsSuccess') && data.IsSuccess == false)
    ) {
      // debugger
      listState.loading = false;
      listState.error = true;
      return;
    }
    // debugger
    if (props.dataFormat) {
      props.dataFormat(data, { setData: fun.setData, setTotal: fun.setTotal });
    } else {
      // debugger
      let tl = data.total ?? data.Total;
      // console.log(tl);
      tl && fun.setTotal(tl);

      let dt = data.data ?? data.Data ?? data.rows ?? data.Rows;
      if (Array.isArray(dt)) {
        fun.setData(dt);
      } else if (Array.isArray(data)) {
        innerDatas.value = data
      } else {
        innerData.value = data
      }
    }

    //       } else {
    //         this.$emit("queryChange", info2, fun);
    //       }
    //       // let setData = (value, total) => {
    //       //   if (total || total == 0)
    //       //     setTotal(total);

    //       //   if (!value) value = [];
    //       //   if (Array.isArray(value)) {
    //       //     // this.innerDatas = value;
    //       //     for (let i = 0; i < value.length; i++) {
    //       //       this.innerDatas.push(value[i]);
    //       //     }
    //       //     if (this.innerDatas.length >= this.innerTotal) {
    //       //       this.listState.finished = true;
    //       //     }
    //       //   }
    //       // };
    //       // let setTotal = (value) => {
    //       //   if (!value || value <= 0) value = 0;
    //       //   //  console.log(value)
    //       //   this.innerTotal = value;
    //       //   this.$emit("update:total", value);
    //       // };

    //       // this.currentPage++;

    //       // if (this.queryChange) {
    //       //   let info = {
    //       //     page: this.currentPage,
    //       //     pageSize: this.pageSize,
    //       //     // start: this.innerStart,
    //       //     // end: this.innerEnd,
    //       //     // sort: JSON.parse(JSON.stringify(this.sortData)),
    //       //     // filters: JSON.parse(JSON.stringify(this.filters)),
    //       //   };
    //       //   this.queryChange(info, { setData, setTotal });
    //       // } else {
    //       //   let data = await this.getData(this.currentPage, this.pageSize);

    //       //   if (this.dataFormat) {
    //       //     this.dataFormat(data, { setData, setTotal });
    //       //   } else {
    //       //     // debugger
    //       //     let tl = data.total ?? data.Total;
    //       //     // console.log(tl);
    //       //     setTotal(tl);

    //       //     let dt = data.data ?? data.Data ?? data.rows ?? data.Rows;
    //       //     if (Array.isArray(dt)) {
    //       //       setData(dt, tl);
    //       //     }
    //       //   }
    //       // }

    listState.loading = false;
    done && done()
    // console.log(data); 
  }).catch(() => {
    // debugger
    listState.loading = false;
    listState.error = true;
    // finished.value = true;
    done && done()
  });
}

const getData = (param: loadDataPage): Promise<any> => {
  // debugger
  return new Promise((resolve, reject) => {
    const fun: loadDataCallback = {
      Success: (data: any) => {
        // debugger
        if (isPromise(data))
          (data as Promise<any>).then(resolve, reject);
        else
          resolve(data)
      },
      Fail: (reason: any) => {
        // debugger
        if (isPromise(reason))
          (reason as Promise<any>).then(resolve, reject);
        else {
          reject(reason)
          listState.error = true
        }
      }
    }
    emit("load-data", param, fun)
  })
};
</script>

<style lang="scss" scoped>
.system-table-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;

  .system-table {
    flex: 1;
    height: 100%;
  }

  .system-page {
    margin-top: 20px;
  }
}
</style>