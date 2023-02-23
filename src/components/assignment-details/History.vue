<template>
  <div class="history-wrapper">
    <div
      class="history-element"
      v-for="item in task"
      v-bind:key="item.id"
    >{{ item.action }}</div>
  </div>
</template>

<script lang="ts">
import { HistoryAssignment } from '@/communications/assignment-api/view-models';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  props: {
    task: {
      type: Array as PropType<HistoryAssignment[]>,
      required: true,
    },
  },
});
</script>

<style>
.history-wrapper {
  width: 100%;
  overflow: scroll;
  overflow-x: auto;
  height: 90%;
  scrollbar-color: #a7a7a7 transparent;
  scrollbar-width: thin;
}
.history-element {
  border-bottom: solid;
  border-width: 1px;
  border-color: rgb(218, 218, 218);
  padding: 10px;
  color: rgb(155, 155, 155);
  font-style: italic;
}
</style>
