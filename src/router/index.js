import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/MainPage.vue';
import Analytics from '../pages/AnalyticsPage.vue';
import Projects from '../pages/ProjectsPage.vue';

const routes = [
    { path: '/', component: Main },
    { path: '/analytics', component: Analytics },
    { path: '/projects', component: Projects },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
