import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {createPinia} from 'pinia';
import initPrimeVue from './plugins/primeVue';
import './assets/style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
initPrimeVue(app);
app.mount('#app');