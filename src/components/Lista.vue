<template>
  <v-container>
    <h2 class="text-center font-weight-medium">Agregando Tareas</h2>
    <form @submit.prevent="agregando">
      <v-text-field
        v-model="task"
        label="Ingrese actividad o tarea"
        required
      ></v-text-field>
      <v-btn class="mr-4">Agregar</v-btn>
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
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
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
    methods: {
      agregando(){

      }
    },
  }
</script>
