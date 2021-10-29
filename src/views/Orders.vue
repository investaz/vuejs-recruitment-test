<template>
<div>
  <div  class="buttons-bar" cols="12" sm="2" md='1'> <NewOrder/> </div> 
  <div class="table-componenet"> 
    <v-data-table  
      :headers="headers"
      :items="allorders"   
      item-key="personnelName" 
       :sort-by="['status']"
       :sort-desc="[ true]"
      :footer-props="{
      itemsPerPageText:'Məlumat sayı:',
      itemsPerPageOptions: [10,50,100, 1000],  
      }">
     
        <template v-slot:body="{ items }"> 
           <tbody>
           <tr v-for="(item, key) in items" :key="item.name">
              <td :class="item.endDate ? 'closed' : 'notClosed'">{{key+1}}</td>
              <td>{{ item.table }}</td>
              <td>{{ item.personnelName }}</td>
              <td>{{ item.status }}</td>
              <td><span v-if="item.price">{{  item.price + ' AZN' }}</span></td>
              <td><span v-if="item.endDate">{{ item.endDate +' '+ item.endTime}}</span></td> 
              <td><MoreDetails v-on:sumTotal='sumTotal' v-bind:orderId = 'item.id'/></td>
           </tr>
          <tr class="sum"> 
              <td colspan="4">Cəmi məbləğ:</td>
              <td colspan="3">{{sumPrice + ' AZN'}} </td> 
         </tr>
         <tr v-if="allorders.length==0" class="norecord">
             
              <td colspan="6"><div class="norecord-c">Məlumat yoxdur...</div></td>
        </tr>
      </tbody>
    </template>
  </v-data-table> 
    <ErrorDialog v-model="dialog_err"  v-bind:errorMsg="errorMsg"/>
  </div>
 
  </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";  
    import MoreDetails from '../popups/MoreDetails'
    import NewOrder from '../popups/NewOrder'
    import ErrorDialog from '../popups/ErrorDialog'
    export default {
    name: 'Orders',   
    components:{  NewOrder,MoreDetails ,ErrorDialog },
    data () {
      return {  
        errorMsg:'',
        dialog_err:false, 
        selectedRow: null, 
        sumPrice:null,
        price:null,
        headers:[
        { text: '№',   value: 'index',sortable:false },
        { text: 'Masa',   value: 'table'  },
        { text: 'Xidmətçi', value: 'personnelName'   },  
        { text: 'Status', value: 'status'   },  
        { text: 'Məbləğ', value: 'price'   },  
        { text: 'Sonlanma Tarixi', value: 'endDate'   }, 
        { text: 'Ətraflı',  value: 'more' ,sortable:false  },
      ]
      }
    },
       methods: {
    ...mapActions(["fetchOrders"]), 
       updatePrice:function(updatePrice){   this.price=updatePrice;  },
       sumTotal(){   this.sumPrice=this.allorders.map(item =>parseFloat(item.price)).reduce((prev, next) => prev + next); }  
        },
        
       computed:{ ...mapGetters(["allorders"]),   },

       created() {
            this.fetchOrders()
           .then(()=>{
            this.sumPrice=this.allorders.map(item =>parseFloat(item.price)).reduce((prev, next) => prev + next);
             })  
  }
}
</script>