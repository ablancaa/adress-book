<template>
  <div class="contact" :class="address.private && 'private'">
  <div class="contacto-privado" v-show="address.private"><img src="@/assets/candado.png" /></div>
    <button v-show="store.logged" class="delete-contact" @click="deleteAddress" >
      <img src="../assets/delete-button.svg" alt="Delete Contact" />
    </button>
    <h2 class="contact-title">{{ address.name }} {{ address.lastName }}</h2>
    <div class="contact-info">
        <span class="contact-address">{{ address.address }} {{ address.city }} {{ address.state }} - {{ address.zip }} - {{address.country}}</span>
    </div><!-- FIN contact-info -->
    <div class="contact-info">
      <span class="contact-info-value">{{ address.email }} - {{ address.phone }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; 
import { userStore } from '@/store/user'
export default {
   props: {
    address: {
      type: Object,
      required: true,
    },
  },
  emits: ['deleteAddress'],
    setup (props, context) {
      const store = userStore();
      store.logged;
     
      //console.log(user);
      let contacto = ref(props.address);
      
      const deleteAddress = () => {
         context.emit("deleteAddress", contacto.value.id);
      }//FIN deleteRecipe()

      return { deleteAddress, store }

    }
}
</script>

<style scoped>
.contact {
  padding: 20px;
  border: 1px solid #ccc;
  margin: 20px;
  border-radius: 4px;
  position: relative;
  text-align: left;
  box-shadow: 3px 3px 1px;
}
.contact.private {
  background-color: #f5f5f5;
}
.contact-title {
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 10px;
}
.contact-address {
  font-size: 18px;
}
.contact-contact {
  font-size: 16px;
}
.contact-info {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.contact-info-label {
  font-weight: bold;
  margin-right: 5px;
}
.delete-contact {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.delete-contact img {
  width: 20px;
}

.contacto-privado {
position: absolute;
top: 5px;
left:15px;
background: transparent;
border: 0;
padding: 0;
cursor: pointer;
}
.contacto-privado img {
width: 25px;
}
</style>