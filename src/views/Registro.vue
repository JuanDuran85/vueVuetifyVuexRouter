<template>
<v-container>
        <v-form v-model="valid" @submit.prevent="registrar">
            <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="name"
                        label="Nombre"
                        required
                        type="text"
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

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        type="password"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-btn type="submit" color="blue">Ingresar</v-btn>
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Registro',
    data() {
        return {
            errores: '',
            valid: false,
            password: '',
            email: '',
            name: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods: {
        registrar(){
            if (this.name && this.name.length > 2 && this.email && this.password && this.password > 6) {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(resp => { 
                    return resp.user.updateProfile({
                        displayName: this.name
                    }).then(() => {
                        this.$router.push('/tareas');
                    })
                })
                .catch(error => {
                    console.error(error.code);
                    console.error(error.message);
                    if (error.code == "auth/email-already-in-use") {
                    this.errores(error);
                    } else if(error.code == "auth/invalid-email") {
                    this.errores(error);
                    } else if(error.code == "auth/weak-password"){
                    this.errores(error);
                    } else {
                    this.errores(error);
                    }
                })
            } else {
                console.error("no se puede registrar");
            }
        }    
    }
}
</script>

<style>

</style>