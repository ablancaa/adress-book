<template>
  <div class="contact">
    <!-- <div class="estrella-contact" v-show="contact.private"><img src="@/assets/estrella.png" /></div> -->
    <button class="delete-contact" @click="deleteAddress">
      <img src="../assets/delete-button.svg" alt="Delete Contact" />
    </button>
    <h2 class="contact-title">{{ address.name }}</h2>
    <div class="contact-info">
      <div class="contact-info-item">
        <span class="contact-info-label">Last Name:</span>
        <span class="contact-info-value">{{ address.lastName }}</span>
      </div>
      <div class="contact-info-item">
        <span class="contact-info-label">City:</span>
        <span class="contact-info-value">{{ address.city }}</span>
      </div>
      <div class="contact-info-item">
        <span class="contact-info-label">State:</span>
        <span class="contact-info-value">{{ address.state }}</span>
      </div>
    </div><!-- FIN contact-info -->
    <div class="contact-info-item">
      <span class="contact-info-label">Email:</span>
      <span class="contact-info-value">{{ address.email }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; 
export default {
   props: {
    address: {
      type: Object,
      required: true,
    },
  },
  emits: ['deleteAddress'],
    setup (props, context) {
      let contacto = ref(props.address);
      const deleteAddress = () => {
         console.log("FUNCIÓN: deleteAddress() desde CardContact emite => "+contacto.value.id);
         context.emit("deleteAddress", contacto.value.id);
      }//FIN deleteRecipe()
      return { deleteAddress }
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
</style>