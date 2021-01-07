import Vue from 'vue'
import App from './App.vue'

import VueMask from "v-mask"
import Vuelidate from "vuelidate";
import Vuex from "vuex"
import axios from "axios"

import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false

Vue.use(VueMask)
Vue.use(Vuelidate)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      love: "",
      phone: "",
      website: ""
    }
  },
  mutations: {
    updateUser: function(state, user) {
      state.user = user;
    }
  },
  actions: {
    getLoggedInUser: function(context) {
      axios.get("http://localhost:3000/user")
        .then(response => {
          context.commit("updateUser", response.data)
        })
    },
    updateUserData: function(context, payload) {
      const userCopy = {...context.state.user};
      userCopy[payload.property] = payload.value;
      context.commit("updateUser", userCopy)
    }
  }
})

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
