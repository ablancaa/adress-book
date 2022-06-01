import { defineStore } from 'pinia'
import axios from 'axios'
export const userStore = defineStore('user', {
    id: 'user',
    state: () => ({
        logged: false,
        name: '',
        lastName: '',
        email: '',
        token: '',
        listaPrivada: [],
        listaPublica: []
    }),
    actions: {
        async getListPublic() { 
           try {
               let response = await axios.get("http://localhost:3000/addresses");
               console.log(this.token);
               console.log("Lista desde store")
               console.log(this.listaPublica);
               return this.listaPublica = response.data.data;
           } catch (error){
               console.log("ERROR "+error);
            }
       }
    },
    getters: {
        getName: (state) => { 
            return state.name;
        },
        getlastName: (state) => { 
            return state.lastName;
        },
        getEmail: (state) => { 
            return state.email;
        },
        getToken: (state) => { 
            return state.token;
        },
        getLogged: (state) => { 
            return state.logged;
        },
    },
})
