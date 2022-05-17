<template>
  <div id="contact-list" class="contact-list">
    <div v-for="address in addressList" :key="address.id">
      <cardContact :address="address" @deleteContact="deleteContact"/>
    </div>
  </div>
</template>

<script>
import cardContact from "./CardContact.vue";
import { ref } from 'vue';
export default {  
    name: "ContactList",
    props: {
        addressList: {
        type: Array,
        required: true,
    }
  },
  components: { cardContact },
  emits:['deleteContact'],
  
  setup(props, context){
   const deleteContact = (id) => {
         context.emit('deleteContact', id);
         console.log("FUNCIÓN deleteContact() desde ContactList emite => "+id);
       }

    return { deleteContact }
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