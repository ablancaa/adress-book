<template>
  <div class="search">
    <div>
    <form @submit.prevent="busqueda"> 
       <input  type="text" id="consulta" v-model="consulta" @keyup="search" placeholder="Search contact" />
       <button v-if="consulta != ''" @click="clearSearch">Clear Search</button>
    </form>
    </div>
      <button v-show="store.logged" @click="showForm" class="lineUp">Add contact</button>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { userStore } from '@/store/user'
export default {
    name: 'SearchBar',
    emits: ['openContactForm', 'clearSearch', 'newVal'],

  setup(props, context){
    const store = userStore();
    let showContactForm = ref(false);
    let consulta = ref('');
    /* Aquest mètode s'encarregarà de buidar l'element input del camp de cerca.
     S’haurà d’executar quan es faci clic al botó “Clear Search”. */
    const clearSearch = () => {
      consulta.value = document.getElementById("consulta").value="";
    }
    /* Aquest mètode s'encarregarà d'emetre un esdeveniment show-form. S’haurà
    d’executar quan es faci clic al botó “Add a new recipe”. */
    const showForm = () => {
      context.emit('openContactForm', showContactForm.value = true);
    }
    /*Aquest mètode s'executarà cada vegada que es modifiqui l'element
     input del camp de cerca (cada vegada que es teclegi una lletra). Emetrà un esdeveniment
     'search' amb el contingut del camp de cerca */
    const search = ref(consulta);   
    watch((search), (currentValue) => {
      console.log("Valor actual en la SearchBar: "+currentValue);
      context.emit("newVal", search);
    });

    return { consulta, store, clearSearch, showForm, watch };
  },//FIN Setup()
}
</script>

<style scoped>
body {
  margin: 0;
}
.search {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 25px;
  justify-content: space-between;
}
.search input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin: 0 auto;
  max-width: 500px;
  width: 500px;
}
.search button {
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  background: #4caf50;
  color: #fff;
}

.margen{
  margin-right: -400px;
}
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