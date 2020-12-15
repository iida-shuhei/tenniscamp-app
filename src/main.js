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
  apiKey: "AIzaSyD5uB6sYMQLzj6FYz1_OM2XnRqe6NgIVM0",
  authDomain: "tenniscamp-5256b.firebaseapp.com",
  projectId: "tenniscamp-5256b",
  storageBucket: "tenniscamp-5256b.appspot.com",
  messagingSenderId: "427307411962",
  appId: "1:427307411962:web:2d50cee900ae344d8a5c43",
  measurementId: "G-9RH59YY6P7",
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
