// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MerchantPage from './pages/MerchantPage';
import BuyerPage from './pages/BuyerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/merchant" element={<MerchantPage />} />
        <Route path="/buyer/:paymentId" element={<BuyerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
