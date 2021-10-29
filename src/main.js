// import axios from 'axios';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import  store from './store/store' 
Vue.config.productionTip = false;
 


// setInterval(store.dispatch('unViewedTasksCount('+ store.getters.loginuser.user.id+')'), 20000);
new Vue({
  router,
  vuetify,
  store, 
  render: h => h(App)
}).$mount('#app')

 