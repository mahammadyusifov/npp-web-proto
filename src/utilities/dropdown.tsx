import React, { useState, useEffect, useRef } from 'react';
import Button from './button'; // Assuming your Button component is in the same folder

const DropDown = ({
  options,
  selectedOption,
  onSelect,
  x,
  y,
  width,
  height,
  textColor = 'text-white',

  label, // The text for the label above the dropdown
  label_color = 'text-gray-700', // Default label color
  alignment = 'center', // Default alignment: 'left', 'right', or 'center'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- HELPER VARIABLES FOR ALIGNMENT ---
  // Translate alignment prop to Tailwind CSS classes
  const textAlignClass = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  }[alignment];

  const justifyContentClass = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
  }[alignment];


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  // The container now holds both the label and the dropdown itself
  const containerStyle = {
    position: 'absolute',
    top: y,
    left: x,
    width: width,
    transform: 'translate(-50%, -50%)',
    // Use flexbox to stack the label and dropdown vertically
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem', // Adds a small space between the label and the button
  };

  return (
    <div style={containerStyle} ref={dropdownRef}>
      {/* --- LABEL IMPLEMENTATION --- */}
      {/* The label is only rendered if the 'label' prop is provided */}
      {label && (
        <label className={`block text-sm font-medium ${label_color} ${textAlignClass}`}>
          {label}
        </label>
      )}

      {/* The relative container for the button and dropdown list */}
      <div className="relative" style={{ width: '100%', height: height }}>
        <Button
          text={selectedOption}
          onClick={() => setIsOpen(prev => !prev)}
          x="0"
          y="0"
          width="100%"
          height="100%"
          // --- ALIGNMENT FOR BUTTON ---
          // Replaced 'justify-between' with our dynamic alignment class
          customClasses={`px-4 ${justifyContentClass}`}
          active={isOpen}
          textColor={textColor}
        />

        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10">
            {options.map(option => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                // Use flexbox to vertically center the text
                style={{ height: height, display: 'flex', alignItems: 'center' }}
                // --- ALIGNMENT FOR LIST ITEMS ---
                // Added our dynamic text alignment class here as well
                className={`px-4 text-gray-700 hover:bg-sky-100 cursor-pointer transition-colors duration-150 ${textAlignClass}`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;