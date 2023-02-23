<template>
  <div class="navbar-wrapperr">
    <div style="display: flex; align-items: center;">
      <img style="width: 40px;" src="@/assets/tick.png" />
      <div style="color: white; font-weight: bold;">Tasker</div>
    </div>
    <div style="display: flex; align-items: center; color: white; height: 100%">
      <div :class="tableStyle">
        <b-link class="link-text" to="/task" @click="navigationer=1">Tables</b-link>
      </div>
      <div :class="archivedStyle">
        <b-link class="link-text" to="/archived" @click="navigationer=2">Archived</b-link>
      </div>
      <div :class="deletedStyle">
        <b-link class="link-text" to="/deleted" @click="navigationer=3">Deleted</b-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@vue/composition-api';
import { useRouter } from '@/composables/useRouter';

export default defineComponent({
  setup() {
    const router = useRouter();
    const navigationer = ref(0);

    const tableStyle = computed(
      () => navigationer.value === 1 ? 'active-style' : 'text-link-wrapper',
    );
    const archivedStyle = computed(
      () => navigationer.value === 2 ? 'active-style' : 'text-link-wrapper',
    );
    const deletedStyle = computed(
      () => navigationer.value === 3 ? 'active-style' : 'text-link-wrapper',
    );

    onMounted(() => {
      switch (router.currentRoute.path) {
        case '/task':
          navigationer.value = 1;
          break;
        case '/archived':
          navigationer.value = 2;
          break;
        case '/deleted':
          navigationer.value = 3;
          break;
        default:
          navigationer.value = 0;
          break;
      }
    });

    return {
      tableStyle,
      archivedStyle,
      deletedStyle,
      navigationer,
    };
  },
});
</script>

<style>
.link-text {
  color: white;
  text-decoration: none;
}
.link-text:hover {
  color: white;
}
.navbar-wrapperr {
  background-color: #7d7fd8;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  justify-content: space-between;
}
.text-link-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
}
.text-link-wrapper:hover {
  background-color: #6e6fbf;
}
.text-link-wrapper:active {
  background-color: #6264aa;
}
.active-style {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #555791
}
</style>
