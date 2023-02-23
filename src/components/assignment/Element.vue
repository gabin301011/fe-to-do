<template>
  <div class="element">
    <div class="elem-in-elem">
      <div class="name">{{ task.name }}</div>
      <div>
        <Button
          @click="onGoToDetails()"
          icon="pi pi-info"
          class="p-button-sm p-button-rounded p-button-info button-circle" />
        <Button
          v-if="chevronLeft"
          @click="onClickChevronLeft()"
          icon="pi pi-chevron-left"
          class="p-button-sm p-button-rounded p-button-help button-circle" />
        <Button
          v-if="chevronRight"
          @click="onClickChevronRight()"
          icon="pi pi-chevron-right"
          class="p-button-sm p-button-rounded p-button-help button-circle" />
        <Button
          icon="pi pi-pencil"
          class="p-button-sm p-button-rounded p-button-success button-circle" />
        <Button
          @click="onDeleteTask()"
          icon="pi pi-times"
          class="p-button-sm p-button-rounded p-button-danger button-circle" />
      </div>
    </div>
    <div class="elem-in-elem">
      <div class="description-wrapper">
        <Description :description="task.description" />
      </div>
      <div class="priority-wrapper">
        <PriorityBadge :priority="task.priority" />
        <DaysNumber :createdAt="task.createdAt" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Assignment } from '@/communications/assignment-api/view-models';
import { PriorityEnum, StatusEnum } from '@/communications/assignment-api/enums';
import {
  computed,
  defineComponent,
  PropType,
} from '@vue/composition-api';
import { defUpdateAssignment, UpdateAssignment } from '@/communications/assignment-api/send-models';
import { useAssignmentConn } from '@/communications/assignment-api';
import { Toast } from '@/components/assignment/models';
import { useRouter } from '@/composables';
import PriorityBadge from './PriorityBadge.vue';
import DaysNumber from './DaysNumber.vue';
import Description from './Description.vue';
import { ToastEnum } from './enums';

export default defineComponent({
  components: {
    PriorityBadge,
    DaysNumber,
    Description,
  },
  props: {
    task: {
      type: Object as PropType<Assignment>,
      required: true,
    },
  },
  setup(props, context) {
    const router = useRouter();
    const {
      updateAssignmentAsync,
      deleteAssignmentAsync,
    } = useAssignmentConn();

    async function onDeleteTask() {
      const toast: Toast = {
        id: props.task.id,
        name: props.task.name,
        from: '',
        to: '',
        status: ToastEnum.Delete,
      };
      await deleteAssignmentAsync(props.task.id);
      context.emit('onDeleteTask', props.task.status, toast);
    }

    const chevronRight = computed(() => {
      if (props.task.status === StatusEnum.Todo || props.task.status === StatusEnum.InProgres) {
        return true;
      }
      return false;
    });

    const chevronLeft = computed(() => {
      if (props.task.status === StatusEnum.Complete || props.task.status === StatusEnum.InProgres) {
        return true;
      }
      return false;
    });

    async function onClickChevronLeft() {
      if (props.task.status === StatusEnum.InProgres) {
        console.log('From In Progess to To Do');
        const updateModel: UpdateAssignment = {
          id: props.task.id,
          status: StatusEnum.Todo,
        };
        const result = await updateAssignmentAsync(updateModel);
        if (result.status === 200) {
          const toast: Toast = {
            id: props.task.id,
            name: props.task.name,
            from: 'In Progress',
            to: 'To Do',
            status: ToastEnum.Info,
          };
          context.emit('onInProgressToDo', toast);
        }
      }
      if (props.task.status === StatusEnum.Complete) {
        console.log('From Completed to InProgess');
        const updateModel: UpdateAssignment = {
          id: props.task.id,
          status: StatusEnum.InProgres,
        };
        const result = await updateAssignmentAsync(updateModel);
        if (result.status === 200) {
          const toast: Toast = {
            id: props.task.id,
            name: props.task.name,
            from: 'Completed',
            to: 'Progres In',
            status: ToastEnum.Info,
          };
          context.emit('onCompletedProgessIn', toast);
        }
      }
    }

    async function onClickChevronRight() {
      if (props.task.status === StatusEnum.Todo) {
        const updateModel: UpdateAssignment = {
          id: props.task.id,
          status: StatusEnum.InProgres,
        };
        const result = await updateAssignmentAsync(updateModel);
        if (result.status === 200) {
          const toast: Toast = {
            id: props.task.id,
            name: props.task.name,
            from: 'To Do',
            to: 'Progres In',
            status: ToastEnum.Info,
          };
          context.emit('onToDoProgessIn', toast);
        }
      }
      if (props.task.status === StatusEnum.InProgres) {
        console.log('From Progres In to Completed');
        const updateModel: UpdateAssignment = {
          id: props.task.id,
          status: StatusEnum.Complete,
        };
        const result = await updateAssignmentAsync(updateModel);
        if (result.status === 200) {
          const toast: Toast = {
            id: props.task.id,
            name: props.task.name,
            from: 'Progres In',
            to: 'Completed',
            status: ToastEnum.Info,
          };
          context.emit('onProgresInCompleted', toast);
        }
      }
    }

    function onGoToDetails() {
      router.push({
        name: 'Details',
        params: {
          id: props.task.id.toString(),
        },
      });
      console.log('router here');
    }

    return {
      chevronRight,
      chevronLeft,
      onClickChevronRight,
      onClickChevronLeft,
      onDeleteTask,
      onGoToDetails,
    };
  },
});
</script>

<style>
.element {
  height: 100px;
  padding: 13px;
  display: flex;
  flex-direction: column;
}
.element:hover {
  background: rgb(235, 235, 235);
}
.elem-in-elem {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.name {
  font-weight: bold;
}
.priority-wrapper {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  padding-top: 5px;
}
.description-wrapper {
  width: 70%;
}
.button-circle {
  height: 27px !important;
  width: 27px !important;
  margin-right: 2px !important;
  position:  relative !important;
}
</style>
