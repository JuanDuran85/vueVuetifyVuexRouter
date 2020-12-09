# vueVuetifyVuexRouter

Ejemplo de implementación con Firebase, Vue, Vue Router, Vuex, Vuetify - Generación G3


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## Configurando e instalando FireBase

Para trabajar con firebase debes tener una cuenta de Google, ir al sitio web oficial y crear un nuevo proyecto, haciendo clic en comenzar, luego en añadir proyecto, escribir el nombre del proyecto y seguir los pasos.

* Sitio oficial:
    [Firebase](https://firebase.google.com/)

* Documentación para JavaScript con Firestore.
    [Firestore](https://firebase.google.com/docs/reference/js/firebase.firestore.Firestore)

* Instalacion con NPM:
```bash
npm i firebase --save
```

* Instalacion con Yarn:
```bash
yarn add firebase -D
```

* Para llevar una aplicacion al Hosting de firebase, se debe:
1. Crear el proyecto en firebase
2. Entrar en la seccion del hosting
3. Hacer un clic en iniciar o get started
4. Instalar mediante la terminal firebase tool con:
    Con NPM
    ```bash
      npm i firebase-tools -g
      ```
    Con Yarn
      ```bash
      yarn global add firebase-tools
    ```
5. Luego clic en continuar dentro de firebase hosting
6. Ahora en el editor, dentro del proyecto, se debe iniciar sesion de firebase con el comando: ```firebase login```, seleccionando o iniciando la sesion con la cuenta de gmail donde se encuentra ejecutando firebase hosting en la web
7. Ahora en la terminal, se debe iniciar el proyecto con ```firebase init```
8. Luego si en proceder
9. Despues seleccionar el hosting
10. Si ya tienes el proyecto, selecciona: Use an existing proyect
11. Posteriormente selecciona el proyecto en el cual tienes activo el hosting.
12. Ahora se debe escribir el nombre del directorio donde se encontraran los archivos de produccion. En este caso se debe ingresar "dist" porque este sera el nombre de la carpeta que crea vue-cli para al producción.
13. Indicar que si para compilar en una SFC
14. Finalizado el proceso de configuracion de firebase, se debe iniciar el proceso de produccion con vue-cli mediante el comando "build", ya sea:
    Con NPM
    ```bash
      npm run build
      ```
    Con Yarn
      ```bash
      yarn build
    ```
15. Terminado el proceso de producción de vue-cli, se debe enviar los archivos de la carpeta dist al hosting de firebase, mediante la instruccion: ```firebase deploy --only hosting```

