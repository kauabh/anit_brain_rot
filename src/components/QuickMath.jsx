import React, { useState } from 'react';

const QuickMath = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleChange = (e) => {
        const val = e.target.value;
        setInput(val);
        try {
            // Safety check: only allow numbers and basic math operators
            if (/^[0-9+\-*/().\s]*$/.test(val)) {
                // eslint-disable-next-line
                const res = eval(val);
                setResult(Number.isInteger(res) ? res : res.toFixed(2));
            } else {
                setResult('Invalid chars');
            }
        } catch (err) {
            setResult('...');
        }
    };

    return (
        <div className="content-card">
            <h1 className="content-header">Quick Math</h1>
            <div className="content-body">
                <p>Type a mathematical expression below (e.g., 25 * 4 + 10).</p>
                <input
                    type="text"
                    className="math-input"
                    value={input}
                    onChange={handleChange}
                    placeholder="Calculate..."
                    autoFocus
                />
                <div className="math-result">
                    {input && `= ${result}`}
                </div>
            </div>
        </div>
    );
};

export default QuickMath;
