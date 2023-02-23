<template>
  <div style="position: relative;">
    <ToastInfo
      :showToast="showToast"
      :toast="toast"
    />
  <b-container style="display: flex; flex-direction: column; margin-top: 20px;
    justify-content: center;">
    <div style="display: flex; flex-direction: row;">
      <div class="main-list">
      <div class="header header-to-do">
        To Do
      </div>
      <div class="assignment assignment-to-do">
        <b-list-group
        style="padding-top: 10px; padding-bottom: 10px;">
          <Element
            v-for="item in todos"
            v-bind:key="item.id"
            :task="item"
            @onToDoProgessIn="onToDoProgessIn"
            @onDeleteTask="onDeleteTask"
          />
        </b-list-group>
      </div>
    </div>
    <div class="main-list">
      <div class="header header-in-progress">
        In Progress
      </div>
      <div class="assignment assignment-in-progress">
        <b-list-group
        style="padding-top: 10px; padding-bottom: 10px;">
          <Element
            v-for="item in inProgres"
            v-bind:key="item.id"
            :task="item"
            @onProgresInCompleted="onProgresInCompleted"
            @onInProgressToDo="onInProgressToDo"
            @onDeleteTask="onDeleteTask"
          />
        </b-list-group>
      </div>
    </div>
     <div class="main-list">
      <div class="header header-completed">
        Completed
      </div>
      <div class="assignment assignment-completed">
        <b-list-group
        style="padding-top: 10px; padding-bottom: 10px;">
          <Element
            v-for="item in completed"
            v-bind:key="item.id"
            :task="item"
            @onCompletedProgessIn="onCompletedProgessIn"
            @onDeleteTask="onDeleteTask"
          />
        </b-list-group>
      </div>
    </div>
    </div>
  </b-container>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  computed,
} from '@vue/composition-api';
import {
  ViewModelsAssignment,
  useAssignmentConn,
  EnumsAssignment,
} from '@/communications/assignment-api';
import Element from '@/components/assignment/Element.vue';
import ToastInfo from '@/components/assignment/ToastInfo.vue';
import { defToast, Toast } from '@/components/assignment/models';
import { StatusEnum } from '@/communications/assignment-api/enums';

export default defineComponent({
  components: {
    Element,
    ToastInfo,
  },
  setup() {
    const showToast = ref(false);
    const { getByStatusAsync } = useAssignmentConn();
    const todos: ViewModelsAssignment.Assignment[] = reactive([]);
    const inProgres: ViewModelsAssignment.Assignment[] = reactive([]);
    const completed: ViewModelsAssignment.Assignment[] = reactive([]);
    const toast: Toast = reactive(defToast());

    const toastBody = computed(() => `Move task #${toast.id} "${toast.name}" from ${toast.from} table to ${toast.to} table. (${new Date().toLocaleString()})`);

    async function getAllToDo() {
      const result = await getByStatusAsync(EnumsAssignment.StatusEnum.Todo);
      todos.splice(0, todos.length);
      todos.splice(todos.length, result.data, ...result.data);
    }

    async function getAllProgressIn() {
      const resultTwo = await getByStatusAsync(EnumsAssignment.StatusEnum.InProgres);
      inProgres.splice(0, inProgres.length);
      inProgres.splice(inProgres.length, resultTwo.data, ...resultTwo.data);
    }

    async function getAllCompleted() {
      const resultThree = await getByStatusAsync(EnumsAssignment.StatusEnum.Complete);
      completed.splice(0, completed.length);
      completed.splice(completed.length, resultThree.data, ...resultThree.data);
    }

    async function onToDoProgessIn(newToast: Toast) {
      Object.assign(toast, newToast);
      showToast.value = true;
      await getAllToDo();
      await getAllProgressIn();
    }

    async function onProgresInCompleted(newToast: Toast) {
      Object.assign(toast, newToast);
      showToast.value = true;
      await getAllProgressIn();
      await getAllCompleted();
    }

    async function onInProgressToDo(newToast: Toast) {
      Object.assign(toast, newToast);
      showToast.value = true;
      await getAllProgressIn();
      await getAllToDo();
    }

    async function onCompletedProgessIn(newToast: Toast) {
      Object.assign(toast, newToast);
      showToast.value = true;
      await getAllProgressIn();
      await getAllCompleted();
    }

    async function onDeleteTask(status: StatusEnum, newToast: Toast) {
      if (status === StatusEnum.Todo) {
        await getAllToDo();
      }
      if (status === StatusEnum.InProgres) {
        await getAllProgressIn();
      }
      if (status === StatusEnum.Complete) {
        await getAllCompleted();
      }
      Object.assign(toast, newToast);
      showToast.value = true;
    }

    onMounted(async () => {
      await getAllToDo();
      await getAllProgressIn();
      await getAllCompleted();
    });

    return {
      todos,
      inProgres,
      completed,
      showToast,
      toastBody,
      toast,
      onToDoProgessIn,
      onProgresInCompleted,
      onInProgressToDo,
      onCompletedProgessIn,
      onDeleteTask,
    };
  },
});
</script>

<style>
.main-list {
  width: 33%;
  border: solid;
  border-width: 1px;
  border-color: rgb(218, 218, 218);
  border-radius: 5px;
  margin-right: 2px;
}
.header {
  border-bottom: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(218, 218, 218);
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.header-to-do {
  background-color: #c1dfeb/*rgb(246, 246, 246)*/;
  color: #556368;
}
.header-in-progress {
  background-color: #b98fb6/*rgb(246, 246, 246)*/;
  color: #5e485c;
}
.header-completed {
  background-color: #aed692/*rgb(246, 246, 246)*/;
  color: #566849;
}
.assignment {
  overflow: scroll;
  overflow-x: auto;
  height: 500px;
  scrollbar-width: thin;
}
.assignment-to-do {
  scrollbar-color: #c1dfeb transparent;
}
.assignment-in-progress {
  scrollbar-color: #b98fb6 transparent;
}
.assignment-completed {
  scrollbar-color: #aed692 transparent;
}
.element:hover {
  background: rgb(235, 235, 235);
}
</style>
