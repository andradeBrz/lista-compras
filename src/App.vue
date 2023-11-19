<template>
  <div id="app">
    <NavBar @toggleSideBar="toggleSideBar"/>
    <SidebarMenu :visible="sidebarOpen"/>
    <div class="main-content" :class="{'menu-open': sidebarOpen}">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './components/SidebarMenu.vue';
import NavBar from './components/NavBar.vue';
export default {
    components: {SidebarMenu, NavBar},
    data(){
      return{
        sidebarOpen: true
      }
    },
    methods: {
      toggleSideBar: function(){
          this.sidebarOpen = !this.sidebarOpen;
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-content{
  padding: 20px;
}

.main-content:not(.menu-open){
  animation: slide-out 0.6s forwards;
}

.menu-open{
  animation: slide-in 0.6s forwards;
}

@keyframes slide-in {
    100% { 
      width: calc(100vw - 300px);
      margin-left: 300px;
    }
}

@-webkit-keyframes slide-in {
    100% { -webkit-transform: translateX(0%); }
}
    
@keyframes slide-out {
    0% { 
      width: calc(100vw - 300px);
      margin-left: 300px;
    }
    100% {
      width: 100vw;
      margin-left: 0px;
    }
}

@-webkit-keyframes slide-out {
    0% { -webkit-transform: translateX(0%); }
    100% { -webkit-transform: translateX(-100%); }
}

</style>
