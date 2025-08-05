import Button from "../../utilities/button";
import DropDown from "../../utilities/dropdown";
import { useState } from "react";
import { TABS } from "../../constants/tabs";

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

const Menu = () => {

  const labels = TABS.map(tab => tab.label);
  
  const labelSeparation = 5;

  const dropdownXSeparation = 15; // Increased separation for dropdowns
  const dropdownYSeparation = 18; // Increased separation for dropdowns
  
  const [activeLabel, setActiveLabel] = useState('A');

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
      {/* --- LABELS --- */}
      {labels.map((label, index) => (
        <Button
          key={label} // Adding key prop is important for lists
          text={label}
          active={activeLabel === label}
          onClick={() => setActiveLabel(label)}
          x={'2%'}
          y={`${15 + index * labelSeparation}%`}
          width={'20%'}
          height={'5%'}
          shape={'smooth'}
        />
      ))}

      {activeLabelAndDropdowns?.children.map(child => {
        const uniqueKey = `${activeLabelAndDropdowns.label}/${child.label}`;
        // The DropDown needs a unique key as well.
        return (
          <DropDown
            key={uniqueKey} 
            options={child.values}
            selectedOption={dropdownValues[uniqueKey] || child.values[0]}
            onSelect={(value) => handleSelectionChange(uniqueKey, value)}
            x={`${44 + (activeLabelAndDropdowns.children.indexOf(child) % 4) * dropdownXSeparation}%`} // Increased separation
            y={`${17 + Math.floor(activeLabelAndDropdowns.children.indexOf(child) / 4) * dropdownYSeparation}%`} // Increased separation
            width="15%"
            height="5%"
            textColor="text-gray-800"
          />
        );
      })}
    </>
  );
}

export default Menu;