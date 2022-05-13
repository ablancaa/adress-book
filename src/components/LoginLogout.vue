<template>
  <div id="app">
    <div class="header">
      <img class="logo" alt="UOC logo" src="@/assets/uoc-logo.png" />
      <div class="app-name">Address Book</div>
      <button>Login</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LoginLogout',
    setup () {
        

        return {}
    }
}
</script>

<style  scoped>
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
</style>