import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './pages/register/Index';
import Home from './pages/home/Index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Register />
    },
    {
        path: '/home',
        element: <Home />
    }
]);

root.render(
    <RouterProvider router={router} />
);