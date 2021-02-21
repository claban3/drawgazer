import React from 'react';
import ReactDOM from 'react-dom';
import Draw from '../Draw';

// Verifies the Draw view renders without throwing
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Draw/>, div)
});