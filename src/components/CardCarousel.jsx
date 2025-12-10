import React, { useRef } from 'react';

const CardCarousel = ({ cards, onEdit, onDelete }) => {
    const listRef = useRef(null);

    if (!cards || cards.length === 0) {
        return <div className="carousel-empty">No cards to display.</div>;
    }

    return (
        <div
            className="carousel-container"
            ref={listRef}
        >
            <div className="carousel-spacer"></div>
            {cards.map(card => (
                <div
                    key={card.id}
                    className="carousel-item"
                    data-id={card.id}
                >
                    <div className="carousel-card-content">
                        <h3 className="flashcard-question-faded">{card.question}</h3>
                        <div className="flashcard-divider"></div>
                        <h2 className="flashcard-answer">{card.answer}</h2>
                        {card.lastRating && (
                            <div className={`rating-badge ${card.lastRating}`}>
                                {card.lastRating === 'hard' && '😓 Hard'}
                                {card.lastRating === 'medium' && '😐 Medium'}
                                {card.lastRating === 'easy' && '🙂 Easy'}
                            </div>
                        )}
                    </div>

                    <div className="carousel-actions">
                        <button className="btn-edit" onClick={() => onEdit(card)}>Edit</button>
                        <button className="btn-delete" onClick={() => onDelete(card.id)}>Delete</button>
                    </div>
                </div>
            ))}
            <div className="carousel-spacer"></div>
        </div>
    );
};

export default CardCarousel;
