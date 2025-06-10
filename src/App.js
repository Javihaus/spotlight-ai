import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfessionalLayout from './components/layout/ProfessionalLayout';
import Homepage from './components/pages/Homepage';
import ThreeActs from './components/pages/ThreeActs';
import Newsletter from './components/pages/Newsletter';
import Resources from './components/pages/Resources';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <ProfessionalLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/three-acts" element={<ThreeActs />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </ProfessionalLayout>
      </Router>
    </div>
  );
}

export default App;
