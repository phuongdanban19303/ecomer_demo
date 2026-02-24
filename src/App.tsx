import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import các trang (Pages) của mày vào đây
import HomePage from './Page/HomePage';
import ShopPage from './Page/ShopPage';
import DetailPage from './Page/DetailPage';
import CartPage from './Page/CartPage';
import CheckoutPage from './Page/CheckoutPage';
import LoginPage from './Page/LoginPage';
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="*" 
        element={
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-2xl text-gray-600 mt-4">Trang mày tìm không tồn tại đâu!</p>
          </div>
        } 
      />
    </Routes>
  );
}

export default App;