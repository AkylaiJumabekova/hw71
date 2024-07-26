import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import Dishes from './containers/Admin/Dishes';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin">
          <Route path="dishes" element={<Dishes />} />
        </Route>
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
