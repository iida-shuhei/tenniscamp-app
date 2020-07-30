import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";
import firebase from "firebase";

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA0Y7fTVM3NX5XRmvducfJd-QS8vGiLI9M",
  authDomain: "tenniscamp-app.firebaseapp.com",
  databaseURL: "https://tenniscamp-app.firebaseio.com",
  projectId: "tenniscamp-app",
  storageBucket: "tenniscamp-app.appspot.com",
  messagingSenderId: "43058144599",
  appId: "1:43058144599:web:1047c15cb5c3526cd40a12",
  measurementId: "G-PZLMGBWS3J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
