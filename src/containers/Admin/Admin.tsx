import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dishes from './Dishes';
import Orders from './Orders';

const Admin: React.FC = () => {
    return (
        <Routes>
            <Route path="dishes" element={<Dishes />} />
            <Route path="orders" element={<Orders />} />
        </Routes>
    );
};

export default Admin;
