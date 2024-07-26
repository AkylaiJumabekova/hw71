import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dish } from '../types';
import { fetchDishes, addDishToFirebase, updateDishInFirebase } from './dishesThunks';

interface DishesState {
    dishes: Dish[];
    loading: boolean;
    error: string | null;
}

const initialState: DishesState = {
    dishes: [],
    loading: false,
    error: null,
};

const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDishes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDishes.fulfilled, (state, action: PayloadAction<Dish[]>) => {
                state.loading = false;
                state.dishes = action.payload;
            })
            .addCase(fetchDishes.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addDishToFirebase.fulfilled, (state, action: PayloadAction<Dish>) => {
                state.dishes.push(action.payload);
            })
            .addCase(updateDishInFirebase.fulfilled, (state, action: PayloadAction<Dish>) => {
                const index = state.dishes.findIndex(dish => dish.id === action.payload.id);
                if (index !== -1) {
                    state.dishes[index] = action.payload;
                }
            });
    }
});

export default dishesSlice.reducer;
