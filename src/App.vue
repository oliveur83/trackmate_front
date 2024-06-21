<!-- App.vue -->
<template>
  <div id="app">
    <ViewPrincipal />
  </div>
</template>

<script>
import ViewPrincipal from './components//view/ViewPrincipal.vue';

export default {
  components: {
    ViewPrincipal,
  },
};
</script>

<style>
body,
html {
  height: 100%;
}
</style>
