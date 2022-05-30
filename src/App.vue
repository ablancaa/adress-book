<template>
<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" type="image/png" href="/public/img/favicon-16x16.png"/>
</head>
<LoginLogout @openFormLogin="toggleFormLogin" @usuarioLogin="login" @isLogged="logout"/>
<SearchBar @openContactForm="toggleFormContact" @newVal="setSearchTerm"/>
<LoginForm v-if="showModalLogin" @closeForm="toggleFormLogin" @usuarioLogin="login"/>
<FormContact v-if="showModalContact" @closeFormContact="toggleFormContact" @nuevoContacto="createContact"/>
<ContactList :addressList="ListFiltered" @deleteAddress="deleteAddress"/>
  <!-- <router-view/> -->
</template>
<script>
//import axios from 'vue';
import axios from 'axios'
import SearchBar from './components/SearchBar.vue';
import FormContact from './components/FormContact.vue';
import LoginForm from './components/LoginForm.vue';
import LoginLogout from './components/LoginLogout.vue';
import ContactList from './components/ContactList.vue';
import { userStore } from '@/store/user'
import Swal from 'sweetalert2';
export default {
  components: { 
    SearchBar,
    LoginLogout,
    LoginForm,
    FormContact,
    ContactList: ContactList
  },
  data(){
    return{
      addressList: [],
      showModalLogin: false,
      showModalContact: false,
      searchTerm: '',
    }
  },
 
  async created() { 
    const store = userStore();
      //Carga el listado de contactos del servidor
      try {
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
      } catch (error){
        console.log("ERROR "+error);
        console.log(store.token);
      }
  },
  computed: {
  /* Funció que:
      ○ Retorna el llistat de contactes en el cas que searchTerm estigui buit.
      ○ Retorna la col·lecció de contactes filtrada pels termes de cerca. */
      ListFiltered() {
        if (!this.searchTerm) {
          return this.addressList;
        } else if (this.searchTerm) {
          return this.addressList.filter((address) => {
            return (
              address.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              address.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              address.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              address.phone.toString().includes(this.searchTerm.toLowerCase())
            );
          });
        }
        return this.addressList;
      },
  },//FIN computed
  methods: {
    async login (userLogin){
      const store = userStore();
      try{
        await axios.post("http://localhost:3000/login", userLogin.value)
        .then(response =>{
          axios.defaults.headers.common['authorization'] = response.data.data;          
          //Acceso a pinia para guardar los datos del usuario
          store.name = response.data.data.name;
          store.lastName = response.data.data.lastName;
          store.email = response.data.data.email;
          store.token = response.data.data.tokenId;
          store.logged = true;
          this.showModalLogin = false;
        })
      } catch (error) {
          console.log(error);
      }
      //Carga el listado de contactos del servidor con autorizacion
      try {
        axios.defaults.headers.common['authorization'] = store.token;
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
      } catch (error){
        console.log("ERROR "+error);
      } 
    },

    async logout(logout) {
      const store = userStore();
      store.logged = logout;
      location.reload();
    },

    /* Muestra ventana modal Login */
    toggleFormLogin(info){
      if (info == true){
        this.showModalLogin = true;
      } else {
        this.showModalLogin = false;
      }
    },
    /* Muestra ventana modal ContactForm */
    toggleFormContact(info){
      if (info == true) {
        this.showModalContact = true;
      } else {
        this.showModalContact = false;
      }
    },
    async createContact(address){
      const store = userStore();
      //Añade el contacto a la lista del servidor
      try {
        axios.defaults.headers.common['authorization'] = store.token;
        let response = await axios.post("http://localhost:3000/address", address );
        console.log(response);
        console.log("Contacto añadido: "+address);
      } catch (error){
        console.log(error);
      }
      //Carga el listado de contactos del servidor con autorizacion
      try {
        axios.defaults.headers.common['authorization'] = store.token;
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
      } catch (error){
        console.log("ERROR "+error);
      }
    },

    async deleteAddress (id) {
      const store = userStore();
      try {
        axios.defaults.headers.common['authorization'] = store.token;
        let response = await axios.delete("http://localhost:3000/address", { data: { id } });
        console.log(response);
      } catch (error){
        console.log(error);
      }
      
      //Carga el listado de contactos del servidor
      try {
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
      } catch (error){
        console.log("ERROR "+error);
      }
      this.mensajeDelete();
    },

    setSearchTerm (info) {
      this.searchTerm = info;
    },
    
    mensajeDelete () {
    //Mensaje de borrado
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Your contact has been deleted',
        showConfirmButton: false,
        timer: 2500
      })
    },
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
.header {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}
.header .left {
  display: flex;
  align-items: center;
}
.header .right {
  display: flex;
  align-items: center;
}
.header .logo {
  max-height: 50px;
}
.header .app-name {
  margin-left: 25px;
  font-weight: bold;
  font-size: 20px;
}
.header .user {
  display: flex;
}
.header .login-button,
.header .logout-button {
  background: #2c3e50;
  color: #fff;
  border: 0;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 15px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
