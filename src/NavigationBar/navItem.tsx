import React from 'react';
import { Link } from 'react-router-dom';

// --- Customizable Navigation Item Component ---
// This component renders a single, clickable text item for the navigation bar.
//
// Props:
// - text: The string to display and use as an identifier.
// - position: An object { x, y } for the item's center coordinates relative to the bar.
// - size: The font size (e.g., 'text-sm', 'text-lg').
// - font: The font family. Options: 'sans', 'serif', 'mono'.
// - active: A boolean to indicate if this is the currently active item.
// - onClick: A function that passes the item's text back to the parent to set the active state.

const NavItem = ({
  text,
  position = { x: '50%', y: '50%' },
  size = 'text-sm',
  font = 'mono',
  color = "text-gray-800", 
  activeColor = "text-red-800",
  hoverColor = "hover:text-blue-400",
  active = false,
  onClick,
}) => {
  // --- Style for Positioning ---
  const itemStyle = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    transform: 'translate(-50%, -50%)',
  };

  // --- Font and Active State Styling ---
  const fontClasses = {
    sans: 'font-sans',   // A clean, modern sans-serif font.
    serif: 'font-serif', // A more traditional serif font.
    mono: 'font-mono',   // A monospaced, techy-style font.
  };

  // Determine the final classes based on props.
  // We add bg-transparent, border-none, and focus:outline-none to reset button styles.
  const finalClasses = `
    cursor-pointer
    transition-colors duration-300
    bg-transparent
    border-none
    p-2 
    focus:outline-none
    ${fontClasses[font] || fontClasses.sans}
    ${size}
    ${active ? `${activeColor} font-bold` : `${color} ${hoverColor}`}
  `;

  const urlPath = text === 'Bayesian Methods' ? '' : text.split(' ')[0].toLowerCase();
  return (
    <Link
      to={urlPath}
      style={itemStyle}
      className={finalClasses}
      onClick={() => onClick(text)} // The onClick still works here to set parent state.
    >
      {text}
    </Link>
  );
};

export default NavItem;
