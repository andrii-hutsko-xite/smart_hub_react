import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./ServicePages.css";
import { Link } from "react-router-dom";

function Help() {

    return (
    
        <div className="App">
            <Header />
            <div className="main-content">
                <Breadcrumbs />
                <>
                    <div className='h1-doc'>Help</div>

                    <div className='p-doc'>This page is designed to be your one-stop shop for any assistance you might need. Below, you can find answers to our most frequently asked questions and information on how to reach our support team.</div>

                    <div className='h2-doc'>Need Help with an Order?</div>

                    <ul>
                        <li className='li-doc'><b>Track My Order:</b> [Link to a tracking page/portal]</li>
                        <li className='li-doc'><b>Check Our Delivery & Payment Policy:</b> <Link to="/delivery-and-payment">visit page</Link></li>
                        <li className='li-doc'><b>Learn About Our Return Policy:</b> <Link to="/questions#return-and-refunds">visit page</Link></li>
                    </ul>

                    <div className='h2-doc'>Top Categories:</div>

                    <ul>
                        <li className='li-doc'>[Category 1, e.g., Orders & Shipping]: [Brief description]</li>
                        <li className='li-doc'>[Category 2, e.g., Products & Technical Support]: [Brief description]</li>
                        <li className='li-doc'>[Category 3, e.g., Payments & Account]: [Brief description]</li>
                    </ul>

                    <div className="h2-doc">Still Need Assistance?</div>

                    <div className="p-doc">If you can't find the answer you're looking for, our friendly support team is here to help.</div>

                    <ul>
                        <li className='li-doc'><b>Email Us:</b> Send us a message at [Your Email Address]. We aim to respond to all inquiries within 24-48 hours.</li>
                        <li className='li-doc'><b>Live Chat:</b> [Add a call-to-action for a live chat feature, if you have one]. Get instant support from one of our team members.</li>
                        <li className='li-doc'><b>Contact Form:</b> Fill out our simple contact form [Link to contact form page] and we'll get back to you as soon as we can.</li>
                    </ul>

                </>
            </div>
            <Footer />
        </div>

    )

}

export default Help;