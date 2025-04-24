import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ContactPage from './pages/ContactPage';
import OffersPage from './pages/OffersPage';
import AboutPage from './pages/AboutPage';
import DestinationsPage from './pages/DestinationsPage';
import ProfilePage from './pages/ProfilePage';
import FlightSearchPage from './pages/FlightSearchPage';
import ProtectedRoute from './components/ProtectedRoute';

import './styles/main.css';
import './styles/animations.css';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth" element={!authUser ?  <AuthPage /> : <Navigate to="/" />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/auth" />} />
        <Route path="/flight" element={authUser ? <FlightSearchPage /> : <Navigate to="/auth" />} />
      </Routes>


      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: 'red',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  );
};

export default App;
