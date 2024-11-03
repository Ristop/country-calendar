import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/flag-icons.scss';
import './assets/css/common.scss';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
