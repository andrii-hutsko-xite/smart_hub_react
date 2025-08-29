import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./TextPages.css";
import { Link } from "react-router-dom";

function Questions() {

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
                        <li>How can I track my order?
                            <ul>
                                <li>Once your order ships, you will receive a confirmation email with a tracking number and a link to the carrier's website. You can also log in to your account to view your order status and tracking information.</li>
                            </ul>
                        </li>
                        <li>How long does shipping take?
                            <ul>
                                <li>Standard delivery typically takes [X] business days. For faster service, our Express Delivery option takes [X] business days.</li>
                            </ul>
                        </li>
                        <li>Can I change my delivery address after I've placed an order?
                            <ul>
                                <li>Please contact us immediately. If your order has not yet been processed by our warehouse, we may be able to update the address.</li>
                            </ul>
                        </li>
                    </ul>

                    <div className='h2-doc'>Returns & Refunds</div>

                    <ul>
                        <li>What is your return policy?
                            <ul>
                                <li>We offer a [X]-day return policy. If you are not completely satisfied with your purchase, you can return it within [X] days of delivery for a full refund or exchange. The item must be in its original, unused condition.</li>
                            </ul>
                        </li>
                        <li>How long does it take to process a refund?
                            <ul>
                                <li>Once we receive your returned item and inspect it, your refund will be processed to your original payment method within [X] business days.</li>
                            </ul>
                        </li>
                        <li>Can I return an item that I have used?
                            <ul>
                                <li>No, all returns must be in their original condition and packaging. Please see our full return policy for details.</li>
                            </ul>
                        </li>
                    </ul>

                    <div className="h2-doc">Products</div>

                    <ul>
                        <li>Are your phones new or refurbished?.
                            <ul>
                                <li>All smartphones we sell are brand new, sealed in their original manufacturer packaging, unless otherwise specified on the product page.</li>
                            </ul>
                        </li>
                        <li>Do your phones come with a warranty?
                            <ul>
                                <li>Yes, all of our products are covered by the manufacturer's warranty. [Optional: Add a link to more warranty information].</li>
                            </ul>
                        </li>
                        <li>What should I do if my phone is not working?
                            <ul>
                                <li>Please refer to the troubleshooting guides on our website or contact our support team. We can help you with initial technical issues and, if necessary, assist with a warranty claim.</li>
                            </ul>
                        </li>
                    </ul>

                    <div className="h2-doc">Payment & Security</div>

                    <ul>
                        <li>What payment methods do you accept?
                            <ul>
                                <li>We accept all major credit/debit cards, as well as [e.g., PayPal, iDEAL, Google Pay, Apple Pay]. You can view the full list on our [link to Delivery & Payment page] page.</li>
                            </ul>
                        </li>
                        <li>Is my payment information secure?
                            <ul>
                                <li>Yes, we use industry-standard SSL encryption to protect your data. Your credit card details are never stored on our servers.</li>
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