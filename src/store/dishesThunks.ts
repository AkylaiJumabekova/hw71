import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { Dish } from '../types';

interface RootState {
    dishes: {
        dishes: Dish[];
    };
}

export const fetchDishes = createAsyncThunk<Dish[], void, { state: RootState }>(
    'dishes/fetchDishes',
    async () => {
        const response = await axiosApi.get('/dishes.json');
        const data = response.data;
        const dishes: Dish[] = data
            ? Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))
            : [];
        return dishes;
    }
);

export const addDishToFirebase = createAsyncThunk<Dish, Dish, { state: RootState }>(
    'dishes/addDishToFirebase',
    async (dish) => {
        const response = await axiosApi.post('/dishes.json', dish);
        return { ...dish, id: response.data.name };
    }
);
