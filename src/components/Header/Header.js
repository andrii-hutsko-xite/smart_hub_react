import "./Header.css";

function Header() {

    return (
        <header>
            <div className="content">
                <div className="links">
                    <a href="./">Delivery & Payment</a>
                    <a href="./">Help</a>
                    <a href="./">FAQ</a>
                </div>
                <div className="main">
                    <img src="./media/logo.svg" alt='logo'/>
                    <div className="controls">
                        <input type="text" placeholder="Search" />
                        <button>Log in</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;