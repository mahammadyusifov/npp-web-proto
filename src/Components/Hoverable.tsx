import React, { CSSProperties } from 'react';

// --- Type Definitions for the Component's Props ---
interface HoverableProps {
  // The text to display inside the tab.
  text: string;
  // An optional icon component to display to the left of the text.
  icon?: React.ReactNode;
  // A boolean to determine if the tab is currently highlighted.
  active?: boolean;
  // A callback function that is triggered when the tab is clicked.
  onClick: (text: string) => void;
  // Optional custom colors for different states.
  textcolor?: string;
  activeColor?: string;
  activeBgColor?: string;
  hoverBorderColor?: string;
  // Optional x, y coordinates for absolute positioning.
  center?: { x: string; y: string };
  // Optional width and height for the component.
  width?: string;
  height?: string;
}

// --- Main SidebarTab Component ---
const Hoverable: React.FC<HoverableProps> = ({
  text,
  icon,
  active = false,
  onClick,
  textcolor = 'text-white',
  activeColor = 'text-white',
  activeBgColor = 'bg-blue-600',
  hoverBorderColor = 'hover:border-gray-400',
  center = { x: '50%', y: '50%' },
  width = '90%',
  height = '40px',
}) => {

  // --- Dynamic Styling for Positioning and Sizing ---
  const containerStyle: CSSProperties = {
    width: width,
    height: height,
  };
  if (center) {
    containerStyle.position = 'absolute';
    containerStyle.top = center.y;
    containerStyle.left = center.x;
    containerStyle.transform = 'translate(-50%, -50%)';
  }

  // --- Dynamic Styling for Appearance ---
  // This logic creates the new border-on-hover effect and removes the focus ring.
  const finalClasses = `
    flex items-center justify-center space-x-3 px-4 py-2 rounded-md
    text-sm font-medium cursor-pointer
    transition-colors duration-200 ease-in-out
    focus:outline-none
    border-2
    ${active 
      ? `${activeBgColor} ${activeColor} border-transparent shadow-md` 
      : `bg-transparent ${textcolor} border-transparent ${hoverBorderColor}`
    }
  `;

  return (
    <button
      type="button"
      style={containerStyle}
      className={finalClasses}
      onClick={() => onClick(text)}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Hoverable ;


// --- Example of how to use this component in a parent ---
/*
import React, { useState } from 'react';
import SidebarTab from './SidebarTab';

// A simple placeholder icon for the example
const PlaceholderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

function Sidebar() {
  const [activeTab, setActiveTab] = useState('Requirement V&V');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const tabs = [
    "FP",
    "Requirement Dev",
    "Requirement V&V",
    "Design Dev",
    "Design V&V"
  ];

  return (
    <div className="w-64 p-4 bg-gray-50 border-r border-gray-200">
      <nav className="flex flex-col space-y-1">
        {tabs.map(tabName => (
          <SidebarTab
            key={tabName}
            text={tabName}
            icon={<PlaceholderIcon />}
            active={activeTab === tabName}
            onClick={handleTabClick}
            width="100%"
            height="40px"
            hoverBorderColor="hover:border-gray-400" // Example of customizing the hover border
          />
        ))}
      </nav>
    </div>
  );
}
*/
