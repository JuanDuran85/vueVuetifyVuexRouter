<template>
  <v-app>
    <NavBar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import firebase from 'firebase';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data: () => ({

  }),
  created(){
    this.$store.dispatch('traerDatos');
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('agregarUser',user)
        console.log("Si hay usuario con sesión activa");
      } else {
        console.log("No hay usuario con sesión activa...")
        this.$store.dispatch('agregarUser','')
      }
    });
  },
};
</script>

<style lang="scss">

</style>
