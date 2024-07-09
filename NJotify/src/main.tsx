import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginForm from './views/LoginForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisForm from './views/RegisForm';
import ForgetForm from './views/ForgetForm';
import ResetPasswordForm from './views/ResetForm';

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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
