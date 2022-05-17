<template>
    <div class="modal-container">
        <div class="contact-form">
            <div class="contact-form-header">
                <h2>Add a new Contact</h2>
                <div id="errores">
                    <p>{{  }}</p>
                </div>
                <div id="add">
                    <p>{{  }}</p>
                </div>
                <button @click="closeFormContact">
                    <img src="../assets/close-button.svg" alt="Close modal" />
                </button>
            </div><!-- contact-form-header -->
            <form id="formulario" @submit.prevent="createContact">
                <div class="contact-form-item">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="contact.name" />
                </div>
                <div class="contact-form-item">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" v-model="contact.lastName" />
                </div>
                <div class="contact-form-item">
                    <label for="address">Address</label>
                    <input type="text" id="address" v-model="contact.address" />
                </div>
                <div class="contact-form-item">
                    <label for="city">City</label>
                    <input type="text" id="city" v-model="contact.city" />
                </div>    
                <div class="contact-form-item">
                    <label for="state">State</label>
                    <input type="text" id="state" v-model="contact.state" />
                </div>
                <div class="contact-form-item">
                    <label for="zip">Zip</label>
                    <input type="text" id="zip" v-model="contact.zip" />
                </div>
                <div class="contact-form-item">
                    <label for="country">Country</label>
                    <input type="text" id="country" v-model="contact.country" />
                </div>
                <div class="contact-form-item">
                    <label for="phone">phone</label>
                    <input type="number" id="phone" v-model="contact.phone" />
                </div>
                <div class="contact-form-item">
                    <label for="email">Email</label>
                    <input type="text" id="email" v-model="contact.email" />
                </div>
                <div class="contact-form-item">
                    <label for="checkbox">Private</label><input type="checkbox" value="true" v-model="contact.private"/>
                    <!-- <label>{{ featured }}</label> -->
                </div>                   
                <div class="contact-form-item">
                    <button type="submit" @submit.prevent="">Add Conctact</button>
                </div>
            </form>
        </div><!-- FIN contact-form-->
    </div><!-- FIN modal-container-->
</template>

<script>
import { ref } from 'vue';
import { uuid } from 'vue3-uuid';
export default {
    emits:['openFormContact', 'closeFormContact'],
    setup (props, context) {
        //Variable que emite para mostrar formulario
        let showForm = ref(false);
        
        //Mensaje de error
        let mensajeError = ref('The fields Name, Last name and Email are required <br/>');
        
        //Campos del formulario
        let contact = ref({
            id: uuid.v1(),
            name: '',
            lastName: '',
            address: '',
            city: '', 
            state: '',
            zip: '',
            country: '',
            phone: '',
            email: '',
            private: ''
        });

        /* Emite para que se muestre el formulario de introducción de usuario */
        const showFormContact = () => {
            context.emit('openFormContact', showForm.value = true);
            console.log("Emitido de LoginLogout: "+showForm.value);
        }

        /* Emite para que se cierre el formulario de introducción de usuario */
        const closeFormContact = () => {
            context.emit('closeFormContact', showForm.value = false);
        }//FIN closeForm()

        const createContact = () => {
          var error = document.getElementById("errores");
          var add = document.getElementById("add");
          //Valida que los campos no esten vacíos
          if(contact.value.id == '' || contact.value.name == '' || contact.value.lastName == '' || contact.value.email == '') {
          //Chivatos de campos vacios
            console.log(contact.value.id);
            console.log("Id vacio!!");
            console.log("Nombre Vacio!!");
            console.log("Apellido Vacio!!");
            console.log("Email Vacio!!");
          //Pinta en pantalla el error
           // error.innerHTML = 'The fields Title, Ingredients and Directions are required <br/>';
            error.innerHTML = mensajeError.value;
            error.innerHTML += '<br/>';
            add.innerHTML = '';
          } else {
          //Indico si tiene el featured activado
            if(contact.value.private==''){
              contact.value.private = false;
            } else {
              contact.value.private = true;
            }
            
          //Creo el objeto contacto para pasar a App 
              let contacto = {
                  id: contact.value.id, 
                  name: contact.value.name, 
                  lastName: contact.value.lastName, 
                  address: contact.value.address,
                  city: contact.value.city,
                  state: contact.value.state,
                  zip: contact.value.zip,
                  country: contact.value.country,
                  phone: contact.value.phone,
                  email: contact.value.email,
                  private: contact.value.private,
              };
          //Emite el contacto nuevo a App
             context.emit('nuevoContacto', contacto);
          //Muestra datos de receta por consola
              console.log("Emitido nuevo contacto");
              console.log(contacto);
          //Pongo el Div de error en blanco
              error.innerHTML = '';
          //Indico en el Div add que se añade el contacto nuevo
              add.innerHTML = 'Add Contact <br/>';
              add.innerHTML += '<br/>';
          //Borro los campos del formulario    
              borrarCampos();
          }//Fin if/else
    
        }//FIN createContact()

        const borrarCampos = () => {
          //Reinicio los campos
            let contact = ref({
                id: uuid.v1(),
                name: contact.value.name='',
                lastName: contact.value.lastName='',
                address: contact.value.address='',
                city: contact.value.city='',
                state: contact.value.state='',
                zip: contact.value.zip='',
                country: contact.value.country='',
                phone: contact.value.phone='',
                email: contact.value.email='',
                private: contact.value.private='',
            });
        }

        return { showFormContact, closeFormContact, createContact, borrarCampos, contact }
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
.contact-form {
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
.contact-form-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.contact-form-header button img {
  width: 20px;
}
.contact-form-item {
  margin-bottom: 20px;
}
.contact-form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.contact-form-item input,
.contact-form-item select,
.contact-form-item textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}
.contact-form-item button {
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