<template>
  <v-app>
    <NavBar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',

  components: {
    NavBar,
  },

  data: () => ({

  }),
  created(){
    this.$store.dispatch('traerDatos');
  }
};
</script>

<style lang="scss">

</style>
