import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import ContextProvider from './context/Context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <Sidebar />
    <Main />
  </ContextProvider>
);
