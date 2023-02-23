<template>
  <div id="app">
    <Navigation/>
    <router-view/>
    <!-- <Sidebar/> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent } from '@vue/composition-api';
import Navigation from '@/components/navigation/Navigation.vue';
import Sidebar from '@/components/navigation/Sidebar.vue';

Vue.use(VueCompositionAPI);

export default defineComponent({
  components: {
    Navigation,
    Sidebar,
  },
});
</script>

<style>
* {
  padding: 0;
}
</style>
