<template>
  <div class="container">
    <div class="toolbar">
      <Button label="Добавить запись" icon="pi pi-plus" @click="openNew"/>
      <ToggleButton v-model="isTableView" onLabel="Таблица" offLabel="Карточки" onIcon="pi pi-table"
                    offIcon="pi pi-th-large"/>
      <p class="record-counter">Количество записей: {{ itemCount }}</p>
      <InputText v-model="searchQuery" placeholder="Поиск..." class="search-input"/>
    </div>

    <!-- Табличное представление -->
    <div v-if="isTableView" class="data-table">
      <DataTable v-model:selection="selectedItem" :value="filteredEdges" showGridlines stripedRows
                 selectionMode="single" dataKey="from"
                 @selection-change="onRowSelect" scrollable
                 scrollHeight="550px">
        <Column field="from" header="From" sortable></Column>
        <Column field="to" header="To" sortable></Column>
        <Column field="fromType" header="From Type" sortable></Column>
        <Column field="toType" header="To Type" sortable></Column>
        <Column field="caseId" header="Case ID" sortable></Column>
        <Column field="weight" header="Weight" sortable></Column>
        <Column header="Actions">
          <template #body="{ data }">
            <Button icon="pi pi-pencil" @click="onEdit(data)" class="p-button-text"/>
            <Button icon="pi pi-trash" @click="deleteItem(data)" class="p-button-text"/>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Карточное представление -->
    <div v-else class="card-view">
      <div v-for="(edge, index) in filteredEdges" :key="index" class="card">
        <p><strong>From:</strong> {{ edge.from }}</p>
        <p><strong>To:</strong> {{ edge.to }}</p>
        <p><strong>From Type:</strong> {{ edge.fromType }}</p>
        <p><strong>To Type:</strong> {{ edge.toType }}</p>
        <p><strong>Case ID:</strong> {{ edge.caseId }}</p>
        <p><strong>Weight:</strong> {{ edge.weight }}</p>
        <div class="card-actions">
          <Button icon="pi pi-pencil" @click="onEdit(edge)" class="p-button-text"/>
          <Button icon="pi pi-trash" @click="deleteItem(edge)" class="p-button-text"/>
        </div>
      </div>
    </div>

    <!-- Диалог редактирования/добавления -->
    <Dialog v-model:visible="itemDialog" :header="editMode ? 'Изменить запись' : 'Добавить запись'">
      <div class="dialog-content">
        <div v-for="field in fields" :key="field.id" class="p-field">
          <label :for="field.id">{{ field.label }}</label>
          <InputText :id="field.id" v-model="item[field.key]" :type="field.type" required/>
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" @click="saveItem"/>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useDataStore} from '../store/useDataStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';

const dataStore = useDataStore();
const isTableView = ref(true);
const selectedItem = ref(null);
const itemDialog = ref(false);
const editMode = ref(false);
const searchQuery = ref('');
const item = ref({
  from: '',
  to: '',
  fromType: '',
  toType: '',
  caseId: '',
  weight: null,
});

const fields = [
  {id: 'from', label: 'From', key: 'from', type: 'text'},
  {id: 'to', label: 'To', key: 'to', type: 'text'},
  {id: 'fromType', label: 'From Type', key: 'fromType', type: 'text'},
  {id: 'toType', label: 'To Type', key: 'toType', type: 'text'},
  {id: 'caseId', label: 'Case ID', key: 'caseId', type: 'text'},
  {id: 'weight', label: 'Weight', key: 'weight', type: 'number'},
];

const itemCount = computed(() => dataStore.itemCount);

const filteredEdges = computed(() => dataStore.filteredEdges(searchQuery.value));

const openNew = () => {
  item.value = {from: '', to: '', fromType: '', toType: '', caseId: '', weight: null};
  editMode.value = false;
  itemDialog.value = true;
};

const hideDialog = () => {
  itemDialog.value = false;
};

const saveItem = () => {
  if (editMode.value) {
    dataStore.updateItem(item.value);
  } else {
    dataStore.addItem(item.value);
  }

  hideDialog();
};

const onRowSelect = (event) => {
  editMode.value = true;
  item.value = {...event.data};
  itemDialog.value = true;
};

const onEdit = (rowData) => {
  editMode.value = true;
  item.value = {...rowData};
  itemDialog.value = true;
};

const deleteItem = (rowData) => {
  dataStore.deleteItem(rowData);
};
</script>

<style scoped>
.container {
  padding: 10px;
  height: 100%;
}

.toolbar {
  display: flex;
  align-items: center;
  margin: 5px 10px;
  gap: 10px;
}

.record-counter {
  font-size: 1.2em;
  margin: 0;
}

.data-table, .card-view {
  max-height: 550px;
  overflow-y: auto;
  margin: 10px;
}

.card-view {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  width: 250px;
  box-sizing: border-box;
  background-color: #fff;
}

.card p {
  margin: 0.5rem 0;
}

.card-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.dialog-content .p-field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}

.record-counter {
  font-size: larger;
}

.search-input {
  margin-left: auto;
}
</style>