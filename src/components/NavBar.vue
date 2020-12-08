<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title><router-link tag="div" :to="{name: 'Home'}">Todo List</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title><router-link tag="div" :to="{name: 'Registro'}">Registro | </router-link></v-toolbar-title>
      <v-toolbar-title><router-link tag="div" :to="{name: 'Login'}">| Login | </router-link></v-toolbar-title>
      <v-toolbar-title><router-link tag="div" v-if="uidUser.uid" :to="{name: 'PerfilUser'}">| Perfil | </router-link></v-toolbar-title>
      <v-toolbar-title @click="salida">| SingOut</v-toolbar-title>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'Navbar',
    computed: {
      uidUser(){
        return this.$store.getters.enviarUser
      }
    },
    methods: {
      salida(){
        if (this.$store.getters.enviarUser) {
          firebase.auth().signOut().then(() => {
            this.$router.push('/login').catch(()=>{});
          }).catch((error) => {
              console.error(error);
          });
        } 
      }
    },
}
</script>