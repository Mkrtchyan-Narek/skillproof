import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CompetitionsPage from './pages/CompetitionsPage';
import CompetitionDetailPage from './pages/CompetitionDetailPage';
import ActiveCompetitionPage from './pages/ActiveCompetitionPage';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-[#E9E7F9]">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/competitions" element={<CompetitionsPage />} />
                <Route path="/competition/:id" element={<CompetitionDetailPage />} />
                <Route path="/competition/:id/active" element={<ActiveCompetitionPage />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
