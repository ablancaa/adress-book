<template>
<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" type="image/png" href="/public/favicon.png"/>
</head>
<LoginLogout @openFormLogin="toggleFormLogin" @usuarioLogin="login" @isLogged="logout" @noLogged="logout"/>
<SearchBar @openContactForm="toggleFormContact"/>
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
      usuario: [],
      searchTerm: '',
      //isLogged: false,
    }
  },
 
  async created() { 
    const store = userStore();
      //Carga el listado de contactos del servidor
      try {
        axios.defaults.headers.common['authorization'] = this.usuario.tokenId;
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
        //console.log("el addressList")
        //console.log(this.addressList);
      } catch (error){
        console.log("ERROR "+error);
      }
      //document.body.onload = localStorage.getItem('isLogged');
  },
  computed: {
  /* Funció que:
      ○ Retorna el llistat de receptes en el cas que searchTerm estigui buit.
      ○ Retorna la col·lecció de receptes filtrada pels termes de cerca. Heu de buscar si
        searchTerms forma part del nom de la recepta o dels ingredients a cada recepta. */
     ListFiltered() {
      let listaFiltrada = [];
      
      if(this.searchTerm != ''){
        listaFiltrada = this.addressList.filter(address => 
          address.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          address.email.includes(this.searchTerm.toLowerCase()),
        )
      } else {
        listaFiltrada = this.addressList;
      }
      return listaFiltrada;
    },
    
  },     
  methods: {
    async login (userLogin){
      const store = userStore();
      try{
        await axios.post("http://localhost:3000/login", userLogin.value)
        .then(response =>{
          axios.defaults.headers.common['authorization'] = response.data.data;
          this.usuario = response.data.data;
          //Acceso a pinia para guardar los datos
          store.name = response.data.data.name;
          store.lastName = response.data.data.lastName;
          store.email = response.data.data.email;
          store.token = response.data.data.tokenId;
          store.logged = true;
         
          this.showModalLogin = false;
          this.isLogged = true;
          this.$emit('isLogged', true);
        })
      } catch (error) {
          console.log(error);
          localStorage.setItem('isLogged', false);
          this.$emit('isLogged', this.isLogged);
          location.reload();
      }
      //Carga el listado de contactos del servidor con autorizacion
      try {
        axios.defaults.headers.common['authorization'] = this.usuario.tokenId;
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
        store.listaPrivada = response.data.data;
        console.log("el addressList")
        console.log(this.addressList);
        this.$emit('isLogged', true);
        //location.reload();
      } catch (error){
        console.log("ERROR "+error);
      } 
      console.log("LOGADO: "+this.isLogged)
    },

    async logout(estado) {
      console.log("Logout");
      localStorage.clear(); 
      this.isLogged = estado;
      console.log(estado);
      //Carga el listado de contactos del servidor
      try {
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
      } catch (error){
        console.log("ERROR "+error);
      }
        location.reload();
    },
     /*Modifica l'estat del paràmetre showModal al seu invers.*/
    toggleFormLogin(info){
      if (info == true){
        this.showModalLogin = true;
      } else {
        this.showModalLogin = false;
      }
    },

    toggleFormContact(info){
      if (info == true) {
        this.showModalContact = true;
      } else {
        this.showModalContact = false;
      }
    },
    async createContact(address){
      console.log("Entra en create contact");
      console.log(address);
      try {
        axios.defaults.headers.common['authorization'] = this.usuario.tokenId;
        let response = await axios.post("http://localhost:3000/address", address );
        console.log(response);
        console.log("Contacto añadido: "+address);
      } catch (error){
        console.log(error);
      }
      //Carga el listado de contactos del servidor con autorizacion
      try {
        axios.defaults.headers.common['authorization'] = this.usuario.tokenId;
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
        console.log("el addressList")
        console.log(this.addressList);
      } catch (error){
        console.log("ERROR "+error);
      }
    },

    async deleteAddress(id){
      try {
        axios.defaults.headers.common['authorization'] = this.usuario.tokenId;
        let response = await axios.delete("http://localhost:3000/address", { data: { id } });
        //console.log(response);
        console.log(this.usuario.tokenId)
        console.log(response);
        console.log("ID a borrar desde App: "+id);
      } catch (error){
        console.log(error);
      }
      //Carga el listado de contactos del servidor
      try {
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
        console.log("el addressList")
        console.log(this.addressList);
      } catch (error){
        console.log("ERROR "+error);
      }
      
    },

    setSearchTerm(info){
      this.searchTerm = info;
      if (this.searchTerm == ''){
        this.ListFiltered;
      }
      console.log("setSearchInfo() en App: "+this.searchTerm);     
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
