"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type DropBoxSize = "small" | "medium" | "large";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  options: Option[];
  value: string;
  size?: DropBoxSize;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  error?: string;
  isRounded?: boolean;
  bgColor?: string;
};

export default function DropDown({
  label,
  options,
  value,
  onChange,
  error,
  isDisabled = false,
  size = "medium",
  isRounded = true,
  bgColor = "bg-cp-white",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "選択してください";

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  const sizeStyle = {
    small: "h-7.5 w-45",
    medium: "h-15 w-70",
    large: "h-37.5 w-200",
  };
  const textStyle = {
    small: "body-cp-small",
    medium: "body-cp-medium",
    large: "body-cp-medium",
  };

  const borderStyle = error
    ? "border border-cp-red"
    : "border border-cp-soft-gray";

  const roundedType = isRounded ? "rounded" : "";

  const bgColorStyle = isDisabled ? "bg-gray-100 cursor-not-allowed" : bgColor;

  return (
    <div className="flex flex-col relative">
      {label && <label className="body-cp-medium">{label}</label>}

      <div
        onClick={toggleDropdown}
        className={`
          ${sizeStyle[size]} ${borderStyle} ${bgColorStyle} ${roundedType}
          flex items-center justify-between pl-2.5 pr-2 mt-1 cursor-pointer
          `}
      >
        <span
          className={`${textStyle[size]} ${
            value === "" ? "text-cp-soft-gray" : "text-cp-black "
          }`}
        >
          {selectedLabel}
        </span>
        <IoIosArrowDown
          size={20}
          className="text-gray-500 pointer-events-none"
        />
      </div>
      {/* ドロップダウンリスト */}
      {isOpen && !isDisabled && (
        <ul className={`absolute top-full z-50 ${bgColorStyle}`}>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`${textStyle[size]} ${sizeStyle[size]} flex items-center pl-2.5 hover:bg-cp-sky-blue cursor-pointer`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="label-cp-medium text-cp-red">{error}</p>}
    </div>
  );
}
