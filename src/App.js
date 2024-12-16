import './App.css';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';
import PromoShelf from './components/PromoShelf/PromoShelf';
import Brands from './components/Brands/Brands';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='main-content'>
        <Banner />
        <PromoShelf title="Black Friday Sale!" top="16px" />
        <Brands />
        <PromoShelf title="Popular Now!" top="40px" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
