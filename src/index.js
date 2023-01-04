import React from 'react';
import 'assets/App.scss';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();
