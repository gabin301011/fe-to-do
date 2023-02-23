<template>
  <b-container style="margin-top: 20px;">
    <b-table striped hover :items="tasks" :fields="fields"></b-table>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@vue/composition-api';
import { useAssignmentConn, ViewModelsAssignment } from '@/communications/assignment-api';

export default defineComponent({
  setup() {
    const { getAllArchivedAsync } = useAssignmentConn();
    const tasks: ViewModelsAssignment.Assignment[] = reactive([]);

    const fields = [
      {
        key: 'name',
        label: 'Name',
      },
    ];

    async function getAllArchived() {
      const result = await getAllArchivedAsync();
      tasks.splice(0, tasks.length);
      tasks.splice(tasks.length, result.data, ...result.data);
    }

    onMounted(async () => {
      await getAllArchived();
    });

    return {
      tasks,
      fields,
    };
  },
});
</script>
