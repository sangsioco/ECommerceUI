import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Import the App component
import './AppStyles.css';  // Import global styles (optional)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')  // The root element where the app will be rendered
);
