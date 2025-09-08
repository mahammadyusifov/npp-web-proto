import React from 'react';
import { Link } from 'react-router-dom';

// It now takes a 'to' prop for the link destination
const NavItem = ({
  text,
  to, // ADDED: The path to navigate to
  position = { x: '50%', y: '50%' },
  size = 'text-sm',
  font = 'mono',
  color = "text-gray-800", 
  activeColor = "text-red-800",
  hoverColor = "hover:text-blue-400",
  active = false,
  onClick,
}) => {
  const itemStyle = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    transform: 'translate(-50%, -50%)',
  };

  const finalClasses = `
    cursor-pointer transition-colors duration-300 bg-transparent border-none
    p-2 focus:outline-none font-${font} ${size}
    ${active ? `${activeColor} font-bold` : `${color} ${hoverColor}`}
    no-underline
  `;
  
  return (
    <Link
      to={to} // Use the 'to' prop here
      style={itemStyle}
      className={finalClasses}
      onClick={() => onClick(text)}
    >
      {text}
    </Link>
  );
};

export default NavItem;