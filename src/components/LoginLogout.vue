<template>
  <div id="app">
    <div class="header">
      <img class="logo" alt="UOC logo" src="@/assets/uoc-logo.png" />
      <div class="app-name">Address Book</div>
      <header>{{error}}</header>
      <span class="user">{{usuario.email}}</span>
      <button v-show="props.usuario==''" class="button" @click="showLogin">Login</button>
      <button v-show="props.usuario !=''" class="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { ref, axios } from "vue";
export default {
    name: 'LoginLogout',

    props: {
      usuario: Object,
    },
    emits: ['openFormLogin'],
  
    setup(props, context) {
     
    //let user = localStorage.getItem("email");
    let showFormLogin = ref(false);
    /* Aquest mètode s'encarregarà d'emetre un esdeveniment show-form. S’haurà
    d’executar quan es faci clic al botó “Add a new recipe”. */
    const showLogin = () => {
      context.emit('openFormLogin', showFormLogin.value = true);
      console.log("Emitido de LoginLogout: "+showFormLogin.value);
    }

    const logout = async () => {
      console.log("Logout");
      localStorage.clear();
      location.reload()
      //Carga el listado de contactos del servidor
      try {
        let response = await axios.get("http://localhost:3000/addresses");
        this.addressList = response.data.data;
        console.log("el addressList")
        console.log(this.addressList);
      } catch (error){
        console.log("ERROR "+error);
      }
    }
  
    return { showLogin, logout, props };

  }//FIN Setup()
}
</script>

<style  scoped>
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
.user{
  float: right;
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
button {
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  background: #4caf50;
  color: #fff;
}
</style>