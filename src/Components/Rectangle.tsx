import React, { useState, Children, cloneElement } from 'react';

// --- Customizable Navigation Bar Component ---
// This component is now "smart". It manages the active state of its children internally.
//
// Props:
// - defaultActive: The text of the NavItem that should be active by default.
// - onNavigate: (Optional) A function that gets called with the text of the item when it's clicked.
// - ... (all other existing props: width, height, color, etc.)

const Rectangular = ({
  width = '100%',
  height = '60px',
  color = 'bg-gray-100',
  center = { x: '50%', y: '0%' },
  shape = 'sharp-rectangle',
  children,
  defaultActive, 
  onNavigate,      
}) => {
  // This variable remembers which hoverable is currently active.
  const [activeItem, setActiveItem] = useState(defaultActive || (Children.toArray(children)[0] as React.ReactElement)?.props?.text || '');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    // If the parent component needs to know about the navigation, call the callback.
    if (onNavigate) {
      onNavigate(itemName);
    }
  };

  const barStyle = {
    position: 'absolute',
    '--bar-width': width,
    '--bar-height': height,
    width: 'var(--bar-width)',
    height: 'var(--bar-height)',
    top: `clamp(calc(var(--bar-height) / 2), ${center.y}, calc(100% - var(--bar-height) / 2))`,
    left: `clamp(calc(var(--bar-width) / 2), ${center.x}, calc(100% - var(--bar-width) / 2))`,
    transform: 'translate(-50%, -50%)',
  };

  const shapeClasses = {
    'smooth-rectangle': 'rounded-lg',
    'sharp-rectangle': 'rounded-none',
    'pill': 'rounded-full',
    'circle': 'rounded-full',
  };
  const shapeClass = shapeClasses[shape] || shapeClasses['smooth-rectangle'];

  return (
    <div style={barStyle} className={`${color} ${shapeClass} shadow-lg transition-all duration-300`}>
      <div className="relative w-full h-full">
        {Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return cloneElement(child, {
              active: child.props.text === activeItem,
              onClick: handleItemClick,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default Rectangular;
