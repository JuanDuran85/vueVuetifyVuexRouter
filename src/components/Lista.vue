<template>
  <v-container>
    <h2 class="text-center font-weight-medium">Agregando Tareas</h2>
    <form @submit.prevent="agregando">
      <v-text-field
        v-model="task"
        label="Ingrese actividad o tarea"
        required
      ></v-text-field>
      <v-btn type="submit" class="mr-4">Agregar</v-btn>
      <v-btn  type="reset">Limpiar</v-btn>
    </form>
    <h2 class="text-left mt-16 font-weight-medium">Tareas por Realizar</h2>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Tarea
            </th>
            <th class="text-left">
              Eliminar
            </th>
            <th class="text-left">
              Modificar
            </th>
            <th class="text-left">
              Completar
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in traerTareas" :key="item.name">
            <td :class="[item.completado ? 'completoTask' : '']">{{ item.task }}</td>
            <td><v-btn color="error" elevation="5" @click="eliminando(item.id)">Eliminar</v-btn></td>
            <td><v-btn color="primary" elevation="5" @click="modificandoTask(item.id)">Modificar</v-btn></td>
            <td><v-btn :color="item.completado ? 'green' : 'blue-grey'" elevation="5" @click="completandoTask(item)">{{item.completado ? 'Abrir' : 'Completar'}}</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div>
      <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>

    <div class="mt-5">
      <h2>Lista de Imagenes</h2>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Nombre
              </th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in imagenes" :key="index">
              <td><v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="150" max-width="250" :src="item.url" :alt="item.name"></v-img></td>
              <td><v-btn tile color="error" @click="borrando(item.name)"><v-icon left>mdi-delete</v-icon>Eliminar</v-btn></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-container>
</template>

<script>
import firebase from 'firebase';
  export default {
    name: 'Lista',
    data: () => ({
      task: '',
      snackbar: false,
      text: 'Elemento Eliminado',
      timeout: 2000,
      imagenes: []
    }),
    computed: {
      traerTareas(){
        return this.$store.getters.enviandoTareas;
      }
    },
    mounted() {
        let storageRef = firebase.storage().ref('images/');
        storageRef.listAll().then((res)=>{
            res.items.forEach(element =>{
                let imagenTodo = {
                  name: element.name,
                  fullPath: element.fullPath,
                  bucket: element.bucket
                }
                element.getDownloadURL().then((url) => {
                        imagenTodo.url = url;
                        this.imagenes.push(imagenTodo);
                }).catch((error) => console.log(error));
            })
        }).catch(error => console.error(error));
    },
    methods: {
      agregando(){
        console.log("dentro de agregando");
        if (this.task && this.task.length > 5) {
          console.log("enviando informacion")
          this.$store.dispatch('agregandoTarea',this.task);
        } else {  
          console.log("No se puede...");
        }
      },
      completandoTask(item){
        this.$store.dispatch('completadoUpdate', item);
      },
      modificandoTask(id){
        this.$router.push({name: 'Modificar', params: {id}})
      },
      eliminando(id){
        this.$store.dispatch('eliminarTask',id);
        this.snackbar = true;
      },
      borrando(valor){
        firebase.storage().ref(`images/${valor}`).delete().then(() => {
          console.log("Archivo borrado con exito");
        }).catch((error) => {
          console.error(error);
        });

      }
    },
  }
</script>

<style scoped>
  .completoTask{
    background-color: rgba(133, 168, 64, 0.623);
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
  }
</style>
