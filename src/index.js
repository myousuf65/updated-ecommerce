import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import routes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <RouterProvider router={routes}>
  </RouterProvider>

);

reportWebVitals();
