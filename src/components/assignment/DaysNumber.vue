<template>
  <small class="days-in-table">{{ daysNumber }}</small>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    createdAt: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const daysNumber = computed(() => {
      const temp = new Date(props.createdAt);
      const nowDate = new Date();
      const diffrenceInTime = nowDate.getTime() - temp.getTime();
      const diffrenceInDays = diffrenceInTime / (1000 * 3600 * 24);
      const roundedDays = Math.floor(diffrenceInDays);
      if (roundedDays === 1 || roundedDays === 0) {
        return `${Math.floor(diffrenceInDays)} day ago created`;
      }
      return `${Math.floor(diffrenceInDays)} days ago created`;
    });

    return {
      daysNumber,
    };
  },
});
</script>

<style>
.days-in-table {
  color: rgb(155, 155, 155);
  font-style: italic;
}
</style>
