import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HazardMap from './pages/HazardMap';
import ReportHazard from './pages/ReportHazard';
import IoTDashboard from './pages/IoTDashboard';
import EmergencyAlerts from './pages/EmergencyAlerts';
import Community from './pages/Community';
import Education from './pages/Education';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
            <Header />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<HazardMap />} />
                <Route path="/report" element={<ReportHazard />} />
                <Route path="/iot" element={<IoTDashboard />} />
                <Route path="/alerts" element={<EmergencyAlerts />} />
                <Route path="/community" element={<Community />} />
                <Route path="/education" element={<Education />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;