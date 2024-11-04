// Main entry file for rendering the root React component

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const rootElement = document.getElementById('root');

// Render App with StrictMode to highlight potential issues in development
createRoot(rootElement!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
