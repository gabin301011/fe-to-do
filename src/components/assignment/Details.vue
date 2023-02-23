<template>
    <b-container style="position: relative;">
      <div class="wrapper">
        <div style="display: flex; flex-direction: row">
          <div class="details-wrap">
            <div class="buttons-wrapper">
              <Button
                style="margin-right: 20px;"
                @click="onBack()"
                icon="pi pi-arrow-left"
                class="p-button-rounded p-button-secondary"
              />
            </div>
            <div class="details-wrapper">
              <div style="display: flex; flex-direction: row;
                font-size: 25px; justify-content: space-between;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                <div style="font-weight: bold; margin-right: 10px; font-size: 35px;">
                  #{{ taskDetails.id }}</div>
                <div>{{ taskDetails.name }}</div>
                </div>
                <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-info p-button-sm"
              />
              </div>
              <div class="details-description">{{ taskDetails.description }}</div>
              <div style="margin-top: 20px;">
                <Priorities
                  @onUpdateDetails="updateDetails"
                  :id="taskDetails.id" :priority="taskDetails.priority" />
              </div>
              <div style="margin-top: 20px;">
                <Statuses
                @onUpdateDetails="updateDetails"
                  :id="taskDetails.id" :status="taskDetails.status"
                 />
              </div>
              <div style="margin-top: 20px;">
                <Archived
                @onUpdateDetails="updateDetails"
                  :id="taskDetails.id" :isArchived="taskDetails.isArchived"
                 />
              </div>
              <div style="display: flex; flex-direction: row; justify-content: space-between;
              margin-top: 20px;">
                <div style=" font-size: 13px;
  color: rgb(186, 186, 186);
  font-style: italic;">Created at {{ taskDetails.createdAt }}</div>
                <div>
                  <Button label="Delete" class="p-button-raised p-button-danger" />
                </div>
              </div>
            </div>
          </div>
          <div class="history">
            <div class="history-head">History of assignment</div>
            <History :task="history" />
          </div>
        </div>
      </div>
    </b-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@vue/composition-api';
import { useRouter } from '@/composables';
import { useAssignmentConn, ViewModelsAssignment } from '@/communications/assignment-api';
import History from '@/components/assignment-details/History.vue';
import Priorities from '@/components/assignment-details/Priorities.vue';
import Statuses from '@/components/assignment-details/Statuses.vue';
import Archived from '@/components/assignment-details/Archived.vue';

export default defineComponent({
  components: {
    History,
    Priorities,
    Statuses,
    Archived,
  },
  setup() {
    const taskDetails = reactive(ViewModelsAssignment.defAssignment());
    const history: ViewModelsAssignment.HistoryAssignment[] = reactive([]);
    const router = useRouter();
    const {
      getByIdAsync,
      getHistoryAssignmentByIdAsync,
    } = useAssignmentConn();

    function onBack() {
      router.push({
        name: 'Assignment',
      });
    }

    async function getDetails() {
      Object.assign(taskDetails, ViewModelsAssignment.defAssignment());
      const result = await getByIdAsync(Number(router.currentRoute.params.id));
      Object.assign(taskDetails, result.data);
    }

    async function getHistory() {
      history.splice(0, history.length);
      const result = await getHistoryAssignmentByIdAsync(Number(router.currentRoute.params.id));
      history.splice(history.length, result.data, ...result.data);
    }

    async function updateDetails() {
      await getDetails();
      await getHistory();
    }

    onMounted(async () => {
      await getDetails();
      await getHistory();
    });

    return {
      onBack,
      taskDetails,
      history,
      updateDetails,
    };
  },
});
</script>

<style>
.details-description {
  color: rgb(116, 116, 116);
}
.details-wrapper {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
}
.wrapper {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
}
.history {
  width: 30%;
  height: 600px;
}
.history-head {
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 10px;
}
.details-wrap {
  width: 70%;
  margin-right: 30px;
}
.buttons-wrapper {
  display: flex;
  justify-content: flex-start;
}
</style>
