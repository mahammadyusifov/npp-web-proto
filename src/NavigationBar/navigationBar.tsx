import React, { Children, cloneElement } from 'react';
import { useLocation } from 'react-router-dom'; // 1. Import the useLocation hook

const NavigationBar = ({
  width = '100%',
  height = '6.4%',
  color = 'bg-gray-100',
  center = { x: '50%', y: '0%' },
  shape = 'sharp-rectangle',
  children,
  onNavigate,
}) => {
  
  // 2. Get the current location object, which contains the URL pathname
  const location = useLocation();

  // 3. Determine the active item based on the current URL pathname
  let activeItemText = "Bayesian Methods"; // Default for "/"
  if (location.pathname.startsWith('/reliability-views')) {
    activeItemText = "Reliability Views";
  } else if (location.pathname.startsWith('/statistical')) {
    activeItemText = "Statistical Methods";
  } else if (location.pathname.startsWith('/settings')) {
    activeItemText = "Settings";
  }

  // NOTE: We no longer need the internal useState for activeItem.

  const handleItemClick = (itemName) => {
    // The <Link> component in NavItem handles the navigation.
    // This function can still be used for other side effects if needed.
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
              // 4. The 'active' prop is now derived from our route-aware logic
              active: child.props.text === activeItemText,
              onClick: handleItemClick,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default NavigationBar;