import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from '../Canvas';

// Verifies the Canvas component renders without throwing
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Canvas/>, div)
});