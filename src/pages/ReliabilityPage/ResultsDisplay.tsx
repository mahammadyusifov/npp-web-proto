import React from 'react';

interface ResultsDisplayProps {
  results: object;
  onReset: () => void; // Expects the onReset function from App.tsx
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset }) => {
  return (
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-2xl text-gray-800"
      style={{ width: '80%', maxWidth: '800px', height: '80%', display: 'flex', flexDirection: 'column' }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Simulation Results</h2>
      <pre 
        className="flex-grow bg-gray-100 p-4 rounded-md overflow-auto text-sm"
      >
        {JSON.stringify(results, null, 2)}
      </pre>
      <div className="mt-4 text-center">
        {/* The button now calls the onReset prop */}
        <button 
            onClick={onReset}
            className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-500 transition-colors no-underline"
        >
            Run New Simulation
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;