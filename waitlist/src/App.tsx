import { BrowserRouter, Route, Routes } from "react-router-dom";
import IntroductionPage from "@/pages/IntroductionPage";

const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
    <h1 className="text-3xl font-bold">{title}</h1>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/login" element={<Placeholder title="Login" />} />
        <Route path="/pricing" element={<Placeholder title="Pricing" />} />
      </Routes>
    </BrowserRouter>
  );
}
