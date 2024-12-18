import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import PromoShelf from '../PromoShelf/PromoShelf';
import Brands from '../Brands/Brands';

function Home() {

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

    )


}

export default Home;