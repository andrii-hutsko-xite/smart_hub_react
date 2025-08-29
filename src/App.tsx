import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductPage from './components/ProductPage/ProductPage';
import DeliveryAndPayment from './components/ServicePages/DeliveryAndPayment';
import Help from './components/ServicePages/Help';
import Questions from './components/ServicePages/Questions';
import { ReactElement } from 'react';

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-products/:id" element={<ProductPage /> } />
        <Route path="/delivery-and-payment" element={<DeliveryAndPayment /> } />
        <Route path="/help" element={<Help /> } />
        <Route path="/questions" element={<Questions /> } />
      </Routes>
    </Router>
    
  );
}

export default App;
