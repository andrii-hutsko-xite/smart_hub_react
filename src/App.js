import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductPage from './components/ProductPage/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-products/product/:id" element={<ProductPage /> } />
      </Routes>
    </Router>
    
  );
}

export default App;
