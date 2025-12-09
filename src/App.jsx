import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import AddCardModal from './components/AddCardModal';
import BulkUploadModal from './components/BulkUploadModal';
import { scienceQuestions } from './data/scienceData';
import './index.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  // Generate simple single-digit addition cards
  const generateMathCards = () => {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 10);
      const b = Math.floor(Math.random() * 10);
      cards.push({
        id: `qm_${i}`,
        question: `${a} + ${b} = ?`,
        answer: `${a + b}`,
        status: 'new'
      });
    }
    return cards;
  };

  const defaultDecks = {
    history: [
      { id: 'h1', question: "Who was the first President of the USA?", answer: "George Washington", status: 'new' },
      { id: 'h2', question: "In which year did World War II end?", answer: "1945", status: 'new' },
      { id: 'h3', question: "What is the capital of France?", answer: "Paris", status: 'new' },
      { id: 'h4', question: "Who wrote Romeo and Juliet?", answer: "Shakespeare", status: 'new' }
    ],
    geography: scienceQuestions,
    current_affairs: [],
    science: scienceQuestions,
    quick_math: generateMathCards()
  };

  const [decks, setDecks] = useState(() => {
    try {
      const saved = localStorage.getItem('brainRotDecks');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge defaults so new keys (like quick_math) appear if missing in saved
        return { ...defaultDecks, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load decks", e);
    }
    return defaultDecks;
  });

  useEffect(() => {
    try {
      localStorage.setItem('brainRotDecks', JSON.stringify(decks));
    } catch (e) {
      console.error("Failed to save decks", e);
    }
  }, [decks]);

  const handleAddCard = (category, question, answer) => {
    const newCard = {
      id: Date.now(), // simple ID
      question,
      answer,
      status: 'new'
    };

    setDecks(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), newCard]
    }));
  };

  const handleBulkAdd = (category, newCardsArray) => {
    const timestamp = Date.now();
    const processedCards = newCardsArray.map((card, index) => ({
      id: `${timestamp}_${index}`,
      question: card.question,
      answer: card.answer,
      status: 'new'
    }));

    setDecks(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), ...processedCards]
    }));
  };

  const handleUpdateCard = (category, cardId, updatedCard) => {
    setDecks(prev => ({
      ...prev,
      [category]: prev[category].map(card =>
        card.id === cardId ? { ...card, ...updatedCard } : card
      )
    }));
  };

  const handleDeleteCard = (category, cardId) => {
    setDecks(prev => ({
      ...prev,
      [category]: prev[category].filter(card => card.id !== cardId)
    }));
  };

  return (
    <div className="app-container">
      {/* Mobile Hamburger Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open Menu"
      >
        ☰
      </button>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false); // Close on selection
        }}
        onAddCard={() => {
          setIsModalOpen(true);
          setIsSidebarOpen(false);
        }}
        onBulkUpload={() => {
          setIsBulkModalOpen(true);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="content-area">
        {/* Pass the specific deck for the active tab */}
        <Content
          activeTab={activeTab}
          cards={decks[activeTab] || []}
          onUpdateCard={handleUpdateCard}
          onDeleteCard={handleDeleteCard}
        />
      </div>

      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCard}
      />

      <BulkUploadModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onSave={handleBulkAdd}
      />
    </div>
  );
};

export default App;
