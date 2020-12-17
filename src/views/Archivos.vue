<template>
    <v-container>
          <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Imagen a subir" prepend-icon="mdi-camera" label="Avatar" @change="subirIMG" counter show-size></v-file-input>
          <div class="mt-5">
            <v-progress-linear v-model="subiendo" height="25" >
                <strong>{{ Math.ceil(subiendo) }}%</strong>
            </v-progress-linear>
          </div>
          <div class="mt-5" v-if="urlImgSubida">
              <v-img lazy-src="https://picsum.photos/id/11/500/300" max-height="150" max-width="250" :src="urlImgSubida"></v-img>
          </div>
          <hr>
          <div class="mt-5">
            <v-row no-gutters>
                <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="4" v-for="(item, index) in urlImagenes" :key="index">
                    <v-img lazy-src="https://picsum.photos/id/11/500/300" max-height="250" max-width="100%" :src="item.url" @click="borrando(item.name)"></v-img>
                </v-col>
            </v-row>
          </div>
    </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Archivos',
    data() {
        return {
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            subiendo: 0,
            urlImgSubida: '',
            urlImagenes: [],
        }
    },
    methods: {
        borrando(nombre){
            firebase.storage().ref('imagenes/'+nombre).delete().then(()=>{
                console.log("Borrado con exito");
            }).catch((error) =>{
                console.error(error);
            });
        },
        subirIMG(imagen){
            if(imagen != undefined){
                console.log(imagen);
                let storageRef = firebase.storage().ref('imagenes/'+imagen.name);
                let task = storageRef.put(imagen);
                task.on('state_changed',(snapshot)=>{
                    let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + porcentaje + '% done');
                    this.subiendo = porcentaje;
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                        break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                        break;
                    }
                }, (error) =>{
                    console.error(error);
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            console.error("Sin autorizacion");
                        break;
                        case 'storage/canceled':
                            // User canceled the upload
                            console.error("Cancelado");
                        break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            console.error("Desconocido");
                        break;
                    }
                }, ()=>{
                    console.log("Subida finalizada");
                    setTimeout(()=>{
                        this.subiendo = 0;
                    },2500);
                    storageRef.getDownloadURL().then((downloadURL) =>{
                        console.log('File available at', downloadURL);
                        this.urlImgSubida = downloadURL;
                    })
                })
            }else{
                console.log("No tienes archivo");
            }
        }
    },
    mounted() {
        let storageRef = firebase.storage().ref('imagenes/');
        storageRef.listAll().then((res) =>{
            res.items.forEach((itemRef) => {
                let infoImagenes = {
                   name: itemRef.name,
                   fullPath: itemRef.fullPath,
                   bucket: itemRef.bucket
                };
                itemRef.getDownloadURL().then((downloadURL) =>{
                    infoImagenes.url = downloadURL;
                    this.urlImagenes.push(infoImagenes);
                })
            });
        }).catch(error => console.error(error));
    },

}
</script>

<style>

</style>