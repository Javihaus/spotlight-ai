import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Homepage from './components/pages/Homepage';
import ThreeActs from './components/pages/ThreeActs';
import Newsletter from './components/pages/Newsletter';
import Resources from './components/pages/Resources';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="three-acts" element={<ThreeActs />} />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="resources" element={<Resources />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
