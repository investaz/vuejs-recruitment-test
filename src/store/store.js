import Vuex from 'vuex';
import Vue from 'vue';
import orders from './modules/orders';
 
import axios from 'axios'; 
// Load Vuex
Vue.use(Vuex);
  // axios.defaults.baseURL = './jsonfiles';
   
 axios.defaults.headers.common['Accept-Language'] = 'az_AZ'; 
// Create store
export default new Vuex.Store({
   
  modules: { orders }
});
