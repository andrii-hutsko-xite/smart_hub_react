import "./Footer.css";

function Footer() {

    const now = new Date();
    const cur_year = now.getFullYear();

    return (

        <footer>
            <div className="content">
                <p>
                    All rights reserved {cur_year}
                </p>
                <p>SmartHub</p>
            </div>
        </footer>

    )

}

export default Footer;