<template>
  <slot :data="slotData">
    {{ slotData }}
  </slot>
</template>
  
<script setup lang="ts">
import { reactive, computed } from 'vue'

const props = defineProps<{
  modelValue?: any,
  keys?: string[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', param: any): void
}>()

const innerData = computed(
  {
    get() {
      let result: any = [];
      if (props.modelValue && props.keys) {
        props.keys.forEach(function (key: string) {
          result.push(props.modelValue[key]);
        })
      }
      return result;
    },
    set(value: []) {
      if (props.keys) {
        props.keys.forEach(function (key: string, index: number) {
          props.modelValue[key] = value[index];
          emit("update:modelValue", props.modelValue)
        })
      }
    }
  });
const slotData = reactive({ arror: innerData });
</script>
<style scoped>

</style>
  