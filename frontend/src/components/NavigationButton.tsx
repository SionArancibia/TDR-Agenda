// src/components/NavigationButton.tsx
import React from 'react';

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full bg-green-400 hover:bg-green-500 text-white"
    >
      {direction === 'left' ? '←' : '→'}
    </button>
  );
};

export default NavigationButton;