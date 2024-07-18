import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginForm from './views/signPages/LoginForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisForm from './views/signPages/RegisForm';
import ForgetForm from './views/signPages/ForgetForm';
import ResetPasswordForm from './views/signPages/ResetForm';
import HomeLayout from './views/HomeLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisForm />,
  },
  {
    path: "/forget",
    element: <ForgetForm />,
  },
  {
    path: "/reset",
    element: <ResetPasswordForm />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
