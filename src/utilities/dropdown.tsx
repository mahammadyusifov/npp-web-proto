import React, { useState, useEffect, useRef } from 'react';
import Button from './button';

const DropDown = ({
  options,
  selectedOption,
  onSelect,
  x,
  y,
  width,
  height,
  textColor = 'text-white'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const containerStyle = {
    position: 'absolute',
    top: y,
    left: x,
    width: width,
    height: height,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div style={containerStyle} className="relative" ref={dropdownRef}>
      <Button
        text={selectedOption}
        onClick={() => setIsOpen(prev => !prev)}
        x="0"
        y="0"
        width="100%"
        height="100%"
        customClasses="justify-between px-4"
        active={isOpen}
        textColor={textColor}
      />

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10">
          {options.map(option => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              // --- SOLUTION ---
              // 1. Apply the height and use flexbox to vertically center the text.
              style={{ height: height, display: 'flex', alignItems: 'center' }}
              // 2. Remove 'py-3' to let the inline style control the height.
              className="px-4 text-gray-700 hover:bg-sky-100 cursor-pointer transition-colors duration-150"
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