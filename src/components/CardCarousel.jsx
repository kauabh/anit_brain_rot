import React, { useState, useRef, useEffect } from 'react';

const CardCarousel = ({ cards, onEdit, onDelete }) => {
    const listRef = useRef(null);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        if (cards.length > 0 && !activeId) {
            setActiveId(cards[0].id);
        }
    }, [cards, activeId]);

    // Scroll active card into view on mount or when activeId changes (initially)
    // Scroll active card into view ONLY on initial mount/data load
    const initialScrollDone = useRef(false);

    useEffect(() => {
        if (activeId && listRef.current && !initialScrollDone.current) {
            const activeEl = listRef.current.querySelector(`[data-id='${activeId}']`);
            if (activeEl) {
                activeEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
                initialScrollDone.current = true;
            }
        }
    }, [activeId, cards]); // Run when cards load/activeId is set initially

    // Use scroll handler for active detection (Math based is more reliable for free-scroll)
    const handleScroll = () => {
        if (!listRef.current) return;

        const container = listRef.current;
        const containerCenter = container.getBoundingClientRect().top + container.clientHeight / 2;

        const children = Array.from(container.children);
        let closest = null;
        let minDist = Infinity;

        children.forEach(child => {
            if (!child.classList.contains('carousel-item')) return;

            const rect = child.getBoundingClientRect();
            // Removed aggressive visibility check to ensure we always find a closest card
            // if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            const childCenter = rect.top + rect.height / 2;
            const dist = Math.abs(childCenter - containerCenter);

            if (dist < minDist) {
                minDist = dist;
                closest = child;
            }
        });

        if (closest) {
            const id = closest.dataset.id;
            // Ensure we compare types correctly (string vs number)
            // AND ensure we don't trigger re-renders if it hasn't changed
            if (id && String(id) !== String(activeId)) {
                setActiveId(Number(id) || id);
            }
        }
    };

    if (!cards || cards.length === 0) {
        return <div className="carousel-empty">No cards to display.</div>;
    }

    return (
        <div className="carousel-container" ref={listRef} onScroll={handleScroll}>
            <div className="carousel-spacer"></div>
            {cards.map(card => {
                const isActive = activeId == card.id;
                return (
                    <div
                        key={card.id}
                        className={`carousel-item ${isActive ? 'active' : ''}`}
                        data-id={card.id}
                        style={{ opacity: isActive ? 1 : 0.5, transform: isActive ? 'scale(1)' : 'scale(0.95)' }}
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
                );
            })}
            <div className="carousel-spacer"></div>
        </div>
    );
};

export default CardCarousel;
