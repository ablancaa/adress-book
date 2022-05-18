<template>
  <div class="search">
    <div>
    <form @submit.prevent="busqueda"> 
       <input  type="text" id="consulta" v-model="consulta" @keyup="search" placeholder="Search contact" />
       <button v-if="consulta != ''" @click="clearSearch">Clear Search</button>
    </form>
    </div>
    <button v-show="usuLogado !=''" @click="showForm">Add contact</button>
    <p>{{usuLogado}}</p>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
    name: 'SearchBar',
     emits: ['openContactForm', 'clearSearch', 'newVal'],
  
  setup(props, context){
    //let showModal = ref(false);
    let showContactForm = ref(false);
    let consulta = ref('');
    let usuLogado = localStorage.tokenId;
     /* Aquest mètode s'encarregarà de buidar l'element input del camp de cerca.
     S’haurà d’executar quan es faci clic al botó “Clear Search”. */
    const clearSearch = () => {
      consulta.value = document.getElementById("consulta").value="";
      console.log("Función clearSearch(){} Campo reseteado");
    }
      /* Aquest mètode s'encarregarà d'emetre un esdeveniment show-form. S’haurà
    d’executar quan es faci clic al botó “Add a new recipe”. */
    const showForm = () => {
      context.emit('openContactForm', showContactForm.value = true);
      console.log("Emitido de SearchBar: "+showContactForm.value);
    }
     /*Aquest mètode s'executarà cada vegada que es modifiqui l'element
     input del camp de cerca (cada vegada que es teclegi una lletra). Emetrà un esdeveniment
     'search' amb el contingut del camp de cerca */
    const search = ref(consulta);   
    watch(search, (currentValue) => {
      console.log("Valor actual en la SearchBar: "+currentValue);
      context.emit("newVal", search);
    });
    /*const search = ref(consulta);   
      watch(search, (currentValue, oldValue) => {
        console.log("Valor actual en la SearchBar: "+currentValue);
        console.log("Valor pasado en la SearchBar: "+oldValue);
        context.emit("newVal", search);
      });*/
  
    return { consulta, showForm, clearSearch, watch, usuLogado };
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

</style>