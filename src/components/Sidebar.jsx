import React from 'react';
import { SECTIONS } from '../data/content';

const Sidebar = ({ activeTab, onTabChange, onAddCard, onBulkUpload }) => {
    return (
        <aside className="sidebar">
            <div className="logo">
                <span>⚡</span> BrainRot
            </div>

            <div className="sidebar-actions">
                <button className="add-card-btn" onClick={onAddCard}>
                    + Add Card
                </button>
                <button className="btn-upload" onClick={onBulkUpload} style={{ marginTop: '0.5rem' }}>
                    Bulk Upload
                </button>
            </div>

            <nav>
                <ul className="nav-list">
                    {/* ... (rest of the nav is fine, just removing the bottom control) */}
                    {['history', 'geography', 'current_affairs', 'quick_math'].map(tab => (
                        <li
                            key={tab}
                            className={`nav-pill ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => onTabChange(tab)}
                        >
                            {tab.replace('_', ' ').charAt(0).toUpperCase() + tab.replace('_', ' ').slice(1)}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
