import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="rounded-lg border border-blue-500 bg-green-400 py-6 px-7.5 shadow-lg">
      <div className="flex h-11.5 w-11.5 items-center justify-center text-black">
        {children}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 ml-5">
            {total}
          </h4>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-5">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;

