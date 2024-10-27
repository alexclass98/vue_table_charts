import {describe, it, expect, beforeEach} from 'vitest';
import {setActivePinia, createPinia} from 'pinia';
import {useDataStore} from '../store/useDataStore';
import data from '../assets/data.json';

describe('Data Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should initialize with edges from data.json', () => {
        const store = useDataStore();
        expect(store.edges).toEqual(data.edges);
    });

    it('should return the correct item count', () => {
        const store = useDataStore();
        expect(store.itemCount).toBe(data.edges.length);
    });

    it('should filter edges based on search query', () => {
        const store = useDataStore();
        const searchQuery = 'вконтакте';
        const filtered = store.filteredEdges(searchQuery);

        expect(filtered).toEqual(store.edges.filter(edge =>
            Object.values(edge).some(value =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        ));
    });

    it('should add a new item', () => {
        const store = useDataStore();
        const newItem = {
            from: 'Роман Богданов',
            to: 'Пепси Кола',
            fromType: 'PERSON',
            toType: 'ORG',
            caseId: '67190f8849a7780ac9c6df08',
            weight: 7
        };

        store.addItem(newItem);

        expect(store.edges).toContainEqual(newItem);
        expect(store.itemCount).toBe(data.edges.length);
    });

    it('should update an existing item', () => {
        const store = useDataStore();
        const updatedItem = {
            from: 'Роман Богданов',
            to: 'FUN &amp',
            fromType: 'PERSON',
            toType: 'ORG',
            caseId: '67190f8849a7780ac9c6df08',
            weight: 3
        };

        store.updateItem(updatedItem);

        expect(store.edges.find(edge => edge.from === updatedItem.from && edge.to === updatedItem.to)).toEqual(updatedItem);
    });

    it('should delete an existing item', () => {
        const store = useDataStore();
        const itemToDelete = {from: 'Плохие данные', to: 'Плохие данные'};

        store.deleteItem(itemToDelete);

        expect(store.edges.find(edge => edge.from === itemToDelete.from && edge.to === itemToDelete.to)).toBeUndefined();
    });
});