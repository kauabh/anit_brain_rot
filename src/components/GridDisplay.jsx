import React, { useState } from 'react';

const GridSquare = ({ number, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    if (number === null) return <div className="grid-spacer" />;

    return (
        <div
            className="grid-square-wrapper"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={(e) => {
                console.log('Clicked wrapper', number);
                setIsFlipped(!isFlipped);
            }}
        >
            <div
                className={`grid-square-inner ${isFlipped ? 'flipped' : ''}`}
            >
                <div className="grid-square-front">
                    {number}
                </div>
                <div className="grid-square-back">
                    {number * number}
                </div>
            </div>
        </div>
    );
};

const GridDisplay = ({ count }) => {
    // Generate numbers 1 to count
    let numbers = Array.from({ length: count }, (_, i) => i + 1);

    // Layout Logic for Clockwise ordering (same as before)
    if (count === 4) {
        numbers = [1, 2, 4, 3];
    }

    if (count === 8) {
        numbers = [1, 2, 3, 8, null, 4, 7, 6, 5];
    }

    return (
        <div className={`grid-container grid-${count}`}>
            {numbers.map((num, idx) => (
                <GridSquare key={idx} number={num} index={idx} />
            ))}
        </div>
    );
};

export default GridDisplay;
