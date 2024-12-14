import './App.css';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='main-content'>
        <Banner />
      </div>
    </div>
  );
}

export default App;
