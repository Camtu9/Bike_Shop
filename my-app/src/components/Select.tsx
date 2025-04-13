'use client';

import React from 'react';

export interface Option {
  label: string;
  value: string;
}

export interface SelectProps {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  options,
  required = true,
  className = '',
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`appearance-none w-full py-2 px-3 rounded-md border hover:border-gray-500 border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-gray-700">
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
