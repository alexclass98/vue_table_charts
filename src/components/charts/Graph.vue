<template>
  <div class="graph-container">
    <h2>Граф связей</h2>
    <div ref="networkContainer" className="network-container"></div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {DataSet, Network} from 'vis-network/standalone';
import nodesData from '../../assets/nodes.json';
import edgesData from '../../assets/edges.json';

const networkContainer = ref(null);

onMounted(() => {
  const nodes = new DataSet(nodesData.map(node => ({id: node.name, label: node.name})));

  const edges = new DataSet(edgesData.map(edge => ({
    from: edge.from,
    to: edge.to,
    arrows: 'to',
    label: edge.weight.toString(),
    font: {
      align: 'top'
    }
  })));

  const data = {nodes, edges};

  const options = {
    physics: true,
    layout: {
      hierarchical: false,
    },
    edges: {
      smooth: true,
      color: {
        color: '#848484',
        highlight: '#848484',
        hover: '#848484'
      }
    }
  };

  new Network(networkContainer.value, data, options);
});
</script>

<style scoped>
.graph-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.network-container {
  width: 100%;
  height: 500px;
}
</style>