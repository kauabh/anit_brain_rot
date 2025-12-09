import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import CardCarousel from './CardCarousel';
import StatsPanel from './StatsPanel';
import AddCardModal from './AddCardModal';

const CONTENT_DATA = {
    history: { title: "History" },
    geography: { title: "Geography" },
    current_affairs: { title: "Current Affairs" },
    quick_math: { title: "Quick Math" }
};

const Content = ({ activeTab, cards, onUpdateCard, onDeleteCard }) => {
    const [viewMode, setViewMode] = useState('flashcard'); // 'flashcard' or 'list'
    const [editingCard, setEditingCard] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Reset view mode when switching tabs
    useEffect(() => {
        setViewMode('flashcard');
    }, [activeTab]);

    // Simplified Content component: Quick Math now uses standard cards
    // if (activeTab === 'quick_math') { ... } removed to use standard FlashCard view


    const handleEditClick = (card) => {
        setEditingCard(card);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (category, question, answer) => {
        // category ignored for update within same tab usually, but we pass it
        // We know activeTab is the category
        if (editingCard) {
            onUpdateCard(activeTab, editingCard.id, { question, answer });
        }
    };

    return (
        <div className="content-card full-mode">
            <div className="content-controls">
                <button
                    className="view-toggle-btn"
                    disabled={!cards || cards.length === 0}
                    onClick={() => setViewMode(viewMode === 'flashcard' ? 'list' : 'flashcard')}
                >
                    {viewMode === 'flashcard' ? 'View All Cards' : 'Back to Flashcard'}
                </button>
            </div>

            {viewMode === 'flashcard' ? (
                <FlashCard
                    cards={cards}
                    category={activeTab}
                    onUpdateCard={(cardId, data) => onUpdateCard(activeTab, cardId, data)}
                />
            ) : (
                <div className="view-all-layout">
                    <CardCarousel
                        cards={cards}
                        onEdit={handleEditClick}
                        onDelete={(id) => onDeleteCard(activeTab, id)}
                    />
                    <StatsPanel cards={cards} />
                </div>
            )}

            <AddCardModal
                isOpen={isEditModalOpen}
                onClose={() => { setIsEditModalOpen(false); setEditingCard(null); }}
                onSave={handleSaveEdit}
                initialData={editingCard}
            />
        </div>
    );
};

export default Content;
