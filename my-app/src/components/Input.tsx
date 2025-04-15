'use client';

import React from 'react';

interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  hidden?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = true,
  hidden = false,
  className = '',
}) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        hidden = {hidden}
        className={`outline-none py-2 px-3 rounded border border-gray-500/40 hover:border-gray-500 ${className}`}
      />
    </div>
  );
};

export default Input;
