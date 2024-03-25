import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { SidebarContextProvider } from './context/SideBarContext';
import { AppContextProvider } from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppContextProvider>
        <SidebarContextProvider>
        <App />
        </SidebarContextProvider>
      </AppContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);