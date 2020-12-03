<template>
    <v-container>
        <v-form v-model="valid" @submit.prevent="iniciarSesion">
            <v-container>
            <v-row>
                <v-col
                cols="12"
                md="4"
                >
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                md="4"
                >
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
    name: 'Login',
    data() {
        return {
            errores: '',
            valid: false,
            password: '',
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods: {
        iniciarSesion(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(resp => {
                console.log(resp.user.photoURL);
                console.log(resp.user.phoneNumber);
                console.log(resp.user.displayName);
                console.log(resp.user.email);
                console.log(resp.user.emailVerified);
                console.log(resp.user.isAnonymous);
                console.log(resp.user.metadata.creationTime);
                console.log(resp.user.metadata.lastSignInTime);
                console.log(resp.user.refreshToken);
                console.log(resp.user.uid);
                this.$router.push('/tareas');
          })
          .catch(error => {
            console.error(error.code);
            console.error(error.message);
            if (error.code == "auth/wrong-password") {
              this.errores(error);
            } else if(error.code == "auth/invalid-email") {
              this.errores(error);
            } else if(error.code == "auth/user-disabled"){
              this.errores(error);
            } else {
              this.errores(error);
              this.$router.push('/registro');
            }
          })
        }
    },
}
</script>

<style>

</style>