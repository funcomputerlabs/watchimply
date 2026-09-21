import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { LibraryProvider } from './hooks/useLibrary.jsx';
import './styles/app.css';

document.documentElement.dataset.theme = 'dark';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <LibraryProvider>
        <App />
      </LibraryProvider>
    </HashRouter>
  </React.StrictMode>
);

