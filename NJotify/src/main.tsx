import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginForm from './views/SignPages/LoginForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisForm from './views/SignPages/RegisForm';
import ForgetForm from './views/SignPages/ForgetForm';
import ResetPasswordForm from './views/SignPages/ResetForm';
import HomeLayout from './views/HomeLayout';
import TrackPage from './components/page/TrackPage';

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
  {
    path: "/track",
    element: <TrackPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
