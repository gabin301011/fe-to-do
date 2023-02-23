<template>
  <div style="display: flex; align-items: center;">
    <div :class="todoStyle" class="badge-custom" @click="onUpdateStatus(StatusEnum.Todo)">
      {{ Translation.ToDoUpper }}
    </div>
    <div
      :class="progressInStyle"
      class="badge-custom"
      @click="onUpdateStatus(StatusEnum.InProgres)"
    >
      {{ Translation.InProgressUpper }}
    </div>
    <div :class="completedStyle" class="badge-custom" @click="onUpdateStatus(StatusEnum.Complete)">
      {{ Translation.CompletedUpper }}
    </div>
    <div class="info-text">{{ Translation.ChangeStatus }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { StatusEnum } from '@/communications/assignment-api/enums';
import { SendModelsAssignment, useAssignmentConn } from '@/communications/assignment-api';
import { Translation } from '@/translation';

const DARK_VARIANT_STYLE = 'dark';
const TODO_VARIANT_STYLE = 'todo';
const PROGRESS_IN_VARIANT_STYLE = 'progress-in';
const COMPLETED_VARIANT_STYLE = 'completed';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const {
      updateAssignmentAsync,
      addHistoryAssignmentAsync,
    } = useAssignmentConn();

    const todoStyle = computed(
      () => props.status === StatusEnum.Todo ? TODO_VARIANT_STYLE : DARK_VARIANT_STYLE,
    );
    const progressInStyle = computed(
      () => props.status === StatusEnum.InProgres ? PROGRESS_IN_VARIANT_STYLE : DARK_VARIANT_STYLE,
    );
    const completedStyle = computed(
      () => props.status === StatusEnum.Complete ? COMPLETED_VARIANT_STYLE : DARK_VARIANT_STYLE,
    );

    function getStatusName(statusEnum: StatusEnum) {
      switch (statusEnum) {
        case StatusEnum.Todo:
          return Translation.ToDo;
        case StatusEnum.InProgres:
          return Translation.InProgress;
        case StatusEnum.Complete:
          return Translation.Completed;
        default:
          return '';
      }
    }

    async function onUpdateStatus(statusEnum: StatusEnum) {
      if (props.status !== statusEnum) {
        const updateStatus: SendModelsAssignment.UpdateAssignment = {
          id: props.id,
          status: statusEnum,
        };
        await updateAssignmentAsync(updateStatus);
        const addHistoryAssignment: SendModelsAssignment.AddHistoryAssignment = {
          action: `Change status from ${getStatusName(props.status)} to ${getStatusName(statusEnum)}`,
          assignmentId: props.id,
        };
        await addHistoryAssignmentAsync(addHistoryAssignment);
        emit('onUpdateDetails');
      }
    }

    return {
      Translation,
      todoStyle,
      progressInStyle,
      completedStyle,
      StatusEnum,
      onUpdateStatus,
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
.todo {
  background-color: #c1dfeb;
  color: #556368;
}
.progress-in {
  background-color: #b98fb6;
  color: #5e485c;
}
.completed {
  background-color: #aed692;
  color: #566849;
}
</style>
