import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './views/page/HomePage';
import ShowMorePage from './views/page/ShowMorePage';
import ArtistPage from './views/page/ArtistPage';
import SearchPage from './views/page/SearchPage';
import ResultSearchPage from './views/page/ResultSearchPage';
import ProfilePage from './views/page/ProfilePage';
import TrackPage from './views/page/TrackPage';
import AlbumPage from './views/page/AlbumPage';
import PlaylistPage from './views/page/PlaylistPage';
import AccountSettingPage from './views/accountPage/AccountSettingPage';
import AdminPage from './views/accountPage/AdminPage';
import LoginForm from './views/signPages/LoginForm';
import RegisForm from './views/signPages/RegisForm';
import ResetPasswordForm from './views/signPages/ResetForm';
import ForgetForm from './views/signPages/ForgetForm';
import Activation from './views/signPages/Activation';
import Notification from './views/accountPage/Notification';
import GetVerified from './views/accountPage/GetVerified';
import EditProfile from './views/accountPage/EditProfile';
import CreateMusicPage from './views/page/CreateMusicPage';
import PrivateRoute from './PrivateRoute';
import YourPostPage from './views/page/YourPostPage';
import HomeLayout from './views/HomeLayout';
import ArtistPredictor from './views/page/LyricPredict';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisForm />} />
        <Route path="/forgot" element={<ForgetForm />} />
        <Route path="/predict" element={<ArtistPredictor />} />
        <Route path="/activate/:tokenId" element={<Activation />} />
        <Route path="/reset/:tokenId" element={<ResetPasswordForm />} />
        <Route element={<HomeLayout />}>
          <Route path="/" element={<PrivateRoute element={<HomePage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/home" element={<PrivateRoute element={<HomePage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/showmore" element={<PrivateRoute element={<ShowMorePage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/artist/:artistId" element={<PrivateRoute element={<ArtistPage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/search" element={<PrivateRoute element={<SearchPage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/result" element={<PrivateRoute element={<ResultSearchPage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/track/:trackId" element={<PrivateRoute element={<TrackPage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/album/:albumId" element={<PrivateRoute element={<AlbumPage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/playlist/:playlistId" element={<PrivateRoute element={<PlaylistPage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/post" element={<PrivateRoute element={<YourPostPage />} requiredRoles={['artist']} />} />
          <Route path="/create" element={<PrivateRoute element={<CreateMusicPage />} requiredRoles={['artist']} />} />
          <Route path="/settings" element={<PrivateRoute element={<AccountSettingPage />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/notification-settings" element={<PrivateRoute element={<Notification />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/verify-profile" element={<PrivateRoute element={<GetVerified />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/edit-profile" element={<PrivateRoute element={<EditProfile />} requiredRoles={['listener', 'artist']} />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminPage />} requiredRoles={['admin']} />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
