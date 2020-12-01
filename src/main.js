import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import { firebaseConfig } from "./config/firebaseConfig";

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
