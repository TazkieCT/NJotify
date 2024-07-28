import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
// import LoginForm from './views/signPages/LoginForm'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import RegisForm from './views/signPages/RegisForm';
// import ForgetForm from './views/signPages/ForgetForm';
// import ResetPasswordForm from './views/signPages/ResetForm';
// import HomeLayout from './views/HomeLayout';
import AccountSettingPage from './views/accountPage/AccountSettingPage';
import AdminPage from './views/accountPage/AdminPage';
import LoginForm from './views/signPages/LoginForm';
import RegisForm from './views/signPages/RegisForm';
import ResetPasswordForm from './views/signPages/ResetForm';
import HomeLayout from './views/HomeLayout';
import Notification from './views/accountPage/Notification';
import GetVerified from './views/accountPage/GetVerified';
import EditProfile from './views/accountPage/EditProfile';
import HomePage from './views/page/HomePage';
import SearchPage from './views/page/SearchPage';
import YourPostPage from './views/page/YourPostPage';
import AlbumPage from './views/page/AlbumPage';
import PlaylistPage from './views/page/PlaylistPage';
import ShowMorePage from './views/page/ShowMorePage';
import ArtistPage from './views/page/ArtistPage';
import ProfilePage from './views/page/ProfilePage';
import TrackPage from './views/page/TrackPage';
import CreateMusicPage from './views/page/CreateMusicPage';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LoginForm />,
//   },
//   {
//     path: "/register",
//     element: <RegisForm />,
//   },
//   {
//     path: "/forget",
//     element: <ForgetForm />,
//   },
//   {
//     path: "/reset",
//     element: <ResetPasswordForm />,
//   },
//   {
//     path: "/home",
//     element: <HomeLayout />,
//   },
//   {
//     path: "/settings",
//     element: <AccountSettingPage />,
//   },
//   {
//     path: "/admin",
//     element: <AdminPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path="/login" element={<LoginForm/>}/>
              <Route path="/register" element={<RegisForm/>}/>
              <Route path="/reset" element={<ResetPasswordForm/>}/>
              <Route element={<HomeLayout/>}>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/home" element={<HomePage/>} />
                  <Route path="/showmore" element={<ShowMorePage/>}/>
                  <Route path="/artist" element={<ArtistPage/>} />
                  <Route path="/search" element={<SearchPage/>}/>
                  <Route path="/profile" element={<ProfilePage/>}/>
                  <Route path="/track" element={<TrackPage/>}/>
                  <Route path="/album/:albumId" element={<AlbumPage/>}/>
                  <Route path="/playlist" element={<PlaylistPage/>}/>
                  <Route path="/post" element={<YourPostPage/>}/>
                  <Route path="/create" element={<CreateMusicPage/>}/>
              </Route>
              <Route path="/settings" element={<AccountSettingPage/>}/>
              <Route path="/notification-settings" element={<Notification/>}/>
              <Route path="/verify-profile" element={<GetVerified/>}/>
              <Route path="/edit-profile" element={<EditProfile/>}/>
              <Route path="/admin" element={<AdminPage/>}/>
          </Routes>
      </Router>
  </React.StrictMode>,
);