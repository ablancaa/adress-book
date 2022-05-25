<template>
  <div class="header">
    <img class="logo" alt="UOC logo" src="@/assets/uoc-logo.png" />
    <div class="app-name">Address Book</div>
      <div v-show="store.email" class="user"><p>{{ store.email }}</p></div>
        <button v-show="!store.email" class="login-button" @click="showLogin">Login</button>
        <button v-show="store.email" class="logout-button" @click="logout">Logout</button>
  </div>
</template>
<script>
import { userStore } from '@/store/user'
import { ref } from "vue";
export default {
  name: 'LoginLogout',
  emits: ['openFormLogin', 'isLogged' ],
  
  setup(props, context) {
    const store = userStore();
    let showFormLogin = ref(false);  

    /* Aquest mètode s'encarregarà d'emetre un esdeveniment show-form. S’haurà
    d’executar quan es faci clic al botó “Login”. */
    const showLogin = () => {
      context.emit('openFormLogin', showFormLogin.value = true);
    }

    const logout = () => {
      context.emit('isLogged', false)
    }

    return { showLogin, logout, store };

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
  margin-left: -400px;
  font-weight: bold;
  font-size: 20px;
}
.user{
  float: right;
  margin-right: -570px;
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
p {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 64%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
</style>