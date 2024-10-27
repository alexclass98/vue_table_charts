<template>
  <Navbar/>
  <div className="main-container">
    <MenuComponent/>
    <router-view className="router-view"/>
  </div>
  <Footer class="footer"/>
</template>

<script setup>
import {useRouter} from 'vue-router';
import Navbar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import MenuComponent from './components/MenuComponent.vue';

const router = useRouter();
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.main-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.router-view {
  flex: 1;
  overflow: auto;
}

.footer {
  padding-left: 120px;
}
</style>