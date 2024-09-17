import React, { useState,useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import NotFound from '../pages/NotFoundPage';
import OrganizePage from '../pages/OrganizePage';
import ProfilePage from '../pages/ProfilePage';
import EventsPage from '../pages/EventsPage';
import EventDetailPage from '../pages/EventDetailPages';
import DashboardPage from '../pages/DashboardPage';
import { useDispatch, useSelector } from 'react-redux';
import { checkTokenExpiry } from '../service/features/authSlice';

export default function MainRouter() {
  const { user,token } = useSelector((state) => state.auth);
  const location = useLocation();  // Use useLocation to get current path
  const dispatch = useDispatch();
  useState({})
 
  useEffect(() => {
    if (token) {
      dispatch(checkTokenExpiry()); // Check if the token is expired
    }
  }, [token, dispatch]);

  // Check if the current path is dashboard
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Only show Navbar and Footer if it's NOT the dashboard page */}
        {!isDashboardPage && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/organize-event" element={user ? <OrganizePage /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="/event" element={<EventsPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Only show Footer if it's NOT the dashboard page */}
        {!isDashboardPage && <Footer />}
      </div>
    </>
  );
}
