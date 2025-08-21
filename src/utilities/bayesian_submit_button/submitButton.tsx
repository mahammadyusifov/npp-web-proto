import React, { useState } from 'react';
import Button from '../button';
import { handleSubmitLogic } from './submitButton.logic';
import type { DropdownValues, SubmissionState } from './submitButton.logic';

interface SubmitButtonProps {
  dropdownValues: DropdownValues;
  x?: string;
  y?: string;
  width?: string;
  height?: string;
  shape?: 'smooth' | 'sharp' | 'circle';
  before_hover_color?: string;
  hover_color?: string;
  click_color?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  dropdownValues,
  before_hover_color = 'bg-red-500',
  hover_color = 'hover:bg-blue-500',
  click_color = 'active:bg-green-500',
  ...buttonProps
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Submit');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  const handleClick = () => {
    handleSubmitLogic(dropdownValues, setIsLoading, setStatusMessage, setSubmissionState);
  };
  
  // Combine the hover and click styles into one string.
  const interactionClasses = `${hover_color} ${click_color} text-white`;

  return (
    <Button
      text={statusMessage}
      onClick={handleClick}
      
      // --- THE WORKAROUND IS HERE ---
      // 1. We force the button into its "active" state. This makes it use
      //    `activeColor` for its background, avoiding the `bg-transparent` issue.
      active={true}
      
      // 2. We pass our desired default color (red) into the `activeColor` prop.
      activeColor={before_hover_color}
      
      // 3. We pass our hover (blue) and click (green) styles as custom classes.
      customClasses={interactionClasses}
      
      {...buttonProps}
    />
  );
};

export default SubmitButton;