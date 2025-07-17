"use client";

import React from "react";
import { getButtonSizeClass } from "@/utils/buttonSize";
import { getButtonColorClass } from "@/utils/buttonColor";

type BaseButtonProps = {
  onClick: () => void;
  text: string;
  color: "cp-sky-blue" | "cp-gray" | "cp-red" | "cp-white" | "cp-slate-gray";
  size: "large" | "medium" | "small";
};

export default function BaseButton({
  onClick,
  text,
  color,
  size,
}: BaseButtonProps): React.JSX.Element | null {
  const sizeClass = getButtonSizeClass(size);
  const colorClass = getButtonColorClass(color);
  return (
    <button
      onClick={onClick}
      className={`${sizeClass} ${colorClass} rounded-[6px] headline-cp-medium`}
    >
      {text}
    </button>
  );
}
