<template>
    <div class="mt-16">
          <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" lazy-src="https://picsum.photos/id/11/10/6" max-height="100%" max-width="100%" :src="datosUser.photoURL">
                <v-card-title>{{datosUser.displayName}}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
                Fono: {{datosUser.phoneNumber}}
            </v-card-subtitle>
            <v-card-subtitle class="pb-0">
                email: {{datosUser.email}}
            </v-card-subtitle>

            <v-card-text class="text--primary">
                <div>Fecha de Creación: {{datosUser.metadata.creationTime}}</div>
                <div>Última Sesión: {{datosUser.metadata.lastSignInTime}}</div>
            </v-card-text>

            <v-card-actions>
                <v-btn :color="datosUser.emailVerified ? 'orange' : 'red'" text>
                    Correo Verificado: {{datosUser.emailVerified ? 'Si' : 'No'}}
                </v-btn>
            </v-card-actions>
        </v-card>
        <div class="mt-16 text-center">
            <v-btn rounded color="primary" dark @click="editar">Editar Usuario</v-btn>
        </div>
        <v-container v-if="mostrar">
              <v-form v-model="valid" @submit.prevent="guardarEdit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="firstname"
                                :rules="nameRules"
                                :counter="10"
                                label="First name"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="lastname"
                                :rules="nameRules"
                                :counter="10"
                                label="Last name"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="phone"
                                :rules="phoneRules"
                                :counter="11"
                                label="Phone"
                                type="number"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="photoURL"
                                label="Photo URL"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <div class="mt-14 text-center">
                        <v-btn rounded color="primary" dark type="submit">Guardar</v-btn>
                    </div>
                </v-container>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
   name: 'PerfilUser',
   data() {
       return {
            mostrar: false,
            valid: false,
            photoURL: '',
            firstname: '',
            phone: '',
            phoneRules: [
                v => !!v || 'Phone is required',
                v => v.length <= 11 || 'Phone must be less than 11 characters',
            ],
            lastname: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
       }
   },
   computed: {
       datosUser(){
           return this.$store.getters.enviarUser;
       }
   },
   mounted() {
       let datos = this.$store.getters.enviarUser;
       let nombreCompleto = datos.displayName.split(" ");
       this.firstname = nombreCompleto[0];
       this.lastname = nombreCompleto[1];
       this.photoURL = datos.photoURL;
       this.email = datos.email;
   },
   methods: {
        editar(){
            this.mostrar = !this.mostrar;
        },
        guardarEdit(){
            firebase.auth().currentUser.updateProfile({
                displayName: this.firstname + ' ' + this.lastname,
                photoURL: this.photoURL,
            }).then(() => {
                console.log("Exito...");
            }).catch((error) => {
                console.error("error en updateProfile");
                console.error(error);
            });
            firebase.auth().currentUser.updateEmail(this.email).then(() => {
                console.log("Exito...");
            }).catch((error) =>{
                console.error(error);
            });

        }
   }
}
</script>

<style>

</style>