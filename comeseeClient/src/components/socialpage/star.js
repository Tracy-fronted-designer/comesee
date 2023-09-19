import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Star from '../../css/socialpage/star.module.css';

function StarRanking() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => setRating(currentRating)} />
                        <FaStar
                            className={Star.starlight}
                            size={25}
                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)} />
                    </label>
                );
            })}
        </div>
    )
}

export default StarRanking;