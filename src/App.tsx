import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import BayesianPage from './pages/BayesianPage/BayesianPage';
import StatisticalPage from "./pages/StatisticalPage/StatisticalPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import ReliabilityPage from "./pages/ReliabilityPage/ReliabilityPage";

import { AppSettings } from './hooks/app-settings';
import * as apiService from './services/apiService'; // Assuming you have this file

function App() {
  const settingsProps = AppSettings();
  const navigate = useNavigate();
  const location = useLocation();

  // --- All job-related state is now managed here in the parent App component ---
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [results, setResults] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to start the simulation, will be passed to BayesianPage
  const handleStartSimulation = async (formData: object) => {
    setError(null);
    setResults(null);
    setJobStatus('Submitting...');
    try {
      const newJobId = await apiService.startSimulation(formData);
      setJobId(newJobId);
      // Navigate to the results page immediately after starting
      navigate(`/reliability-views/${newJobId}`);
    } catch (err) {
      setError(err.message);
      setJobStatus(null);
    }
  };

  // Effect for polling the job status
  useEffect(() => {
    if (!jobId || jobStatus === 'COMPLETED' || jobStatus === 'FAILED') {
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        const statusData = await apiService.getJobStatus(jobId);
        setJobStatus(statusData.jobStatus);
        if (statusData.jobStatus === 'FAILED') {
          setError('The simulation job failed.');
        }
      } catch (err) {
        setError('Failed to get job status.');
        setJobId(null); // Stop polling on error
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [jobId, jobStatus]);

  // Effect for fetching results when the job is complete
  useEffect(() => {
    if (jobStatus === 'COMPLETED' && jobId) {
      apiService.getResults(jobId)
        .then(setResults)
        .catch(() => setError('Failed to fetch final results.'));
    }
  }, [jobStatus, jobId]);
  
  // Effect to sync state if user lands directly on a results URL
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'reliability-views' && pathParts[2] && !jobId) {
      setJobId(pathParts[2]);
    }
  }, [location.pathname, jobId]);

  // Function to reset the state for a new simulation
  const handleReset = () => {
    setJobId(null);
    setJobStatus(null);
    setResults(null);
    setError(null);
    navigate('/'); // Navigate back to the home page
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <BayesianPage 
            settings={settingsProps} 
            onStartSimulation={handleStartSimulation} 
            jobError={error}
            isSubmitting={!!jobStatus && jobStatus === 'Submitting...'}
          />
        } 
      />
      <Route path="/statistical" element={<StatisticalPage />} />
      <Route path="/settings" element={<SettingsPage {...settingsProps}/>} />
      <Route 
        path="/reliability-views/:jobId?" 
        element={
          <ReliabilityPage 
            jobId={jobId}
            jobStatus={jobStatus}
            results={results}
            error={error}
            onReset={handleReset}
          />
        } 
      />
    </Routes>
  );
}

export default App;