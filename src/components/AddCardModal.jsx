import React, { useState, useEffect } from 'react';

const AddCardModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    const [category, setCategory] = useState('history');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    // Load initial data if provided (for editing)
    useEffect(() => {
        if (initialData) {
            setCategory(initialData.category || 'history');
            setQuestion(initialData.question);
            setAnswer(initialData.answer);
        } else {
            // Reset to default for new add
            setCategory('history');
            setQuestion('');
            setAnswer('');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(category, question, answer);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{initialData ? 'Edit Card' : 'Add New Card'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="modal-input"
                            disabled={!!initialData} // Lock category when editing? Or allow moving? usually lock or pre-select.
                        >
                            <option value="history">History</option>
                            <option value="geography">Geography</option>
                            <option value="current_affairs">Current Affairs</option>
                            <option value="quick_math">Quick Math</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Question</label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="modal-input"
                            placeholder="Enter the question..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Answer</label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="modal-input"
                            placeholder="Enter the answer..."
                            rows="4"
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-save">{initialData ? 'Update Card' : 'Save Card'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCardModal;
