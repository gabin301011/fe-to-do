<template>
  <div :class="toastStyle" v-if="showToast">
    <div style="display: flex; flex-direction: row;">
      <div :class="iconStyle">
        <i :class="iconVariant"></i>
      </div>
      <div style="margin-left: 20px; width: 70%">
        {{ toastBody }}
      </div>
    </div>
    <i class="pi pi-times"></i>
  </div>
</template>

<script lang="ts">
import { useAssignmentConn } from '@/communications/assignment-api';
import { AddHistoryAssignment } from '@/communications/assignment-api/send-models';
import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  PropType,
  ref,
} from '@vue/composition-api';
import { ToastEnum } from './enums';
import { Toast } from './models';

export default defineComponent({
  props: {
    showToast: {
      type: Boolean,
      required: true,
    },
    toast: {
      type: Object as PropType<Toast>,
      required: true,
    },
  },
  setup(props) {
    const action = ref('');
    const { addHistoryAssignmentAsync } = useAssignmentConn();

    const toastBody = computed(() => {
      if (props.toast.status === ToastEnum.Delete) {
        return `Task #${props.toast.id} "${props.toast.name}" is deleted. (${new Date().toLocaleString()})`;
      }
      if (props.toast.status === ToastEnum.Info) {
        return `Move task #${props.toast.id} "${props.toast.name}" from ${props.toast.from} table to ${props.toast.to} table. (${new Date().toLocaleString()})`;
      }
      return '';
    });

    const toastStyle = computed(() => {
      if (props.toast.status === ToastEnum.Info) {
        return 'toast-info';
      }
      if (props.toast.status === ToastEnum.Delete) {
        return 'toast-delete';
      }
      return '';
    });

    const iconVariant = computed(() => {
      if (props.toast.status === ToastEnum.Info) {
        return 'pi pi-info';
      }
      if (props.toast.status === ToastEnum.Delete) {
        return 'pi pi-times';
      }
      return '';
    });

    const iconStyle = computed(() => {
      if (props.toast.status === ToastEnum.Info) {
        return 'icon-info';
      }
      if (props.toast.status === ToastEnum.Delete) {
        return 'icon-delete';
      }
      return '';
    });

    onUpdated(async () => {
      if (props.toast.status === ToastEnum.Delete) {
        action.value = `Task #${props.toast.id} "${props.toast.name}" is deleted. (${new Date().toLocaleString()})`;
      }
      if (props.toast.status === ToastEnum.Info) {
        action.value = `Move task #${props.toast.id} "${props.toast.name}" from ${props.toast.from} table to ${props.toast.to} table. (${new Date().toLocaleString()})`;
      }
      const addHistoryAssignment: AddHistoryAssignment = {
        assignmentId: props.toast.id,
        action: action.value,

      };
      console.log('bhfbrhjfbrhbfjgb');
      await addHistoryAssignmentAsync(addHistoryAssignment);
    });

    return {
      toastBody,
      toastStyle,
      iconStyle,
      iconVariant,
    };
  },
});
</script>

<style>
.toast-info {
  width: 50%;
  right: 1%;
  bottom: 1%;
  border-left: solid;
  margin-bottom: 3px;
  height: 90px;
  border-radius: 7px;
  border-left-width: 7px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  justify-content: space-between;
  position: fixed;
  z-index: 1000;
  background-color: rgb(233, 234, 253, 0.9);
  border-color: #787bff;
  color: #787bff;
}
.toast-delete {
  width: 50%;
  right: 1%;
  bottom: 1%;
  border-left: solid;
  margin-bottom: 3px;
  height: 90px;
  border-radius: 7px;
  border-left-width: 7px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  justify-content: space-between;
  position: fixed;
  z-index: 1000;
  background-color: rgba(219, 159, 159, 0.9);
  border-color: #cd2828;
  color: #cd2828;
}
.icon-info {
  border: solid;
  border-color: #787bff;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}
.icon-delete {
  border: solid;
  border-color: #cd2828;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}
</style>
