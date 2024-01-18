import {createApp} from 'vue'

import router from './router'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './registerServiceWorker'

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6qz_iklcCwKG64iKFUDnk-zJf2zWMRbA",
    authDomain: "minesweeper-a592f.firebaseapp.com",
    projectId: "minesweeper-a592f",
    storageBucket: "minesweeper-a592f.appspot.com",
    messagingSenderId: "484002353613",
    appId: "1:484002353613:web:bcc21b8186e8a0f3f53484"
};

initializeApp(firebaseConfig);


const app = createApp(App)

app.use(router)

app.mount('#app')
