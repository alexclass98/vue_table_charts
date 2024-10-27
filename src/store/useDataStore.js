import {defineStore} from 'pinia';
import data from '../assets/data.json';

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        edges: data.edges,
    }),
    getters: {
        itemCount: (state) => state.edges.length,
        filteredEdges: (state) => (searchQuery) => {
            if (!searchQuery) return state.edges;
            return state.edges.filter(edge =>
                Object.values(edge).some(value =>
                    String(value).toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    },
    actions: {
        addItem(newItem) {
            this.edges.push(newItem);
        },
        updateItem(updatedItem) {
            const index = this.edges.findIndex(e => e.from === updatedItem.from && e.to === updatedItem.to);
            if (index !== -1) {
                this.edges[index] = updatedItem;
            }
        },
        deleteItem(itemToDelete) {
            this.edges = this.edges.filter(e => e.from !== itemToDelete.from || e.to !== itemToDelete.to);
        }
    }
});