<template>
  <div className="card">
    <h2 className="chart-title">Случайный линейный график</h2>
    <Chart type="line" :data="chartData" :options="chartOptions" class="chart"/>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Chart from 'primevue/chart';
import chartData from '../../assets/chartData.json';

const chartOptions = ref(getChartOptions());

function getChartOptions() {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: documentStyle.getPropertyValue('--p-text-color')
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: documentStyle.getPropertyValue('--p-text-muted-color')
        },
        grid: {
          color: documentStyle.getPropertyValue('--p-content-border-color')
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: documentStyle.getPropertyValue('--p-text-muted-color')
        },
        grid: {
          color: documentStyle.getPropertyValue('--p-content-border-color')
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: documentStyle.getPropertyValue('--p-text-muted-color')
        },
        grid: {
          drawOnChartArea: false,
          color: documentStyle.getPropertyValue('--p-content-border-color')
        }
      }
    }
  };
}
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