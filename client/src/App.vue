<template>
  <div id="app">
    <navigation></navigation>
    <div class="content">
      <router-view :title="title" :beers="beers"></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import LoginStore from './stores/LoginStore.js'
const API_URL = 'http://localhost:8080/api'


export
default {
    data() {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            beers: [],
            loggedIn: LoginStore.state.loggedIn,
            title: 'Before request'
        }
    },
    components: {
        Navigation
    },
    options: {
        replace: false
    },
    ready () {

    }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
.content {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
