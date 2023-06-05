import React from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { TickSquare, TickSquare3 } from '@/assets';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
        className="hidden"
      />
      <label htmlFor={id}>
        <Image src={checked ? TickSquare : TickSquare3} />
      </label>
      <span className={classnames('ml-2 text-xs', checked ? 'font-bold' : '')}>
        {label}
      </span>
    </div>
  );
};

export default Checkbox;
