import React, { useState } from 'react';

const BulkUploadModal = ({ isOpen, onClose, onSave }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [category, setCategory] = useState('history');
    const [error, setError] = useState(null);

    const handleSave = () => {
        try {
            const parsed = JSON.parse(jsonInput);

            if (!Array.isArray(parsed)) {
                throw new Error("Input must be a JSON Array [...]");
            }

            // Basic Validation
            const valid = parsed.every(item => item.question && item.answer);
            if (!valid) {
                throw new Error("Every item must have a 'question' and 'answer' field.");
            }

            onSave(category, parsed);
            setJsonInput('');
            setError(null);
            onClose();
        } catch (e) {
            setError(e.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content bulk-modal">
                <h2 className="modal-title">Bulk Upload Cards</h2>

                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label>Target Category</label>
                    <select
                        className="modal-input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="history">History</option>
                        <option value="geography">Geography</option>
                        <option value="current_affairs">Current Affairs</option>
                        <option value="quick_math">Quick Math</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Paste JSON Here</label>
                    <div className="hint-text">
                        Format: [{"{"}"question": "...", "answer": "..."{"}"}, ...]
                    </div>
                    <textarea
                        className="modal-input bulk-textarea"
                        rows="10"
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder='[{"question": "Q1", "answer": "A1"}]'
                    />
                </div>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-save" onClick={handleSave}>Import Cards</button>
                </div>
            </div>
        </div>
    );
};

export default BulkUploadModal;
