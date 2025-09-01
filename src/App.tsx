import React from 'react';
import { Routes, Route } from 'react-router-dom';

import BayesianPage from './pages/BayesianPage/BayesianPage'; 
import StatisticalPage from "./pages/StatisticalPage/StatisticalPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";

import { AppSettings } from './hooks/app-settings';

function App() {
  const settingsProps = AppSettings();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<BayesianPage settings = {settingsProps}/>} />
        <Route path="/statistical" element={<StatisticalPage />} />
        <Route path="/settings" element={<SettingsPage {...settingsProps}/>} />
      </Routes>
    </>
  );
}

export default App;