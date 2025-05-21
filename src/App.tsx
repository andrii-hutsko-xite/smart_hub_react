import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductPage from './components/ProductPage/ProductPage';
import LoginPage from './components/LoginPage/LoginPage';
import { ReactElement } from 'react';

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-products/:id" element={<ProductPage /> } />
        <Route path="/login" element={<LoginPage /> } />
      </Routes>
    </Router>
    
  );
}

export default App;
