<template>
  <div class="sidebar">
    <Menu :model="items" class="vertical-menu"
          style="min-width: 120px; height: 100%; border-right: 1px solid lightgrey;">
      <template #item="{ item, props }">
        <a
            v-bind="props.action"
            :class="{ 'active-menu-item': isActive(item.command) }"
            :style="{ backgroundColor: isActive(item.command) ? '#f0f0f0' : 'transparent' }"
        >
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
import {useRouter, useRoute} from 'vue-router';
import 'primeicons/primeicons.css';

const items = ref([
  {label: 'Home', icon: 'pi pi-fw pi-home', command: () => navigateTo('/')},
  {label: 'Analytics', icon: 'pi pi-chart-line', command: () => navigateTo('/analytics')},
  {label: 'Projects', icon: 'pi pi-folder', command: () => navigateTo('/projects')}
]);

const router = useRouter();
const route = useRoute();

const navigateTo = (routePath) => {
  router.push(routePath);
};

const isActive = (command) => {
  const path = command.toString().match(/'(.*)'/)[1];
  return route.path === path;
};
</script>

<style>
.sidebar {
  height: 100%;
}

.vertical-menu {
  width: 100%;
}

.vertical-menu a {
  padding: 10px 20px;
  gap: 4px;
  display: flex;
  align-items: center;
}

.vertical-menu a:hover {
  background-color: #f0f0f0;
}

.active-menu-item {
  background-color: #f0f0f0;
  color: white;
}
</style>