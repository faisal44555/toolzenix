import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/App';
import { appRoutesConfig } from '@/config/routes.jsx';
import '@/index.css';

const router = createBrowserRouter([
  {
    element: <App />,
    children: appRoutesConfig,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);