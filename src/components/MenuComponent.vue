<template>
  <div class="sidebar">
    <Menu :model="items" class="vertical-menu"
          style="min-width: 120px; height: 100%;border-right: 1px solid lightgrey;}">
      <template #item="{ item, props }">
        <a v-bind="props.action" :class="{ 'active-menu-item': isActive(item.command) }">
          <span :class="item.icon"></span>
          <span>{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Menu from 'primevue/menu';
import {useRouter} from 'vue-router';
import 'primeicons/primeicons.css';

const items = ref([
  {label: 'Home', icon: 'pi pi-fw pi-home', command: () => navigateTo('/')},
  {label: 'Analytics', icon: 'pi pi-chart-line', command: () => navigateTo('/analytics')},
  {label: 'Projects', icon: 'pi pi-folder', command: () => navigateTo('/projects')}
]);

const router = useRouter();

const navigateTo = (route) => {
  router.push(route);
};

const isActive = (route) => {
  return router.currentRoute.value.path === route;
};
</script>

<style>
.sidebar {
  height: 100%;
}

.vertical-menu {
  width: 100%;
}

.active-menu-item {
  background-color: #007bff;
  color: white;
}

.vertical-menu a {
  padding: 10px;
  gap: 4px;
  display: flex;
  align-items: center;
}

.vertical-menu a:hover {
  background-color: #f0f0f0; /* Цвет при наведении */
}
</style>