<template>
  <div class="header">
    <img class="logo" alt="UOC logo" src="@/assets/uoc-logo.png" />
    <div class="app-name">Address Book</div>
    <!-- <div class="line"> -->
    <!-- <h5 class='lineUp'>¡Hola! - {{ store.name }} {{ store.lastName }}</h5> -->
  <!-- </div> -->
      <div v-show="store.email" class="user lineUp"><p>¡Hola! - {{ store.name }} {{ store.lastName }}</p></div>
      <!-- <div v-show="store.email" class="user lineUp"><p>¡Hola! - {{ store.email }} </p></div> -->
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
      context.emit('isLogged', store.logged = false)
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

  /*OTRO EFECTO*/
 /* crops animations that exceeds one line area */
.line {
  width: 100%;
  height: 4rem;
  overflow: hidden;
  /*border: 1px solid black;*/
  padding: 0;
  margin-bottom: 16px;
}

/* flipping class and key frames*/
.flipX {
  animation: 1s anim-flipX ease;
}
@keyframes anim-flipX {
  0% {
    opacity: 0;
    transform: rotateX(90def);
  }
  50% {
    opacity: 1;
    transform: rotateX(720deg);
  }
  100% {
    /* animate nothing to pause animation at the end */
    opacity: 1;
    transform: rotateX(720deg);
  }
}

/* lineup class and keyframes */
.lineUp {
  animation: 2s anim-lineUp ease-out;
}
@keyframes anim-lineUp {
  0% {
    opacity: 0;
    transform: translateY(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
/* flipY class and keyframes*/
.flipY {
  animation-name: spin, depth;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-duration: 6s;
}
@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-360deg);
  }
}
@keyframes depth {
  0% {
    text-shadow: 0 0 black;
  }
  25% {
    text-shadow: 1px 0 black, 2px 0 black, 3px 0 black, 4px 0 black, 5px 0 black;
  }
  50% {
    text-shadow: 0 0 black;
  }
  75% {
    text-shadow: -1px 0 black, -2px 0 black, -3px 0 black, -4px 0 black,
      -5px 0 black;
  }
  100% {
    text-shadow: 0 0 black;
  }
}

/* subtle zoom to attention and then back */
.pop-outin {
  animation: 2s anim-popoutin ease infinite;
}

@keyframes anim-popoutin {
  0% {
    color: black;
    transform: scale(0);
    opacity: 0;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  25% {
    color: red;
    transform: scale(2);
    opacity: 1;
    text-shadow: 3px 10px 5px rgba(0, 0, 0, 0.5);
  }
  50% {
    color: black;
    transform: scale(1);
    opacity: 1;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    /* animate nothing to add pause at the end of animation */
    transform: scale(1);
    opacity: 1;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
  }
}

.fromtop {
  animation: 2s anim-fromtop linear infinite;
}
@keyframes anim-fromtop {
  0% { opacity: 0; transform: translateY(-100%);}
  25% { opacity: 1; transform: translateY(0%);}
  50% {
  }
  100% {
  }
}

</style>