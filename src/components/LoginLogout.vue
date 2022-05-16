<template>
  <div id="app">
    <div class="header">
      <img class="logo" alt="UOC logo" src="@/assets/uoc-logo.png" />
      <div class="app-name">Address Book</div>
      <button class="button" @click="showLogin">Login</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: 'LoginLogout',
    emits: ['openLogin'],
  
    setup(props, context) {
    let showFormLogin = ref(false);
    /* Aquest mètode s'encarregarà d'emetre un esdeveniment show-form. S’haurà
    d’executar quan es faci clic al botó “Add a new recipe”. */
    const showLogin = () => {
      context.emit('openLogin', showFormLogin.value = true);
      console.log("Emitido de LoginLogout: "+showFormLogin.value);
    }
  
    return { showLogin };
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
</style>