import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';

// Impor komponen halaman yang berbeda
import IntroductionPage from './pages/introduction';
import LessonSelectionPage from './pages/selection';
import TopicsPage from './pages/topics';
import StudyPage from './pages/study';
import LoginRegisterPage from './pages/login';
import PremiumPage from './pages/pricing';
import ProfilePage from './pages/profile';
import EditProfilePage from './pages/edit-profile';
import CompletionStage from './components/study/CompletionStage';
import CheckoutSuccessPage from './pages/checkout-success';
import CheckoutCancelPage from './pages/checkout-cancel';

// Wrapper component untuk CompletionStage
function CompletionWrapper() {
  const { courseId, topicId } = useParams();
  return <CompletionStage topicId={topicId || "1"} />;
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* <Header /> Header yang mungkin ingin Anda tampilkan di semua halaman */}
      <Routes> {/* Container untuk semua definisi rute */}
        <Route path="/" element={<IntroductionPage />} /> {/* Jika URL adalah '/', tampilkan Home */}
        <Route path="/selection" element={<LessonSelectionPage />} />
        <Route path="/topics/:courseId" element={<TopicsPage />} />
        <Route path="/study/:courseId/:topicId" element={<StudyPage />} />
        <Route path="/study" element={<Navigate to="/selection" replace />} />
        <Route path="/completion/:courseId/:topicId" element={<CompletionWrapper />} />
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
        {/* <Route path="/about" element={<AboutPage />} /> Jika URL adalah '/about', tampilkan AboutPage */}
        {/* <Route path="/contact" element={<ContactPage />} /> Jika URL adalah '/contact', tampilkan ContactPage */}
        {/* Anda bisa menambahkan rute lain di sini */}
      </Routes>
      {/* <Footer /> Footer yang mungkin ingin Anda tampilkan di semua halaman */}
    </Router>
  );
}

export default App;