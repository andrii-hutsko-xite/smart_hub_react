import './PopupAccount.css';
import Button from '../Button/Button.js'; 
import { useEffect } from 'react';

function PopupAccount({ selfClose }) {

    function logOut() {

        localStorage.removeItem('authToken');
        window.location.reload();

    }

    useEffect(() => {
    
        const handleKeyUp = (event) => {
            if (event.key === "Escape") {
                selfClose();
            }
        }

        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        }

    });

    return (
        <div className="popup-container">
            <div className="popup-content">
                <Button
                    type="text"
                    text="My Account"
                />
                <Button
                    type="text"
                    text="Log Out"
                    onClickAction={() => logOut()}
                />
            </div>
        </div>
    )

}

export default PopupAccount;