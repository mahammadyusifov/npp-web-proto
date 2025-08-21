import React, { useState } from 'react';
import Background from "./components/BayesianPage/background";
import Menu from "./components/BayesianPage/menu";
import { TABS } from "./constants/tabs"; 
import SelectionBar from './utilities/searchbar';
import SubmitButton from './utilities/bayesian_submit_button/submitButton'

const initializeState = () => {
  const initialState = {};
  TABS.forEach(tab => {
    tab.children.forEach(child => {
      const key = `${tab.label}/${child.label}`;
      initialState[key] = child.values[0];
    });
  });
  return initialState;
};

function BayesianPage() {

  const [activeLabel, setActiveLabel] = useState('Requirement Dev');
  const [dropdownValues, setDropdownValues] = useState(initializeState());

  const handleSelectionChange = (key, value) => {
    setDropdownValues(prevDropdownValues => ({
      ...prevDropdownValues,
      [key]: value,
    }));
  };

  const activeLabelAndDropdowns = TABS.find(tab => tab.label === activeLabel);

  return (
    <>
      <Background />

      <SelectionBar
        width="25%"
        height="6.4%"
        shape="sharp-rectangle"
        x="12.5%"
        y="9.6%"
        color="bg-gray-800"
        scale={0.7} 
      />

      <Menu
        activeLabel={activeLabel}
        setActiveLabel={setActiveLabel}
        dropdownValues={dropdownValues}
        handleSelectionChange={handleSelectionChange}
        activeLabelAndDropdowns={activeLabelAndDropdowns}
      />

      <SubmitButton
        dropdownValues={dropdownValues}
        x="87%"
        y="90%"
        width="8%"
        height="5%"
        shape="smooth"
        before_hover_color="bg-red-700"
        hover_color="hover:bg-blue-600"
        click_color="active:bg-green-500"
      />

    
    </>
  );
}

export default BayesianPage;
