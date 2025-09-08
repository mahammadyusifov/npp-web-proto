import React from 'react';
import Button from '../../../utilities/button';

interface SubmitButtonProps {
  onClick: () => void;
  isSubmitting: boolean;
  x?: string;
  y?: string;
  width?: string;
  height?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  isSubmitting,
  ...buttonProps
}) => {
  return (
    <Button
      text={isSubmitting ? 'Submitting...' : 'Submit'}
      onClick={onClick}
      disabled={isSubmitting} // Disable button while submitting
      active={true}
      activeColor={isSubmitting ? 'bg-gray-500' : 'bg-red-700'}
      customClasses="hover:bg-blue-600 active:bg-green-500 text-white"
      shape="smooth"
      {...buttonProps}
    />
  );
};

export default SubmitButton;