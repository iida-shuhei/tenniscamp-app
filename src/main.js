import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import firebase from "firebase";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCV3klPFJ1Gtb5rcnRmsL2-jOT75W3KAh0",
  authDomain: "tenniscamp-app-f734e.firebaseapp.com",
  projectId: "tenniscamp-app-f734e",
  storageBucket: "tenniscamp-app-f734e.appspot.com",
  messagingSenderId: "178420771287",
  appId: "1:178420771287:web:2ae2e706dbdb7184074392",
  measurementId: "G-J510N7W3SE",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
