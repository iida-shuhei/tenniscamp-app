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
  apiKey: "AIzaSyC8pmGh-zapCO8aD95LCBwsQHfXY7QgYmo",
  authDomain: "tenniscamp-1d8dd.firebaseapp.com",
  projectId: "tenniscamp-1d8dd",
  storageBucket: "tenniscamp-1d8dd.appspot.com",
  messagingSenderId: "957925085891",
  appId: "1:957925085891:web:6257828afc6913d0e2c876",
  measurementId: "G-RR852J0Y1Z",
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
