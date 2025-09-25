import { cn } from '@/lib/utils';
import React from 'react';
import { SelectButton as SelectButtonProps } from '../types';

const SelectButton: React.FC<SelectButtonProps> = ({ label, value, onSelect, className = '', selectClassName = '', title = '' }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  };

  return (
    <div className={`${className}`}>
      <label className='text-black'>{title}</label><br />
      <select onChange={handleChange} className={cn(selectClassName, "rounded-md border-none outline-none focus:ring-2 focus:border-transparent focus:outline-none")}>
        {
          value?.map((param, idx) => <option key={idx} value={param}>{param}</option>)
        }
      </select>
    </div>
  );
};

export default SelectButton;