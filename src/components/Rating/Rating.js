import "./Rating.css";

function Rating({rating}) {

    function calculateStars(value) {

        if (value <= 0 || value > 5) {
        
            console.error("invalid rating value; accepted valus are from 0 to 5;");
             
        } else {
        
            let whole = Math.floor(value);
            const fraction = value - Math.floor(value);
            let half = 0;
            let empty = 5 - Math.ceil(value);
            if (fraction !== 0) {
                if (fraction <= 0.25) {
                    empty++;
                } else if (fraction > 0.25 && fraction < 0.75) {
                    half++;
                } else if (fraction >= 0.75) {
                    whole++;
                }
            }
        
            return [whole, half, empty];
        
        }        

    }

    const starsArray = calculateStars(rating);

    const stars = [];

    for (let i=0;i<starsArray[0];i++) {
        stars.push("whole");
    }

    for (let i=0;i<starsArray[1];i++) {
        stars.push("half");
    }

    for (let i=0;i<starsArray[2];i++) {
        stars.push("empty");
    }
    
    

    return (

        <div className="rating-container">
            <div className="stars">
                {

                    stars.map((element, index) => {

                        return (

                            <div className={`base ${element}`} key={index}></div>

                        )

                    }) 

                }
            </div>
            <p className="rating-number">{rating}</p>
            <p className="rating-reviews">(12)</p>
        </div>

    )

}

export default Rating;