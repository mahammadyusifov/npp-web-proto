import Button from "../../utilities/button";
import DropDown from "../../utilities/dropdown";
import { useState } from "react";

const Menu = () => {
const labels = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  // 2. Define the vertical separation as a PERCENTAGE.
  // This value is the percentage of the parent container's height.
  const separation = 3.5; // Each button's top is 3.5% lower than the last.

  // State to track which button is currently active
  const [activeButton, setActiveButton] = useState('A');

  return (
    // Note: For percentage-based 'top' (y) positioning to work correctly,
    // the parent container of this component must have a defined height.
    // For example, the parent could have a style of { height: '100vh' }.
    <>
      {labels.map((label, index) => (
        <Button
          key={label}
          text={label}
          active={activeButton === label}
          onClick={() => setActiveButton(label)}
          x={'50%'}
          // The y position is now calculated using percentages.
          // We start at 5% from the top and add the separation for each button.
          y={`${5 + index * separation}%`}
          width={'60px'}
          height={'30px'}
          shape={'smooth'}
        />
      ))}
    </>
  );
}

export default Menu;