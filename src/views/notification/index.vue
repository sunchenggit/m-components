<template>
  <div>
    <!-- <m-notification :value="50" />
    <m-notification :value="50" :max="30" />
    <m-notification :value="50" :max="30" :is-dot="true" />
    <m-notification :value="50" :max="30" :is-dot="true" icon="ChatRound" /> -->
    <m-notification :value="50" :max="30" :is-dot="true">
      <template #default>
        <m-list
          :list="list"
          :actions="actions"
          @clickItem="clickItem"
          @clickAction="clickAction"
        />
      </template>
    </m-notification>
  </div>
</template>

<script lang="ts" setup>
import { list, actions } from "./data";
let clickItem = (data: any) => {
  console.log(data);
};
let clickAction = (data: any) => {
  console.log(data);
};
</script>
