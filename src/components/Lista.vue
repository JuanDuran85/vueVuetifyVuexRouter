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
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in traerTareas" :key="item.name">
            <td>{{ item.task }}</td>
            <td><v-btn color="error" elevation="5">Eliminar</v-btn></td>
            <td><v-btn color="primary" elevation="5">Modificar</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
  export default {
    name: 'Lista',
    data: () => ({
      task: '',

    }),
    computed: {
      traerTareas(){
        return this.$store.getters.enviandoTareas;
      }
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
      }
    },
  }
</script>
