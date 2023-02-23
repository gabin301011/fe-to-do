<template>
<div style="height: 100%">
  <Sidebar
    :visible.sync="visibleLeft"
    :baseZIndex="1000"
  >
  <PanelMenu :model="items" />
  </Sidebar>
  <Button v-ripple
  class="p-shadow-5 p-ripple purple"
  style="z-index: 999; position:absolute;"
  icon="pi pi-arrow-right" @click="onVisibleSidebar" />
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const visibleLeft = ref(false);

    const items = [
      {
        label: 'Tablice',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Aktywne',
            icon: 'pi pi-fw pi-file',
            items: [],
          },
          {
            label: 'Zakończone',
            icon: 'pi pi-fw pi-file',
            items: [],
          },
        ],
      },
      {
        label: 'Tablice archiwalne',
        icon: 'pi pi-fw pi-calendar',
        items: [],
      },
    ];

    function onVisibleSidebar() {
      visibleLeft.value = true;
    }

    return {
      visibleLeft,
      onVisibleSidebar,
      items,
    };
  },
});
</script>
