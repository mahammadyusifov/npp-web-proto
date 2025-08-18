import React, { useState, useRef } from 'react';

// Icons now accept a 'size' prop to be dynamically sized.
const SearchIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
  </svg>
);

const UploadIcon = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
    </svg>
);


const SelectionBar = ({
  width = '500px',
  height = '60px',
  shape = 'smooth-rectangle', // 'sharp-rectangle' or 'smooth-rectangle'
  x = '50%',
  y = '50%',
  color = 'bg-gray-800',
  scale = 1, // New prop to control the scale of internal elements
}) => {
  const [selectionName, setSelectionName] = useState('No current selection');
  const fileInputRef = useRef(null);

  const handleSearchClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectionName(file.name);
    }
  };
  
  const handleUploadClick = () => {
    console.log('Upload button clicked. No action configured.');
  };

  // --- SIZING CALCULATIONS BASED ON SCALE PROP ---
  // Define base sizes for when scale is 1.
  const baseFontSize = 14;
  const baseIconSize = 16;
  const baseButtonHeight = 40;
  const baseButtonPaddingX = 16;
  const baseGap = 8;
  const baseContainerPadding = 8;

  // Calculate the actual sizes by multiplying the base by the scale prop.
  const fontSize = baseFontSize * scale;
  const iconSize = baseIconSize * scale;
  const buttonHeight = baseButtonHeight * scale;
  const buttonPaddingX = baseButtonPaddingX * scale;
  const gap = baseGap * scale;
  const containerPadding = baseContainerPadding * scale;

  // --- DYNAMIC STYLING ---
  const containerStyle = {
    position: 'absolute',
    top: y,
    left: x,
    width: width,
    height: height,
    transform: 'translate(-50%, -50%)',
    padding: `${containerPadding}px`,
    gap: `${gap}px`,
  };

  const selectionTextStyle = {
    fontSize: `${fontSize}px`,
  };

  const buttonStyle = {
    height: `${buttonHeight}px`,
    paddingLeft: `${buttonPaddingX}px`,
    paddingRight: `${buttonPaddingX}px`,
    fontSize: `${fontSize}px`,
    // Ensure the border-radius scales nicely with the button height
    borderRadius: `${8 * scale}px`, 
  };

  const shapeClass = shape === 'smooth-rectangle' ? 'rounded-xl' : 'rounded-none';

  return (
    <div
      style={containerStyle}
      className={`flex items-center ${color} ${shapeClass} shadow-2xl border border-white/10`}
    >
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Section 1: Selection Text */}
      <div className="flex-grow px-4">
        <p className="text-gray-300 truncate" style={selectionTextStyle} title={selectionName}>
          {selectionName}
        </p>
      </div>

      {/* Section 2: Action Buttons */}
      <div className="flex items-center" style={{ gap: `${gap}px` }}>
        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          style={buttonStyle}
          className="flex items-center justify-center bg-gray-700/50 hover:bg-gray-600/80 text-white font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <SearchIcon size={iconSize} />
          <span style={{ marginLeft: `${gap}px` }}>Search</span>
        </button>

        {/* Upload Button */}
        <button
          onClick={handleUploadClick}
          style={buttonStyle}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <UploadIcon size={iconSize} />
          <span style={{ marginLeft: `${gap}px` }}>Upload</span>
        </button>
      </div>
    </div>
  );
};

export default SelectionBar;
