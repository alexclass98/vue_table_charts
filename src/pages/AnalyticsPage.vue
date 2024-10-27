<template>
  <div class="chart-container" style="padding: 10px">
    <Select
        v-model="selectedChart"
        :options="chartOptions"
        optionLabel="label"
        optionValue="value"
        @change="updateChart"
        placeholder="Выберите график"
        class="select-chart"
    />

    <div v-if="selectedChart === 'line'">
      <LineChartComponent />
    </div>
    <div v-else-if="selectedChart === 'lineWeather'">
      <LineChartWeather />
    </div>
    <div v-else-if="selectedChart === 'pie'">
      <PieChart />
    </div>
    <div v-else-if="selectedChart === 'bar'">
      <BarChart />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Select from 'primevue/select';
import LineChartComponent from '../components/charts/LineChartComponent.vue';
import LineChartWeather from '../components/charts/LineChartWeather.vue';
import PieChart from '../components/charts/PieChart.vue';
import BarChart from '../components/charts/BarChart.vue';

const selectedChart = ref('line');

const chartOptions = [
  { label: 'Line Chart', value: 'line' },
  { label: 'Line Chart Weather', value: 'lineWeather' },
  { label: 'Pie Chart', value: 'pie' },
  { label: 'Bar Chart', value: 'bar' }
];
</script>

<style scoped>
.chart-container {
  height: 100%;
}

.select-chart {
  width: 200px;
}
</style>