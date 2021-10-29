<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="650"
    >
      <template v-slot:activator="{ on }" >
       
          <v-btn class="add_order"  v-on="on">Sifariş əlavə et </v-btn>
        
      </template> 

      <v-card>
        <v-card-title
          class="modal-header"
           
        >
          <span>Sifariş əlavə et</span>
          <v-spacer></v-spacer>
          
           <v-btn
             icon
            @click="dialog = false"
          ><v-icon>cancel</v-icon>
            
          </v-btn>
          
        </v-card-title>
              <v-form v-model="isFormValid" ref="form" >
        <v-card-text>
               <v-row>
                  
                           <v-col    cols="12"   md="12" > 
                           <v-select  :rules="validationRules" @change='getMeal()' v-model="mealName" label="Məhsul adı"   :items="allmeals"   item-value="name" item-text="name">
                         
                             </v-select>    
          
                        </v-col>  
                        <v-col cols="12"  md="6"   >
                         <v-text-field oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  :rules="validationRules" v-model="amount"  label="Miqdar"   required ></v-text-field>
                   
                         </v-col>
                          <v-col cols="12"  md="6"   class="price">
                         <v-text-field  disabled  v-model="price"  label="Qiymət"   required ></v-text-field>
                
                         </v-col> 

             </v-row>
        </v-card-text>
              </v-form>
        <v-divider></v-divider>

        <v-card-actions class='dialog-buttons'>
           <v-btn  @click="dialog = false;"   class="btn-cancel" outlined>İmtina et</v-btn> 
           <v-btn :disabled="!isFormValid"  @click="dialog = false; addnewOrderSubmit(); $emit('sum')" class="btn-cancel" outlined>Tətbiq et</v-btn> 
      
        </v-card-actions>
  
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  
  import { mapGetters, mapActions } from "vuex";  
      
  export default { 
     props:["orderId"], 
    data () {
      return {  
      isFormValid:false, 
      dialog:false,
      selectedRow: null,
      mealName:null,    
      amount:null,
      price:null,
      validationRules: [v => !!v || 'Sahəni boş buraxmaq olmaz!' ],
      idForOrder: 100, 
      }
    },
     computed:{ ...mapGetters(["allmeals"])},
     methods: {  ...mapActions(["fetchMeals",'addnewOrder']),  
     getMeal(){
       if(this.amount){
       this.price=this.allmeals.filter(item=>{return item.name == this.mealName})[0].price*this.amount; 
       }
       else{
           this.price=this.allmeals.filter(item=>{return item.name == this.mealName})[0].price
       }
     },

       addnewOrderSubmit() {
        let today=new Date();
        this.addnewOrder({order:{
        id: this.idForOrder,
        mealName:this.mealName,
        amount:this.amount,
        price:this.price,
        status:'verildi',
        orderTime:today.getHours() + ":" + today.getMinutes() },   id:this.orderId}) 
        this.idForOrder++
   
    },

  
     },

        watch : {
                amount: function (val) {
                    this.amount = val;
                    if(this.mealName){  this.price=this.allmeals.filter(item=>{return item.name == this.mealName})[0].price}
                    if(this.mealName && val ){ this.price = this.price * val;  } 
                },
   
                price: function (val) { this.price = val; }
    }, 
     
 created(){
   
   this.fetchMeals()
  

 }
  }
</script>

<style scoped>

</style>