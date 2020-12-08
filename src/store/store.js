import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareasDB: [],
    user: {}
  },
  getters: {
    enviandoTareas(state){
      return state.tareasDB;
    },
    enviarUser(state){
      return state.user;
    }
  },
  mutations: {
    traerDB(state){
      firebase.firestore().collection('tareas').onSnapshot(resp => {
        let arreglo = [];
        resp.forEach(element => {
          arreglo.push({
            id: element.id,
            idTask: element.data().idTask,
            task: element.data().task,
            completado: element.data().completado
          })
        });
        state.tareasDB = arreglo;
      })
    },
    agregarTask(state,data){
      firebase.firestore().collection('tareas').add({
        idTask: state.tareasDB.length + 1,
        task: data,
        completado: false,
      })
    },
    agregandoUser(state,userData){
      state.user = userData;
    }
  },
  actions: {
    traerDatos({commit}){
      commit('traerDB');
    },
    agregandoTarea({commit},data){
      commit('agregarTask',data);
    },
    completadoUpdate(context,item){
      firebase.firestore().collection('tareas').doc(item.id).update({
        completado: !item.completado,
      })
    },
    modificandoTarea(context, data){
      firebase.firestore().collection('tareas').doc(data.id).set({
        idTask: data.idTask,
        task: data.task,
        completado: data.completado,
      })
    },
    eliminarTask(context,id){
      firebase.firestore().collection('tareas').doc(id).delete().then(()=>{
        console.log("Eliminado");
      })
    },
    agregarUser({commit},user){
      commit("agregandoUser",user);
    }
  },
})
