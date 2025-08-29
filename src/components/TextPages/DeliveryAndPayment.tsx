import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./TextPages.css";
import { Link } from "react-router-dom";

function DeliveryAndPayment() {

    return (
    
        <div className="App">
            <Header />
            <div className="main-content">
                <Breadcrumbs />
                <>
                    <div className='h1-doc'>Delivery and Payment</div>

                    <div className='p-doc'>We want you to get your new smartphone as quickly and securely as possible. Below you'll find everything you need to know about our delivery options and accepted payment methods.</div>

                    <div className='h2-doc'>Delivery</div>

                    <div className='p-doc'>We offer reliable shipping to ensure your order arrives safely at your doorstep.</div>

                    <div className='h3-doc'>Shipping Options & Rates:</div>

                    <ul>
                        <li><b>Standard Delivery:</b> €15.00 | Estimated delivery in 3 business days.</li>
                        <li><b>Express Delivery:</b> €35.00 | Estimated delivery in 1 business day.</li>
                    </ul>

                    <i>Note: Shipping costs are calculated based on your location and will be displayed at checkout before you finalize your purchase.</i>

                    <div className='h3-doc'>Order Processing Time:</div>

                    <div className='p-doc'>We process and ship all orders from our warehouse within 1-2 business days after your payment is confirmed. Please note that delivery times are estimates and do not include this processing period.</div>

                    <h3>Tracking Your Order:</h3>

                    <div className='p-doc'>Once your order has been dispatched, you will receive a shipping confirmation email with a tracking number. You can use this number to track your package on our shipping partner's website.</div>

                    <div className='h3-doc'>Lost or Damaged Packages:</div>

                    <div className='p-doc'>In the rare event that your package is lost or arrives damaged, please contact our customer support team immediately at <a href="mailto:smarthub@mail.com">smarthub@mail.com</a> or <a href="tel:0629898333">0629898333</a>. We will work with you to resolve the issue as quickly as possible.</div>

                    <div className='h2-doc'>Payment</div>

                    <div className='p-doc'>We accept a wide range of secure payment methods to make your checkout experience fast and easy.</div>

                    <div className='h3-doc'>Accepted Payment Methods:</div>

                    <ul>
                        <li><b>Credit/Debit Cards:</b> We accept all major credit and debit cards, including Visa, MasterCard, American Express, and Discover.</li>
                        <li><b>Online Wallets:</b> For a quick and secure checkout, you can pay with Apple Pay, Google Pay.</li>
                        <li><b>Other options:</b> iDEAL, Bancontact, Sofort Banking.</li>
                    </ul>

                    <div className='h3-doc'>Security:</div>

                    <div className='p-doc'>Your security is our top priority. All transactions on our website are protected by industry-standard SSL encryption. We do not store your credit card information, ensuring your data remains private and secure.</div>

                    <div className='h2-doc'>Questions?</div>

                    <div className='p-doc'>If you have any further questions regarding your order's delivery or payment, please do not hesitate to contact our customer support team at <a href="mailto:smarthub@mail.com">smarthub@mail.com</a>. We're here to help!</div>

                </>
            </div>
            <Footer />
        </div>

    )

}

export default DeliveryAndPayment;