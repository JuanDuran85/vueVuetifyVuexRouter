<template>
    <div>
        <v-container>
            <h2>Subiendo Archivo</h2>
            <v-progress-linear :value="progreso"></v-progress-linear>
            <v-file-input counter show-size accept="image/*" loading="primary" label="File input" @change="subiendoArchivo"></v-file-input>
        </v-container>
        <v-container>
            <h2>Imagenes</h2>
            <div v-if="traerImagen">
                <img :src="traerImagen" alt="asas">
            </div>
        </v-container>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Archivos',
    data() {
        return {
            archivo: '',
            progreso: 0,
            imagenes: [],
            itemImage: []
        }
    },
    computed:{
        traerImagen(){
            return this.$store.getters.enviarImagen;
        }
    },
    methods: {
        subiendoArchivo(file){
            if (file != undefined) {
                console.log(file);
                this.archivo = file;
                /* firebase.storage().ref('images/'+file.name).put(file); */
                let storageRef = firebase.storage().ref('images/'+file.name);
                let task = storageRef.put(file);
                task.on('state_chenged', (snapshot)=>{
                    let porcentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.progreso = porcentage;
                }, (error)=>{
                    console.error(error);
                    switch (error.code) {
                        case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                        case 'storage/canceled':
                        // User canceled the upload
                        break;

                        case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }

                }, ()=>{
                    console.log("todo listo");
                    setTimeout(()=>{
                        this.progreso = 0;
                    },1500);

                    //let starsRef = storageRef.child('images/post-1.jpg');
                    //console.log(starsRef);
                    storageRef.getDownloadURL().then((url) => {
                        // Insert url into an <img> tag to "download"
                        this.$store.dispatch('agregandoImagen',url);
                    }).catch((error) => console.log(error));



                })
            } else {
                console.log("Se limpio el input");
            }
        }
    },
}
</script>

<style>

</style>