<template>
  <div style="display: flex; align-items: center;">
    <div :class="archived" class="badge-custom">
      {{ Translation.ArchivedUpper }}
    </div>
    <div :class="notArchived" class="badge-custom">
      {{ Translation.NotArchivedUpper }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { SendModelsAssignment, useAssignmentConn } from '@/communications/assignment-api';
import { Translation } from '@/translation';

const DARK_VARIANT_STYLE = 'dark';
const ARCHIVED_VARIANT_STYLE = 'archived';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    isArchived: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const archived = computed(
      () => props.isArchived ? ARCHIVED_VARIANT_STYLE : DARK_VARIANT_STYLE,
    );
    const notArchived = computed(
      () => props.isArchived ? DARK_VARIANT_STYLE : ARCHIVED_VARIANT_STYLE,
    );

    return {
      Translation,
      archived,
      notArchived,
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
.archived {
  background-color: #f4d3af;
  color: rgb(114, 89, 52);
}
</style>
