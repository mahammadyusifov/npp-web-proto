import React, { useState, useEffect, useRef } from 'react';
import Button from './button'; // Assuming the Button component is in a sibling file

/**
 * A dropdown component that can be positioned and sized precisely.
 * @param {string[]} options - The array of selectable string options.
 * @param {string} selectedOption - The currently selected option.
 * @param {function} onSelect - The callback function to execute when an option is selected.
 * @param {string|number} x - The x-coordinate for the component's center.
 * @param {string|number} y - The y-coordinate for the component's center.
 * @param {string|number} width - The width of the component.
 * @param {string|number} height - The height of the component.
 */
const DropDown = ({
  options,
  selectedOption,
  onSelect,
  x,
  y,
  width,
  height
}) => {
  // State to manage whether the dropdown list is visible
  const [isOpen, setIsOpen] = useState(false);

  // Ref to the dropdown's main container to detect outside clicks
  const dropdownRef = useRef(null);

  // Effect to close the dropdown when clicking outside of it
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

  // Handles an item selection from the list
  const handleSelect = (option) => {
    onSelect(option); // Notify parent component
    setIsOpen(false); // Close the dropdown
  };

  // --- Style for Positioning ---
  // This object positions the container's center at (x, y) and sets its dimensions.
  const containerStyle = {
    position: 'absolute',
    top: y,
    left: x,
    width: width,
    height: height,
    // This transform makes (x, y) the center point, not the top-left corner.
    transform: 'translate(-50%, -50%)',
  };

  return (
    // This container div establishes the position, size, and coordinate system.
    // The 'relative' class is crucial for positioning the child elements.
    <div style={containerStyle} className="relative" ref={dropdownRef}>

      {/*
        The Button is positioned to fill this container perfectly. Since the
        Button component *always* uses absolute positioning, we set its
        x/y to '0' and its size to '100%'.
      */}
      <Button
        text={selectedOption}
        onClick={() => setIsOpen(prev => !prev)}
        x="0"
        y="0"
        width="100%"
        height="100%"
        customClasses="justify-between px-4"
        active={isOpen}
      />

      {/* The list of options, which appears below the button when open */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10">
          {options.map(option => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-3 text-gray-700 hover:bg-sky-100 cursor-pointer transition-colors duration-150"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;