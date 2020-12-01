import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareasDB: []
  },
  getters: {
    enviandoTareas(state){
      return state.tareasDB;
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
    }
  },
  actions: {
    traerDatos({commit}){
      commit('traerDB');
    },
    agregandoTarea({commit},data){
      commit('agregarTask',data);
    }
  },
})
