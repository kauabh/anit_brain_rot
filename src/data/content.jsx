
import React from 'react';

export const SECTIONS = [
    { id: 'history', label: 'History', icon: '📜' },
    { id: 'geography', label: 'Geography', icon: '🌍' },
    { id: 'current-affairs', label: 'Current Affairs', icon: '📰' },
    { id: 'quick-math', label: 'Quick Math', icon: '🧮' },
];

export const CONTENT_DATA = {
    history: {
        title: "Echoes of the Past",
        body: (
            <>
                <p>History isn't just about dates and dead people; it's the rolling narrative of our species. From the first controlled fire to the digital revolution, every moment has shaped the reality we inhabit today.</p>
                <div className="stat-card">
                    <h3>Did you know?</h3>
                    <p style={{ marginTop: '0.5rem' }}>The Great Pyramid of Giza was originally covered in highly polished white limestone casing stones. It would have shone like a brilliant jewel in the sun.</p>
                </div>
            </>
        )
    },
    geography: {
        title: "Our Blue Marble",
        body: (
            <>
                <p>Geography explores the physical properties of Earth and the human societies spread across it. It bridges the gap between the social sciences and the physical sciences.</p>
                <p>From the depths of the Mariana Trench to the peaks of the Himalayas, our planet offers a diverse array of environments that challenge and sustain life.</p>
            </>
        )
    },
    'current-affairs': {
        title: "The World Today",
        body: (
            <>
                <p>Staying informed is more critical than ever in our hyper-connected world. Global markets, shifting geopolitical alliances, and technological breakthroughs are rewriting the rules of engagement daily.</p>
                <p>Key focus areas for 2024-2025 include Artificial Intelligence regulation, renewable energy transitions, and space exploration milestones.</p>
            </>
        )
    }
};
