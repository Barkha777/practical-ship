import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SubjectPage from './pages/SubjectPage';
import PracticalDetailsPage from './pages/PracticalDetailsPage';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
          <div>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/subject/:subjectId" element={<SubjectPage />} />
                <Route path="/subject/:subjectId/practical/:practicalId" element={<PracticalDetailsPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
