<template> 
      <div class="mainpage">
       <div class="left"> </div>
        <div class="right"> 
              <div> 
                   <p>Hörmətli həmkarlar <span>FoodCircles</span>-ə xoş gəlmisiniz! </p>
                    Ümüd edirik ki sizlər də bizimlə işləməkdən bizim sizinlə olduğumuz qədər məmnunsunuz. Sizlərə rəhbərlik adından məhsuldar və əyləncəli iş günü arzulayiriq.
             </div>
             <div>
                   <p>Bu gün: <span>{{today}}</span></p>
                   <p>Sifariş sayı: <span>{{count}}</span></p>
                   <p>Cəmi məbləğ: <span>{{profit + " AZN"}}</span></p> 
             </div>
             <div>Təşəkkür edirik!</div> 
       </div>
      </div> 
</template>

<script> 
 import { mapGetters, mapActions } from "vuex";  
 export default {
       data () {
       return {  
            today:'',
            count:null,
            profit:null,
            orderDetail:{}
        }},
     computed:{ ...mapGetters(["allorders"]), },
     methods: {  ...mapActions(["fetchOrders"])},

     created(){
     let time=new Date();
     this.today= time.getDate()+'-'+(time.getMonth()+1)+'-'+time.getFullYear();

      this.fetchOrders()
        .then(()=>{
          //   if(this.allorders.filter(item=>{return item.endDate!==undefined})){
                this.profit=this.allorders.filter(item=>{return item.endDate === this.today}).map(item =>parseFloat(item.price)).reduce((prev, next) => prev + next);
              this.count=Object.keys(this.allorders.filter(item=>{return item.endDate === this.today}).map(val=>(val.orders))).length;  
         
      //    }
        })
     }
}                        
 

</script>

<style>

</style>