import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "Registro" */ '../views/Registro.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/perfil',
    name: 'PerfilUser',
    component: () => import(/* webpackChunkName: "PerfilUser" */ '../views/PerfilUser.vue')
  },
  {
    path: '/tareas',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta:{
      login: true
    }
  },
  {
    path: '/modificar/:id',
    name: 'Modificar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Modificar.vue'),
    props: true
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let userUid = store.getters.enviarUser.uid;
  let validado = to.matched.some(ruta => ruta.meta.login);

  if (!userUid && validado) {
    next('/login')
  } else {
    next();
  }
})

export default router
