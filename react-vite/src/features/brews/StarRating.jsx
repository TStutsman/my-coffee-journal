import { useEffect, useState } from 'react';
import './StarRating.css';

function StarRating({ rating, setRating }){
    const [fillStars, setFillStars] = useState("0.0");

    useEffect(() => {
        setFillStars(rating);
    }, [rating]);

    const onHover = (e, rating) => {
        const x = e.nativeEvent.offsetX;
        if(x < 12) {
            setFillStars((rating-.5).toString());
        } else {
            setFillStars(rating.toString());
        }
    }

    const onClick = (e, rating) => {
        if(!setRating) return;

        const x = e.nativeEvent.offsetX;
        if(x < 12) {
            setFillStars((rating-.5).toString());
            setRating((rating-.5).toString());
        } else {
            setFillStars((rating-.5).toString());
            setRating(rating.toString());
        }
    }

    return (
        <div id='star-rating' onMouseOut={() => setFillStars(rating)}>
            {
                Array(5).fill(1).map((_,i) => {
                    return i < (fillStars - 1) ?
                    <svg key={i} onMouseOver={(e) => setRating != undefined && onHover(e, i+1)} onClick={(e) => onClick(e, i+1)} className='star full-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='currentColor'>
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    : i < fillStars && Number(fillStars) != Math.floor(Number(fillStars)) ? 
                    <svg key={i} onMouseOver={(e) => setRating != undefined && onHover(e, i+1)} onClick={(e) => onClick(e, i+1)} className='star half-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='currentColor'>
                        <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"/>
                    </svg>
                    : i < fillStars ?
                    <svg key={i} onMouseOver={(e) => setRating != undefined && onHover(e, i+1)} onClick={(e) => onClick(e, i+1)} className='star full-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='currentColor'>
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    :
                    <svg key={i} onMouseOver={(e) => setRating != undefined && onHover(e, i+1)} onClick={(e) => onClick(e, i+1)} className='star empty-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='currentColor'>
                        <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                    </svg>
                })
            }
        </div>
    );
}

export default StarRating;