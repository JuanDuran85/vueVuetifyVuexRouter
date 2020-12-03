<template>
    <v-container class="m-6">
        <h2>Editando Tarea</h2>
        <form @submit.prevent="modificandoTask">
            <v-text-field label="Modifica la Tarea" :rules="rules" hide-details="auto" v-model="objetoTask.task"></v-text-field>
            <div class="mt-5">
                <v-btn type="submit" class="mr-4">Guardar</v-btn>
                <v-btn  type="reset">Limpiar</v-btn>
            </div>
        </form>
        <div class="text-center m-6 p-6">
            <v-btn color="lime" :disabled="dialog" :loading="dialog" class="white--text" @click="dialog = true">Regresar</v-btn>
        </div>
        <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                Please stand by
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container> 
</template>

<script>
export default {
    name: 'Modificar',
    props: ['id'],
    data() {
        return {
            dialog: false,
            rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            objetoTask: {
                id: '',
                idTask: '',
                task: '',
                completado: ''
            }
        }
    },
    watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => {
            this.dialog = false;
            this.$router.go(-1)
        }, 2000)
      },
    },
    methods: {
        modificandoTask(){
            this.$store.dispatch('modificandoTarea',this.objetoTask);
            setTimeout(()=>{
                this.$router.replace({name: 'Home'});
            },1000);
        }
    },
    mounted() {
        let resultado = this.$store.getters.enviandoTareas.find(res => res.id === this.id);
        this.objetoTask.id = resultado.id;
        this.objetoTask.idTask = resultado.idTask;
        this.objetoTask.task = resultado.task;
        this.objetoTask.completado = resultado.completado;
    },
}
</script>

<style>

</style>