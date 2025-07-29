"use client";

import React from "react";

type RadioOption = {
  label: string;
  value: string;
  isInput?: boolean;
  inputPlaceholder?: string;
};

type Props = {
  label?: string;
  options: RadioOption[];
  value: string;
  inputValue?: string;
  onChange: (value: string) => void;
  onInputChange?: (value: string) => void;
};

const RadioButton = ({
  label,
  options,
  value,
  inputValue = "",
  onChange,
  onInputChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm text-cp-black">{label}</label>}
      <div className="flex items-center gap-4 ">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-1">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            {!option.isInput && (
              <span className="text-cp-black">{option.label}</span>
            )}
            {option.isInput && (
              <input
                type="text"
                placeholder={option.inputPlaceholder || ""}
                disabled={value !== option.value}
                className={`ml-2 border rounded px-2 py-1 text-sm ${
                  value !== option.value
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white text-black"
                }`}
                value={inputValue}
                onChange={(e) => onInputChange?.(e.target.value)}
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
