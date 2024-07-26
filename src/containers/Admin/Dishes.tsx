import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDishes, addDishToFirebase } from '../../store/dishesThunks';
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

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    const handleAddDish = async (dish: Dish) => {
        await dispatch(addDishToFirebase(dish));
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
        await handleAddDish(dishData);
        setDishData({ id: '', title: '', price: 0, image: '' });
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
                <button type="submit">Add Dish</button>
            </form>
            <ul>
                {dishes.map((dish: Dish) => (
                    <li key={dish.id}>
                        {dish.title} - {dish.price} - <img src={dish.image} alt={dish.title} width="50" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dishes;
