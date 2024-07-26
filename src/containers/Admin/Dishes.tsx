import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDishes, addDishToFirebase, updateDishInFirebase, deleteDishFromFirebase } from '../../store/dishesThunks';
import { Dish } from '../../types';

const Dishes: React.FC = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(state => state.dishes.dishes);

    const [dishData, setDishData] = useState<Dish>({
        id: '',
        title: '',
        price: 0,
        image: ''
    });
    
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    const handleAddDish = async (dish: Dish) => {
        await dispatch(addDishToFirebase(dish));
    };

    const handleUpdateDish = async (dish: Dish) => {
        await dispatch(updateDishInFirebase(dish));
    };

    const handleDeleteDish = async (dishId: string) => {
        await dispatch(deleteDishFromFirebase(dishId));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDishData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (editMode) {
            await handleUpdateDish(dishData);
        } else {
            await handleAddDish(dishData);
        }
        setDishData({ id: '', title: '', price: 0, image: '' });
        setEditMode(false);
    };

    const handleEditClick = (dish: Dish) => {
        setDishData(dish);
        setEditMode(true);
    };

    return (
        <div>
            <h1>Manage Dishes</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={dishData.title}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={dishData.price}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={dishData.image}
                    onChange={handleChange}
                />
                <button type="submit">{editMode ? 'Update Dish' : 'Add Dish'}</button>
            </form>
            <ul>
                {dishes.map((dish: Dish) => (
                    <li key={dish.id}>
                        {dish.title} - {dish.price} - <img src={dish.image} alt={dish.title} width="50" />
                        <button onClick={() => handleEditClick(dish)}>Edit</button>
                        <button onClick={() => handleDeleteDish(dish.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dishes;
