import React from 'react';
import Button from "../../utilities/button";
import DropDown from "../../utilities/dropdown";
import { TABS } from "../../constants/tabs"; 

// The component now accepts all the data and functions it needs as props.
const Menu = ({
  activeLabel,
  setActiveLabel,
  dropdownValues,
  handleSelectionChange,
  activeLabelAndDropdowns
}) => {
  const labels = TABS.map(tab => tab.label);
  const labelSeparation = 5;
  const dropdownXSeparation = 17;
  const dropdownYSeparation = 25;

  // All useState hooks and handler functions have been removed.
  // It now relies entirely on the props passed from BayesianPage.

  return (
    <>
      {labels.map((label, index) => (
        <Button
          key={label}
          text={label}
          active={activeLabel === label}
          onClick={() => setActiveLabel(label)}
          x={'2%'}
          y={`${23 + index * labelSeparation}%`}
          width={'20%'}
          height={'5%'}
          shape={'smooth'}
        />
      ))}

      {activeLabelAndDropdowns?.children.map(child => {
        const uniqueKey = `${activeLabelAndDropdowns.label}/${child.label}`;
        return (
          <DropDown
            key={uniqueKey}
            label={child.label}
            label_color="text-gray-800"
            options={child.values}
            selectedOption={dropdownValues[uniqueKey] || child.values[0]}
            onSelect={(value) => handleSelectionChange(uniqueKey, value)}
            x={`${40 + (activeLabelAndDropdowns.children.indexOf(child) % 4) * dropdownXSeparation}%`}
            y={`${25 + Math.floor(activeLabelAndDropdowns.children.indexOf(child) / 4) * dropdownYSeparation}%`}
            width="15%"
            height="15%"
            textColor="text-gray-800"
          />
        );
      })}
    </>
  );
}

export default Menu;
