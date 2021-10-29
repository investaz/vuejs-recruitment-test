<template>
  <div>
    <v-dialog
       v-model="dialog"
       width="950"
       @click:outside="dialog = true"
    >
      <template v-slot:activator="{ on }"> 
        <v-btn @click="status=allorders.filter(orId=>{return orId.id === orderId})[0].status" v-on="on">BAX </v-btn>
      </template> 
      <v-card>
        <v-card-title  class="modal-header">
          <span>Sifarişlər</span>
          <v-spacer></v-spacer> 
           <v-btn
            icon
            color="primary"
            text
            @click="dialog = false"
          ><v-icon>cancel</v-icon> 
          </v-btn> 
        </v-card-title>
         
        <v-card-text>
             <v-row>
                 <v-col   cols="12"   md="12" >  
                 <v-data-table 
                 :headers="headers"
                 :items="orderDetail"   
                 item-key="id" 
                 :footer-props="{
                 itemsPerPageText:'Məlumat sayı:',
                 itemsPerPageOptions: [10,50,100, 1000], 
          
      }">
     
        <template v-slot:body="{ items }"> 
           <tbody class="moreDetails">
            <tr v-for="(item, key) in items" :key="item.id">
            <td :class="item.closed === true ? 'closed' : ''">{{key+1}}</td>
            <td>{{item.mealName}}</td>
            <td>{{ item.amount }}</td> 
            <td>{{ item.price + ' AZN' }}</td>
            <td>{{ item.orderTime }}</td> 
            <td><span :class="item.status === 'imtina' ? 'refuse' : ''" >{{ item.status }}</span></td>
            <td ><button  :disabled="status=='Sonlanıb'" @click="refOrder(item.id)" v-if="item.status!='imtina'" class="takeback">Geri al</button></td>
          </tr>
          <tr v-if="orderDetail.length!=0" class="sum">
             <td colspan="3">Cəmi məbləğ:</td>
             <td colspan="4">{{sumPrice + ' AZN'}} </td>  
         </tr>
         <tr v-if="orderDetail.length==0" class="norecord">
             <td colspan="8"><div class="norecord-c">'Sifariş əlavə et' düyməsini basaraq sifarişləri daxil edin!</div></td>
        </tr>
      </tbody>
    </template>
  </v-data-table>  
              </v-col>
             </v-row>
        </v-card-text> 
        <v-divider></v-divider> 
        <v-card-actions class='dialog-buttons'>
           <div class="align-left all-bt">
            <AddOrder v-on:sum='sum' v-bind:orderId = 'orderId' v-if="status=='Sonlanmayıb'" />
            <v-btn  v-if="status=='Sonlanmayıb'" @click=" endOrderSubmit(); $emit('sumTotal'); dialog = false"  class="btn-action" outlined>Sonlandır</v-btn> 
           </div>
          <div  class="align-right all-bt">
           <v-btn   v-if="status=='Sonlanmayıb'"  @click="applySubmit(); $emit('sumTotal');dialog = false"  class="btn-cancel" outlined>Təsdiq et</v-btn> 
           <v-btn  @click="refuse();dialog = false;"  class="btn-cancel" outlined>BAĞLA</v-btn> 
           </div>
        </v-card-actions> 
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
   import { mapGetters, mapActions } from "vuex";  
   import AddOrder from '../popups/AddOrder'
   export default {
   props:["orderId"],
   components:{ AddOrder  },
    data () {
      return { 
      dialog:false,
      selectedRow: null, 
      sumPrice:null,
      status:'',
      orderDetail:[],

      headers:[
        { text: '№',   value: 'index',sortable:false },
        { text: 'Məhsulun adı',   value: 'mealName'  },
        { text: 'Miqdar', value: 'amount'   },  
        { text: 'Məbləğ', value: 'price'   },  
        { text: 'Sifariş saatı', value: 'orderTime'   },  
        { text: '#',  value: 'status' ,sortable:false  },
        { text: 'Geri',  value: 'takeback' ,sortable:false  }
      ]
      }
    },
     computed:{ ...mapGetters(["allorders"]), },
     methods: {  ...mapActions(["fetchOrders", "refuseOrder","endOrder","applyOrder"]),   
                 updatePrice:function(){   this.$emit('updatePrice',this.sumPrice);  },

                  refOrder(id){
                    this.orderDetail.filter(orId=>{return orId.id === id})[0].status="imtina";
                    this.sumPrice=this.orderDetail.filter(item=>{return item.status != 'imtina'}).map(item =>parseFloat(item.price)).reduce((prev, next) => prev + next);   },
      
                 endOrderSubmit() {
                    let today=new Date();
                    this.endOrder({order:{
                    price:this.sumPrice,
                    endDate: today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(),
                    endTime: today.getHours() + ":" + today.getMinutes()},   id:this.orderId})
                                   },
              applySubmit() { this.applyOrder({order:{ price:this.sumPrice},   id:this.orderId}) },
              sum(){  this.sumPrice=this.orderDetail.filter(item=>{return item.status != 'imtina'}).map(item =>parseFloat(item.price)).reduce((prev, next) => prev + next); },
              refuse(){
                 this.fetchOrders()
               .then(()=>{
                 if(this.allorders.filter(orId=>{return orId.id === this.orderId})[0].orders){
                this.orderDetail=this.allorders.filter(orId=>{return orId.id === this.orderId})[0].orders;
                  this.sumPrice=this.orderDetail.filter(item=>{return item.status != 'imtina'}).map(item =>parseFloat(item.price)).reduce((prev, next) => prev + next);
   
                  }
                   })
              }
               }, 
     
 created(){
 
  // this.fetchOrders()
  // .then(()=>{
     if(this.allorders.filter(orId=>{return orId.id === this.orderId})[0].orders){
     this.orderDetail=this.allorders.filter(orId=>{return orId.id === this.orderId})[0].orders;
     }
      //  })
  // .then(()=>{
     if(this.orderDetail.length != 0){
     this.sumPrice=this.orderDetail.filter(item=>{return item.status != 'imtina'}).map(item =>parseFloat(item.price)).reduce((prev, next) => prev + next);
     }
    //  })
   
 }
  }
</script>

<style scoped>

</style>