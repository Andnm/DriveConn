import React from 'react'

const StarRating = ({ rate }) => {
    const filledStars = [...Array(rate)]?.map((_, index) => (
        <i key={index} className="ri-star-fill"></i>
    ));

    const emptyStars = [...Array(5 - rate)]?.map((_, index) => (
        <i key={index} className="ri-star-line"></i>
    ));

    return (
        <div className='star'>
            {filledStars}
            {emptyStars}
        </div>
    );
}

export default StarRating