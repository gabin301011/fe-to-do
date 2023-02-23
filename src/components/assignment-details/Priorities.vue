<template>
  <div style="display: flex; align-items: center;">
    <div :class="highestStyle" class="badge-custom" @click="onUpdatePriority(PriorityEnum.Higest)">
      {{ Translation.HighestUpper }}
    </div>
    <div :class="highStyle" class="badge-custom" @click="onUpdatePriority(PriorityEnum.High)">
      {{ Translation.HighUpper }}
    </div>
    <div :class="normalStyle" class="badge-custom" @click="onUpdatePriority(PriorityEnum.Normal)">
      {{ Translation.NormalUpper }}
    </div>
    <div :class="lowerStyle" class="badge-custom" @click="onUpdatePriority(PriorityEnum.Lower)">
      {{ Translation.LowerUpper }}
    </div>
    <div :class="lowestStyle" class="badge-custom" @click="onUpdatePriority(PriorityEnum.Lowest)">
      {{ Translation.LowestUpper }}
    </div>
    <div class="info-text">{{ Translation.ChangePriority }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { PriorityEnum } from '@/communications/assignment-api/enums';
import { SendModelsAssignment, useAssignmentConn } from '@/communications/assignment-api';
import { Translation } from '@/translation';

const DARK_VARIANT_STYLE = 'dark';
const HIGHEST_VARIANT_STYLE = 'highest';
const HIGH_VARIANT_STYLE = 'high';
const NORMAL_VARIANT_STYLE = 'normal';
const LOWER_VARIANT_STYLE = 'lower';
const LOWEST_VARIANT_STYLE = 'lowest';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const {
      updateAssignmentAsync,
      addHistoryAssignmentAsync,
    } = useAssignmentConn();

    const highestStyle = computed(
      () => props.priority === PriorityEnum.Higest ? HIGHEST_VARIANT_STYLE : DARK_VARIANT_STYLE,
    );
    const highStyle = computed(
      () => props.priority === PriorityEnum.High ? HIGH_VARIANT_STYLE : DARK_VARIANT_STYLE,
    );
    const normalStyle = computed(
      () => props.priority === PriorityEnum.Normal ? NORMAL_VARIANT_STYLE : DARK_VARIANT_STYLE,
    );
    const lowerStyle = computed(
      () => props.priority === PriorityEnum.Lower ? LOWER_VARIANT_STYLE : DARK_VARIANT_STYLE,
    );
    const lowestStyle = computed(
      () => props.priority === PriorityEnum.Lowest ? LOWEST_VARIANT_STYLE : DARK_VARIANT_STYLE,
    );

    function getPriorityName(priorityEnum: PriorityEnum) {
      switch (priorityEnum) {
        case PriorityEnum.Higest:
          return Translation.Highest;
        case PriorityEnum.High:
          return Translation.High;
        case PriorityEnum.Normal:
          return Translation.Normal;
        case PriorityEnum.Lower:
          return Translation.Lower;
        case PriorityEnum.Lowest:
          return Translation.Lowest;
        default:
          return '';
      }
    }

    async function onUpdatePriority(priorityEnum: PriorityEnum) {
      if (props.priority !== priorityEnum) {
        const updatePriority: SendModelsAssignment.UpdateAssignment = {
          id: props.id,
          priority: priorityEnum,
        };
        await updateAssignmentAsync(updatePriority);
        const addHistoryAssignment: SendModelsAssignment.AddHistoryAssignment = {
          action: `Change priority from ${getPriorityName(props.priority)} to ${getPriorityName(priorityEnum)}`,
          assignmentId: props.id,
        };
        await addHistoryAssignmentAsync(addHistoryAssignment);
        emit('onUpdateDetails');
      }
    }

    return {
      highestStyle,
      highStyle,
      normalStyle,
      lowerStyle,
      lowestStyle,
      PriorityEnum,
      Translation,
      onUpdatePriority,
    };
  },
});
</script>

<style>
.info-text {
  font-size: 13px;
  color: rgb(186, 186, 186);
  font-style: italic;
}
.badge-custom {
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: bold;
  margin-right: 10px;
}
.dark {
  background-color: #dfdfdf;
  color: rgb(145, 145, 145);
  cursor: pointer;
}
.dark:hover {
  background: rgb(235, 235, 235);
}
.highest {
  background-color: #ffb0b8;
  color: rgb(195, 64, 64);
}
.high {
  background-color: #ffd6da;
  color: rgb(197, 97, 97);
}
.normal {
  background-color: #ffef77;
  color: rgb(94, 94, 36);
}
.lower {
  background-color: #acffbc;
  color: rgb(53, 119, 65);
}
.lowest {
  background-color: #72fd8e;
  color: rgb(30, 80, 39);
}
</style>
