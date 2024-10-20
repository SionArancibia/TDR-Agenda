// src/components/MonthCard.tsx
import React from 'react';

interface MonthCardProps {
  month: string;
  index: number;
  selectedMonth: number;
  selectedYear: number;
  handleMonthChange: (year: number, month: number) => void;
  setMonth: (mes: string) => void;
  setYear: (año: string) => void;
}

const MonthCard: React.FC<MonthCardProps> = ({ month, index, selectedMonth, selectedYear, handleMonthChange, setMonth, setYear }) => {
  const handleClick = () => {
    const newMonth = selectedMonth + index;
    const newYear = selectedYear + Math.floor(newMonth / 12);
    handleMonthChange(newYear, newMonth % 12);
    setMonth(((newMonth % 12) + 1).toString());
    setYear(newYear.toString());
  };

  return (
    <div 
      className='p-4 border border-gray-300 rounded-lg text-center font-semibold text-lg shadow-md cursor-pointer hover:bg-gray-400 bg-green-500 text-white'
      onClick={handleClick}
    >
      {month}
    </div>
  );
};

export default MonthCard;