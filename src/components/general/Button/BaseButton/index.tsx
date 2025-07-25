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
  isRounded?: boolean;
};

export default function BaseButton({
  onClick,
  text,
  color,
  size,
  className = "",
  isRounded = true,
}: BaseButtonProps): React.JSX.Element | null {
  const sizeStyle = getButtonSizeStyle(size);
  const colorStyle = getButtonColorStyle(color);
  const roundedType = isRounded ? "rounded" : "";
  return (
    <button
      onClick={onClick}
      className={`${sizeStyle} ${colorStyle} ${className} ${roundedType} cursor-pointer`}
    >
      {text}
    </button>
  );
}
