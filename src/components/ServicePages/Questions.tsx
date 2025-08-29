import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./ServicePages.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from 'react';

function Questions() {

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
        const element = document.getElementById(location.hash.substring(1)); // Remove the '#'
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the element
        }
        }
    }, [location]); // Re-run this effect whenever the location object changes

    return (
    
        <div className="App">
            <Header />
            <div className="main-content">
                <Breadcrumbs />
                <>
                    <div className='h1-doc'>Frequently Asked Questions (F&Q)</div>

                    <div className='p-doc'>Here, we've compiled a list of questions our customers most often ask. Our goal is to provide you with clear, quick answers so you can get back to what matters: enjoying your new smartphone.</div>

                    <div className='h2-doc'>Orders & Shipping</div>

                    <ul>
                        <li className='li-doc'>How can I track my order?
                            <ul>
                                <li className='li-doc'>Once your order ships, you will receive a confirmation email with a tracking number and a link to the carrier's website. You can also log in to your account to view your order status and tracking information.</li>
                            </ul>
                        </li>
                        <li className='li-doc'>How long does shipping take?
                            <ul>
                                <li className='li-doc'>Standard delivery typically takes [X] business days. For faster service, our Express Delivery option takes [X] business days.</li>
                            </ul>
                        </li>
                        <li className='li-doc'>Can I change my delivery address after I've placed an order?
                            <ul>
                                <li className='li-doc'>Please contact us immediately. If your order has not yet been processed by our warehouse, we may be able to update the address.</li>
                            </ul>
                        </li>
                    </ul>

                    <div className='h2-doc' id="return-and-refunds">Returns & Refunds</div>

                    <ul>
                        <li className='li-doc'>What is your return policy?
                            <ul>
                                <li className='li-doc'>We offer a [X]-day return policy. If you are not completely satisfied with your purchase, you can return it within [X] days of delivery for a full refund or exchange. The item must be in its original, unused condition.</li>
                            </ul>
                        </li>
                        <li className='li-doc'>How long does it take to process a refund?
                            <ul>
                                <li className='li-doc'>Once we receive your returned item and inspect it, your refund will be processed to your original payment method within [X] business days.</li>
                            </ul>
                        </li>
                        <li className='li-doc'>Can I return an item that I have used?
                            <ul>
                                <li className='li-doc'>No, all returns must be in their original condition and packaging. Please see our full return policy for details.</li>
                            </ul>
                        </li>
                    </ul>
                    
                    <div className="h2-doc">Products</div>

                    <ul>
                        <li className='li-doc'>Are your phones new or refurbished?.
                            <ul>
                                <li className='li-doc'>All smartphones we sell are brand new, sealed in their original manufacturer packaging, unless otherwise specified on the product page.</li>
                            </ul>
                        </li>
                        <li className='li-doc'>Do your phones come with a warranty?
                            <ul>
                                <li className='li-doc'>Yes, all of our products are covered by the manufacturer's warranty. [Optional: Add a link to more warranty information].</li>
                            </ul>
                        </li>
                        <li className='li-doc'>What should I do if my phone is not working?
                            <ul>
                                <li className='li-doc'>Please refer to the troubleshooting guides on our website or contact our support team. We can help you with initial technical issues and, if necessary, assist with a warranty claim.</li>
                            </ul>
                        </li>
                    </ul>

                    <div className="h2-doc">Payment & Security</div>

                    <ul>
                        <li className='li-doc'>What payment methods do you accept?
                            <ul>
                                <li className='li-doc'>We accept all major credit/debit cards, as well as [e.g., PayPal, iDEAL, Google Pay, Apple Pay]. You can view the full list on our [link to Delivery & Payment page] page.</li>
                            </ul>
                        </li>
                        <li className='li-doc'>Is my payment information secure?
                            <ul>
                                <li className='li-doc'>Yes, we use industry-standard SSL encryption to protect your data. Your credit card details are never stored on our servers.</li>
                            </ul>
                        </li>
                    </ul>

                </>
            </div>
            <Footer />
        </div>

    )

}

export default Questions;