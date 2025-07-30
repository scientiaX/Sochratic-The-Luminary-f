import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Impor komponen halaman yang berbeda
import IntroductionPage from './pages/introduction';
import LessonSelectionPage from './pages/selection';
import StudyPage from './pages/study';
import LoginRegisterPage from './pages/login';
import PremiumPage from './pages/premium';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* <Header /> Header yang mungkin ingin Anda tampilkan di semua halaman */}
      <Routes> {/* Container untuk semua definisi rute */}
        <Route path="/" element={<IntroductionPage />} /> {/* Jika URL adalah '/', tampilkan Home */}
        <Route path="/selection" element={<LessonSelectionPage />} />
        <Route path="/study/:topicId" element={<StudyPage />} />
        <Route path="/study" element={<Navigate to="/selection" replace />} />
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        {/* <Route path="/about" element={<AboutPage />} /> Jika URL adalah '/about', tampilkan AboutPage */}
        {/* <Route path="/contact" element={<ContactPage />} /> Jika URL adalah '/contact', tampilkan ContactPage */}
        {/* Anda bisa menambahkan rute lain di sini */}
      </Routes>
      {/* <Footer /> Footer yang mungkin ingin Anda tampilkan di semua halaman */}
    </Router>
  );
}

export default App;