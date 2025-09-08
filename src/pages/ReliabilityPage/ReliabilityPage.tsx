import React from 'react';
import Background from "../BayesianPage/background";
import StatusIndicator from './StatusIndicator';
import ResultsDisplay from './ResultsDisplay';

// This component is now very simple. It just receives props and displays them.
function ReliabilityPage({ jobId, jobStatus, results, error, onReset }) {
  const isLoading = !!jobId && jobStatus !== 'COMPLETED' && jobStatus !== 'FAILED';

  // Display if user navigates here directly without a job running
  if (!jobId) {
    return (
        <>
            <Background />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
                <h2 className="text-2xl">No Simulation Job Specified</h2>
                <p>Please start a new simulation from the Bayesian Methods page.</p>
            </div>
        </>
    );
  }

  return (
    <>
      <Background />
      {results && <ResultsDisplay results={results} onReset={onReset} />}
      {isLoading && <StatusIndicator jobId={jobId} jobStatus={jobStatus!} />}
      {error && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-red-100 border border-red-400 rounded-lg text-red-800 text-center">
            <h3 className="font-bold">An Error Occurred</h3>
            <p>{error}</p>
        </div>
      )}
    </>
  );
}

export default ReliabilityPage;