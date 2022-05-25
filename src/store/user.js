import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
    id: 'user',
    state: () => ({
        logged: false,
        name: '',
        lastName: '',
        email: '',
        token: '',
        listaPrivada: [],
    }),
    actions: {
        usuario: (state) => state.user
    },
    getters: {
        getName: (state) => { 
            return state.user = state;
        }
     
    },
})
