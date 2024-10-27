<template>
  <div className="card">
    <h2 className="chart-title">График по API с погодой</h2>
    <Chart type="line" :data="chartData" :options="chartOptions" class="chart"/>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import Chart from 'primevue/chart';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const city = 'Moscow';

const getChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const chartData = ref({});
const chartOptions = ref(getChartOptions());

const fetchWeatherData = async () => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=8&appid=${apiKey}`);
    const data = await response.json();

    const labels = data.list.map(item => {
      const date = new Date(item.dt * 1000);
      return `${date.getHours()}:00`;
    });

    const temperatures = data.list.map(item => item.main.temp);

    setChartData(labels, temperatures);
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
  }
};

const setChartData = (labels, temperatures) => {
  chartData.value = {
    labels: labels,
    datasets: [
      {
        label: 'Температура (°C)',
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
        data: temperatures,
      }
    ]
  };
};

onMounted(() => {
  fetchWeatherData();
});
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