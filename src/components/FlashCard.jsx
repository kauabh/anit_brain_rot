import React, { useState, useEffect } from 'react';

const FlashCard = ({ cards = [], category, onUpdateCard }) => {
    const [queue, setQueue] = useState([]);
    const [isFlipped, setIsFlipped] = useState(false);

    // Initialize/Reset ONLY when category changes or deck size changes
    // This prevents resetting the queue when a single card's fields update (like status/rating)
    useEffect(() => {
        if (!cards || cards.length === 0) {
            setQueue([]);
            return;
        }

        // Sort: New (status != 'reviewed') first, then Reviewed
        const sorted = [...cards].sort((a, b) => {
            const aReviewed = a.status === 'reviewed';
            const bReviewed = b.status === 'reviewed';
            if (aReviewed === bReviewed) return 0;
            return aReviewed ? 1 : -1;
        });

        setQueue(sorted);
        setIsFlipped(false);
    }, [category, cards.length]);

    if (!queue || queue.length === 0) {
        return (
            <div className="flashcard-container">
                <div className="flashcard-empty">
                    <h2>No cards in this deck yet.</h2>
                    <p>Click "Add Card" to create one!</p>
                </div>
            </div>
        );
    }

    const currentCard = queue[0];

    // Difficulty Offsets
    const OFFSETS = {
        hard: 3,
        medium: 5,
        easy: 9
    };

    const handleRate = (e, difficulty) => {
        e.stopPropagation();

        // 1. Mark as reviewed if not already, and save rating
        if (onUpdateCard) {
            onUpdateCard(currentCard.id, { status: 'reviewed', lastRating: difficulty });
        }

        // 2. Calculate insertion index
        const offset = OFFSETS[difficulty];
        // If queue length is small, wrap or just go to end. 
        // Request: "If total ... less than 9, adjust ... accordingly"
        // Determining insert index: 
        // We want to insert 'offset' items AWAY from current position (0).
        // So target index in the REMAINING list (queue.slice(1)) is offset - 1?
        // Let's say length 5. Rate Hard (3). 
        // We want it to be the 4th card shown (after 3 others). 
        // Current head moves to index 3 (0-indexed).

        let insertIndex = offset;
        if (insertIndex >= queue.length) {
            insertIndex = queue.length - 1; // Put at very end if deck is small
        }

        setIsFlipped(false);

        setTimeout(() => {
            setQueue(prev => {
                const current = prev[0];
                const rest = prev.slice(1);

                // Insert current into rest at insertIndex
                // Note: insertIndex 3 means after 3 items. 
                // rest has (length-1) items.
                // If we want it after 3 items, we insert at index 3 of 'rest'.

                const newQueue = [...rest];
                // Clamp index to bounds of new array
                const target = Math.min(insertIndex, newQueue.length);

                newQueue.splice(target, 0, current);
                return newQueue;
            });
        }, 300);
    };

    return (
        <div className="flashcard-container">
            <div
                className="flashcard-wrapper"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
                    <div className="flashcard-front">
                        <div className="flashcard-content">
                            <h2 className="flashcard-text">{currentCard.question}</h2>
                        </div>
                    </div>
                    <div className="flashcard-back">
                        <div className="flashcard-content">
                            <h3 className="flashcard-question-faded">{currentCard.question}</h3>
                            <div className="flashcard-divider"></div>
                            <h2 className="flashcard-answer">{currentCard.answer}</h2>
                        </div>
                        <div className="flashcard-feedback">
                            <button className="btn-feedback hard" onClick={(e) => handleRate(e, 'hard')}>
                                <span>😓</span> Hard
                            </button>
                            <button className="btn-feedback medium" onClick={(e) => handleRate(e, 'medium')}>
                                <span>😐</span> Medium
                            </button>
                            <button className="btn-feedback easy" onClick={(e) => handleRate(e, 'easy')}>
                                <span>🙂</span> Easy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashCard;
