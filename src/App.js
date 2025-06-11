import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpotlightLayout from './components/layout/SpotlightLayout';
import Homepage from './components/pages/Homepage';
import ThreeActs from './components/pages/ThreeActs';
import About from './components/pages/About';
import Newsletter from './components/pages/Newsletter';
import Resources from './components/pages/Resources';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <SpotlightLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/three-acts" element={<ThreeActs />} />
            <Route path="/about" element={<About />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </SpotlightLayout>
      </Router>
    </div>
  );
}

export default App;
