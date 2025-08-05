import React, { useState, Children, cloneElement } from 'react';

// --- Positionable Button Component ---
// This version is modified to use absolute positioning with x and y coordinates.
const Button = ({
  text,
  active = false,
  onClick,
  shape = 'smooth', // 'sharp', 'smooth', 'circle'
  activeColor = 'bg-sky-500',
  hoverColor = 'border-sky-300',
  textColor = 'text-white',
  activeTextColor = 'text-white',
  width = null,
  height = null,
  x = '50%', // New prop for x-coordinate
  y = '50%', // New prop for y-coordinate
  customClasses = ''
}) => {

  // --- STYLE COMPUTATION ---

  // Base classes for styling the button's internal content
  const baseClasses = 'font-semibold focus:outline-none transition-all duration-300 ease-in-out border-2 flex items-center justify-center text-center';

  // --- Shape Classes ---
  let shapeClasses = '';
  let paddingClasses = 'px-5 py-2'; // Default padding

  switch (shape) {
    case 'sharp':
      shapeClasses = 'rounded-none';
      break;
    case 'circle':
      shapeClasses = 'rounded-full';
      paddingClasses = ''; // Padding is handled by size for circles
      break;
    case 'smooth':
    default:
      shapeClasses = 'rounded-lg';
      break;
  }

  // --- State-based Classes ---
  const activeClasses = `${activeColor} ${activeTextColor} border-transparent`;
  const inactiveClasses = `bg-transparent ${textColor} hover:${hoverColor} border-transparent`;

  // Combine all classes, applying default padding only if no size is specified
  const finalClassName = `
    ${baseClasses}
    ${shapeClasses}
    ${!width && !height ? paddingClasses : ''}
    ${active ? activeClasses : inactiveClasses}
    ${customClasses}
  `.replace(/\s+/g, ' ').trim();

  // --- POSITIONING STYLE ---
  // We use the style attribute for absolute positioning and dynamic dimensions.
  const buttonStyle = {
    position: 'absolute',
    top: y,
    left: x,
    width: width,
    height: height,
  };

  // For a circle, ensure width and height are equal for a perfect circle.
  if (shape === 'circle') {
    if (width && !height) buttonStyle.height = width;
    if (height && !width) buttonStyle.width = height;
    if (!width && !height) {
      buttonStyle.width = '96px'; // Default circle size
      buttonStyle.height = '96px';
    }
  }

  return (
    <button
      onClick={onClick}
      className={finalClassName}
      style={buttonStyle}
    >
      {text}
    </button>
  );
};
export default Button;