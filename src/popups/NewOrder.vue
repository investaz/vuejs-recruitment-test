<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="450"
    >
      <template v-slot:activator="{ on }"> 
          <v-btn v-on="on">Sifariş yarat </v-btn>
      </template> 
      <v-card>
        <v-card-title
          class="modal-header" 
        >
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
           <v-form  v-model="isFormValid" ref="form" > 
        <v-card-text>
             <v-row>
                 <v-col    cols="12"   md="12" > 
                     <v-select :rules="validationRules"  label="Masanı seçin" v-model="table"  :items="alltables" item-value="name" item-text="name"> </v-select> 
                 </v-col>  
                  <v-col    cols="12"   md="12" > 
                     <v-select :rules="validationRules"  label="Xidmət edən" v-model="personnelName"  :items="allworkers" item-value="name" item-text="name"> </v-select>    
                 </v-col>  
             </v-row>
        </v-card-text>
      </v-form>
        <v-divider></v-divider> 
        <v-card-actions class='dialog-buttons'>
           <v-btn :disabled="!isFormValid"   @click="dialog = false; addOrderSubmit();"  class="btn-action" outlined>Tətbiq et</v-btn> 
           <v-btn   @click="dialog = false;"  class="btn-cancel" outlined>İmtina et</v-btn>  
        </v-card-actions> 
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  
  import { mapGetters, mapActions } from "vuex";  
      
  export default {  
    data () {
      return { 
      dialog:false,
      selectedRow: null,  
      table:'',
      personnelName:'', 
      isFormValid:false, 
      validationRules: [ v => !!v || 'Sahəni boş buraxmaq olmaz!'],
      idForOrder: 50, 
      }
    },
     computed:{ ...mapGetters(["alltables","allworkers",'allorders'])},
     methods: {  ...mapActions(["fetchTables","fetchWorkers", "addOrder","fetchOrders"]),  
      
       addOrderSubmit() {
        
      this.addOrder({
        id: this.idForOrder,
        table: this.table,
        personnelName:this.personnelName, 
      })
       
      this.idForOrder++
   
    },
      
      },
     
     
 created(){ 
  this.fetchTables();
  this.fetchWorkers();
 }
  }
</script>

<style scoped>

</style>