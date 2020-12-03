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
        console.log(user.displayName);
        this.$store.dispatch('agregarUid',user.uid)
        console.log("Si hay usuario con sesión activa");
      } else {
        console.log("No hay usuario con sesión activa...")
        this.$store.dispatch('agregarUid','')
      }
    });
  },
};
</script>

<style lang="scss">

</style>
