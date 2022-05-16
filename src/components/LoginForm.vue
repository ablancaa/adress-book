<template>
    <div class="modal-container">
        <div class="login-form">
            <form>
                <div class="login-form-header">
                    <button @click="closeForm">
                    <img src="../assets/close-button.svg" alt="Close modal" />
                    </button>
                </div>
                <h1 class="">Login</h1>
                <div class="login-form-item">
                    <label>Usuario</label>
                    <input type="text" v-model="userName" placeholder=""/>
                </div>
                <div class="login-form-item">
                    <label>Passwrod</label>
                    <input type="text" v-model="userPassword" placeholder=""/>
                </div>
                <div class="login-form-item">
                    <button @click="openForm">Login</button>
                </div>
            </form>
       </div>  <!-- fin login-form  -->
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    emits:['closeForm', 'openForm'],
    setup (props, context) {
         let showModal = ref(false);
      /* Aquest mètode s'ha d'executar quan es faci clic al botó que conté el svg amb
         el símbol X. S'encarregarà de:
          ○ Emetre un esdeveniment close-modal  */
        const closeForm = () => {
          context.emit('closeForm', showModal.value = false);
        }//FIN closeForm()
        
        const openForm = () => {
          context.emit('openForm', showModal.value = true);
        }//FIN closeForm()

      return { closeForm, openForm }
     
    }
}
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.login-form-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.login-form-header button img {
  width: 20px;
}
.login-form-item {
  margin-bottom: 20px;
}
.login-form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.login-form-item input,
.login-form-item select,
.login-form-item textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}
.login-form-item button {
  background: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-bottom: 20px;
}

</style>