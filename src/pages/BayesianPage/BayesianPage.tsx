import React, { useState } from 'react';
import Background from './background';
import Menu from './menu';
import { TABS } from '../../constants/tabs';
import SelectionBar from '../../utilities/searchbar';
import SubmitButton from './bayesian_submit_button/submitButton';

// Helper to create the initial dropdown state
const initializeState = () => {
  const initialState = {};
  TABS.forEach(tab => {
    tab.children.forEach(child => {
      const key = `${tab.label}/${child.label}`;
      initialState[key] = child.values[1]; // Default to Medium
    });
  });
  return initialState;
};

// This component now receives props from App.tsx
function BayesianPage({ settings, onStartSimulation, isSubmitting, jobError }) {
  const [activeLabel, setActiveLabel] = useState('Requirement Dev');
  const [dropdownValues, setDropdownValues] = useState(initializeState());

  const handleSelectionChange = (key, value) => {
    setDropdownValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const payload = formatPayload(dropdownValues, settings);
    onStartSimulation(payload);
  };

  const activeLabelAndDropdowns = TABS.find(tab => tab.label === activeLabel);

  return (
    <>
      <Background />
      {jobError && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 p-4 bg-red-100 text-red-800 rounded-md">
              Error: {jobError}
          </div>
      )}
      <SelectionBar
        width="25%" height="6.4%" shape="sharp-rectangle" x="12.5%" y="9.6%" color="bg-gray-800" scale={0.7} 
      />
      <Menu
        activeLabel={activeLabel}
        setActiveLabel={setActiveLabel}
        dropdownValues={dropdownValues}
        handleSelectionChange={handleSelectionChange}
        activeLabelAndDropdowns={activeLabelAndDropdowns}
      />
      <SubmitButton
        onClick={handleSubmit}
        isSubmitting={isSubmitting}
        x="87%" y="90%" width="8%" height="5%"
      />
    </>
  );
}

// This helper function formats the data before sending it up
const formatPayload = (values, settings) => {
  const payload = {};
  for (const key in values) {
    const [tabLabel, childLabel] = key.split('/');
    if (!payload[tabLabel]) {
      payload[tabLabel] = {};
    }
    payload[tabLabel][childLabel] = values[key];
  }
  payload['FP'] = { 'FP Input': '120' }; // This is still hardcoded
  payload['settings'] = {
    nChains: String(settings.nChains),
    nIter: String(settings.nIter),
    nBurnin: String(settings.nBurnin),
    nThin: String(settings.nThin),
    computeDIC: String(settings.computeDIC),
    workingDir: settings.workingDir,
  };
  return payload;
};

export default BayesianPage;