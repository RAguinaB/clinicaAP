import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import './index.css'; // Dejamos para css puro para no sobrecargar el codigo
import Index from './pages/Index'; // Importa el archivo app.jsx

Modal.setAppElement('#root'); // No se porq, pero no me gusta ver un error/warning


const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);