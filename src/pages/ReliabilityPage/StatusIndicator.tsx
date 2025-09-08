import React from 'react';

interface StatusIndicatorProps {
  jobId: string;
  jobStatus: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ jobId, jobStatus }) => {
  return (
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl text-white text-center"
      style={{ width: '400px' }}
    >
      <h2 className="text-2xl font-bold mb-4">Simulation Running</h2>
      <p className="text-lg">Job Status: 
        <span className="font-semibold text-sky-400 ml-2">{jobStatus}...</span>
      </p>
      <p className="text-xs text-gray-400 mt-4 break-all">Job ID: {jobId}</p>
    </div>
  );
};

export default StatusIndicator;