<template>
  <div class="card flex justify-center">
    <Breadcrumb :home="home" :model="breadcrumbItems" class="breadcrumb-container">
      <template #item="{ item, props }">
        <router-link v-if="item.route" :to="item.route" custom>
          <a :href="item.route" v-bind="props.action" @click.prevent="navigateTo(item.route)"
             :class="{ 'text-underline': isActive(item) }" class="breadcrumb-link">
            <span :class="item.icon" class="icon"></span>
            <span class="label">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action" class="breadcrumb-link">
          <span :class="{ 'text-underline': isActive(item) }">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import {useRouter, useRoute} from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';

const router = useRouter();
const route = useRoute();

const items = ref([
  {label: 'Analytics', icon: 'pi pi-chart-line', route: '/analytics'},
  {label: 'Projects', icon: 'pi pi-folder', route: '/projects'},
]);

const home = ref({label: 'Home', icon: 'pi pi-fw pi-home', route: '/'});

const breadcrumbItems = computed(() => {
  const currentPath = route.path;

  if (currentPath === '/') {
    return [];
  }

  const currentItem = items.value.find(item => item.route === currentPath);

  return currentItem ? [currentItem] : [home.value];
});

const isActive = (item) => route.path === item.route;
const navigateTo = (route) => router.push(route);
</script>

<style scoped>
.breadcrumb-container {
  padding-left: 120px !important;
}

.p-breadcrumb {
  background-color: #333;
  padding: 1em 0;
}

.p-breadcrumb ol {
  justify-content: center;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
}

.breadcrumb-link .icon {
  margin-top: -2px;
}

.text-underline {
  text-decoration: underline;
  color: #fff;
}
</style>
