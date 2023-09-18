<template>
  <BasicLayout>
    <h1>Estamos en el login</h1>
    <router-link to="/register"> Registrate </router-link>
  </BasicLayout>
</template>

<script>
import BasicLayout from "../layouts/BasicLayout.vue";
export default {
  name: "login",
  components: {
    BasicLayout,
  },
};
</script>

<style>
</style>