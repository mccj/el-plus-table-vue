<template>
  <div>
    test
  </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue'
  
   type PaymentType = "支付宝" | "微信" | "后台确认";
   type Obj =  {
    [p in PaymentType]: any
  }
  // type NewType = [keyof PaymentType];
   interface ProductSchema extends Obj{ 
    name: string;
  }
  
  const ssss=Object.getOwnPropertyNames({aaa:''})
  
  // for (let entry of Obj) {
  //     console.log(entry); // 1, "string", false
  // }
  
  //   enum Suite {
  //   Spade = '♠',
  //   Heart = '♥',
  //   Club = '♣',
  //   Diamond = '♦',
  // }
  
  
  // for (let suite in Suite) {
  //   console.log('key:', suite);
  //   console.log('item:', Suite[suite]);
  //   }
  
  </script>
  
  <style scoped>
  
  </style>
  