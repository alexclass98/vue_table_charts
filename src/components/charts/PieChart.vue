<template>
  <div className="card">
    <h2 className="chart-title">Круглый график</h2>
    <Chart type="pie" :data="chartData" :options="chartOptions" class="chart"/>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Chart from 'primevue/chart';

const getChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-teal-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-300'),
          documentStyle.getPropertyValue('--p-orange-300'),
          documentStyle.getPropertyValue('--p-teal-300')
        ]
      }
    ]
  };
};

const getChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    maintainAspectRatio: false,
  };
};

const chartData = ref(getChartData());
const chartOptions = ref(getChartOptions());
</script>

<style scoped>
.chart-title {
  text-align: center;
  margin-bottom: 1rem;
}

.chart {
  height: 400px;
  padding: 10px;
}
</style>