 
import axios from 'axios'; 
const state = { 
    orders:[],
    meals:[],
    workers:[],
    tables:[]
};

const getters = {
  
  allorders: state => state.orders,
  allmeals: state => state.meals, 
  alltables: state => state.tables,
  allworkers: state => state.workers 
};
const mutations={
  setOrders: (state, orders) => (state.orders = orders),
  setMeals: (state, meals) => (state.meals = meals),
  setWorkers: (state, workers) => (state.workers = workers),
  setTables: (state, tables) => (state.tables = tables),
  refuseorder(state, order) {
    const index = state.orders.findIndex(item => item.id == order.id)
    state.orders.splice(index, 1, order)
  },
  
  newOrder: (state, order) => state.orders.push(order), 
};
const actions = { 

    
   async fetchOrders(context) 
   {  
    const response = await axios.get('jsonfiles/orders.json'); 
    context.commit('setOrders',  response.data);  
    
   },

   async fetchMeals(context) 
   {  
    const response = await axios.get('jsonfiles/meals.json'); 
    context.commit('setMeals',  response.data);  
    
   },
   async fetchTables(context) 
   {  
    const response = await axios.get('jsonfiles/tables.json'); 
    context.commit('setTables',  response.data);  
    
   },
   async fetchWorkers(context) 
   {  
    const response = await axios.get('jsonfiles/workers.json'); 
    context.commit('setWorkers',  response.data);  
    
   },

  //  async fetchDictionary(context, type) 
  //  {  
  //   const response = await axios.get(`jsonfiles/orders.json/${id}`); 
  //   context.commit('setWorkers',  response.data);  
  //     },

   async refuseOrder(context, id, status) { 
    const response = await axios.put(`jsonfiles/orders.json/${id}`, status );
    context.commit('refuseorder', response.data);
     
  },

  async addOrder( context, order )
  { 
  // let response = await axios.post('jsonfiles/orders.json', {
       let response = ({
        id: order.id,
     table: order.table,
     personnelName:order.personnelName,
     status: 'Sonlanmayıb',
     orders:[] 
  } )
   
  context.commit('newOrder', response); 
   
 },

 async addnewOrder( context , {order,id})
 {    
 // let response = await axios.post('jsonfiles/orders.json', {
   
 state.orders.filter(orId=>{return orId.id === id})[0].orders.push(order)
},

async createAction( context , {obj, order})
{     
 state[obj].push(order)
},

async deleteAction( context , {obj, id})
{ console.log(obj);
  state[obj]= state[obj].filter(key=>key.id!==id);
},

  async endOrder( context , {order,id})
   {    let endDate=order.endDate;
        let endTime=order.endTime;
   // let response = await axios.post('jsonfiles/orders.json', { 
     state.orders.filter(orId=>{return orId.id === id})[0].status="Sonlanıb";
     state.orders.filter(orId=>{return orId.id === id})[0].price=order.price;
    Object.assign( state.orders.filter(orId=>{return orId.id === id})[0], {endDate,endTime});
      
    },

    async applyOrder( context , {order,id})
    {   
      state.orders.filter(orId=>{return orId.id === id})[0].price=order.price;
      
       
     }
        };



export default {
  state,
  getters,
  actions,
  mutations
};
