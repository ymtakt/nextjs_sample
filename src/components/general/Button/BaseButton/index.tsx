"use client";

import React from "react";
import { getButtonSizeStyle } from "@/utils/buttonSize";
import { getButtonColorStyle } from "@/utils/buttonColor";

type BaseButtonProps = {
  onClick: () => void;
  text: string;
  color: "cp-sky-blue" | "cp-gray" | "cp-red" | "cp-white" | "cp-slate-gray";
  size: "large" | "medium" | "small";
  className?: string;
};

export default function BaseButton({
  onClick,
  text,
  color,
  size,
  className = "",
}: BaseButtonProps): React.JSX.Element | null {
  const sizeStyle = getButtonSizeStyle(size);
  const colorStyle = getButtonColorStyle(color);
  return (
    <button
      onClick={onClick}
      className={`${sizeStyle} ${colorStyle} ${className}`}
    >
      {text}
    </button>
  );
}
