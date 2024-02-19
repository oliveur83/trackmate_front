<!-- App.vue -->
<template>
  <div id="app">
    <MonPremierComposant />
  </div>
</template>

<script>
import MonPremierComposant from './components//view/ViewPrincipal.vue';

export default {
  components: {
    MonPremierComposant,
  },
};
</script>

<style>
body, html {
  height: 100%;

}
</style>
