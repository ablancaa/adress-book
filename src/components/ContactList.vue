<template>
  <div id="contact-list" class="contact-list">
    <div v-for="address in addressList" :key="address.id">
      <cardContact :address="address" @deleteAddress="deleteAddress"/>
    </div>
  </div>
</template>

<script>
import cardContact from "./CardContactConEstilo.vue";
//import cardContact from "./CardContact.vue";

import { } from 'vue';
export default {  
    name: "ContactList",
    props: {
        addressList: {
        type: Array,
        required: true,
    }
  },
  components: { cardContact },
  emits:['deleteAddress'],
  
  setup(props, context){
   const deleteAddress = (id) => {
         context.emit('deleteAddress', id);
         console.log("FUNCIÓN deleteAddress() desde ContactList emite => "+id);
       }

    return { deleteAddress }
  }
}
</script>

<style scoped>
.contact-list {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>