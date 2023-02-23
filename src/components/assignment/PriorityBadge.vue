<template>
   <div :class="styleBadge">{{ textBadge }}</div>
</template>

<script lang="ts">
import { PriorityEnum } from '@/communications/assignment-api/enums';
import { computed, defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  props: {
    priority: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const styleBadge = computed(() => {
      if (props.priority === PriorityEnum.Higest) {
        return 'highest';
      }
      if (props.priority === PriorityEnum.High) {
        return 'high';
      }
      if (props.priority === PriorityEnum.Normal) {
        return 'normal';
      }
      if (props.priority === PriorityEnum.Lower) {
        return 'lower';
      }
      if (props.priority === PriorityEnum.Lowest) {
        return 'lowest';
      }
      return '';
    });

    const textBadge = computed(() => {
      if (props.priority === PriorityEnum.Higest) {
        return 'HIGHEST';
      }
      if (props.priority === PriorityEnum.High) {
        return 'HIGH';
      }
      if (props.priority === PriorityEnum.Normal) {
        return 'NORMAL';
      }
      if (props.priority === PriorityEnum.Lower) {
        return 'LOWER';
      }
      if (props.priority === PriorityEnum.Lowest) {
        return 'LOWEST';
      }
      return '';
    });

    return {
      styleBadge,
      textBadge,
    };
  },
});
</script>

<style>
.highest {
  background-color: #ffb0b8;
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: bold;
  color: rgb(195, 64, 64);
}
.high {
  background-color: #ffd6da;
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: bold;
  color: rgb(197, 97, 97);
}
.normal {
  background-color: #ffef77;
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: bold;
  color: rgb(94, 94, 36);
}
.lower {
  background-color: #acffbc;
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: bold;
  color: rgb(53, 119, 65);
}
.lowest {
  background-color: #72fd8e;
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: bold;
  color: rgb(30, 80, 39);
}
</style>
