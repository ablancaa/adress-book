<template>
  <div class="search">
    <div>
    <form @submit.prevent="busqueda"> 
       <input type="text" id="consulta" v-model="consulta" @keyup="search" placeholder="Search contact" />
       <button v-if="consulta != ''" @click="clearSearch">Clear Search</button>
    </form>
    </div>
    <button @click="showForm">Add contact</button>
  </div>
</template>

<script>
export default {
    name: 'SearchBar',
    setup () {
        

        return {}
    }
}
</script>

<style scoped>
body {
  margin: 0;
}
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
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.login-form-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.login-form-header button img {
  width: 20px;
}
.login-form-item {
  margin-bottom: 20px;
}
.login-form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.login-form-item input,
.login-form-item select,
.login-form-item textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}
.login-form-item button {
  background: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-bottom: 20px;
}
.contact {
  padding: 20px;
  border: 1px solid #ccc;
  margin: 20px;
  border-radius: 4px;
  position: relative;
  text-align: left;
}
.contact.private {
  background-color: #f5f5f5;
}
.contact-title {
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 10px;
}
.contact-address {
  font-size: 18px;
}
.contact-contact {
  font-size: 16px;
}
.contact-info {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.contact-info-label {
  font-weight: bold;
  margin-right: 5px;
}
.delete-contact {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.delete-contact img {
  width: 20px;
}
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.contact-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.contact-form-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.contact-form-header button img {
  width: 20px;
}
.contact-form-item {
  margin-bottom: 20px;
}
.contact-form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.contact-form-item input,
.contact-form-item select,
.contact-form-item textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}
.contact-form-item button {
  background: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-bottom: 20px;
}
.contact-list {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
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