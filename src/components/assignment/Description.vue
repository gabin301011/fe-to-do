<template>
  <small>{{ descriptionCom }}</small>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    description: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const descriptionCom = computed(() => {
      const descriptionTemp = props.description;
      if (descriptionTemp !== null && typeof descriptionTemp !== 'undefined') {
        if (descriptionTemp.length > 70) {
          const temp = descriptionTemp.substring(0, 70);
          return `${temp}...`;
        }
        return descriptionTemp;
      }
      return 'No description';
    });

    return {
      descriptionCom,
    };
  },
});
</script>
