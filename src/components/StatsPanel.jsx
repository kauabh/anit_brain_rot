import React from 'react';

const StatsPanel = ({ cards = [] }) => {
    // Calculate stats
    const total = cards.length;
    // Unreviewed: cards with no status or 'new'
    const unreviewed = cards.filter(c => !c.status || c.status === 'new').length;

    // Reviewed counts based on lastRating
    const hard = cards.filter(c => c.lastRating === 'hard').length;
    const medium = cards.filter(c => c.lastRating === 'medium').length;
    const easy = cards.filter(c => c.lastRating === 'easy').length;

    return (
        <div className="stats-panel">
            <h3 className="stats-title">Session Stats</h3>

            <div className="stat-row">
                <span className="stat-label">Total Cards</span>
                <span className="stat-value">{total}</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-row">
                <span className="stat-label">Unreviewed</span>
                <span className="stat-value">{unreviewed}</span>
            </div>

            <div className="stat-row">
                <span className="stat-label success">Easy 🙂</span>
                <span className="stat-value success">{easy}</span>
            </div>
            <div className="stat-row">
                <span className="stat-label warning">Medium 😐</span>
                <span className="stat-value warning">{medium}</span>
            </div>
            <div className="stat-row">
                <span className="stat-label danger">Hard 😓</span>
                <span className="stat-value danger">{hard}</span>
            </div>
        </div>
    );
};

export default StatsPanel;
