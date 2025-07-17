"use client";

import React from "react";

type YexNoProps = {
  isOpen: boolean;
  onLeft: () => void;
  onRight: () => void;
  mainText: string;
  leftButtonText: string;
  rightButtonText: string;
};

export default function YexNoModal({
  isOpen,
  onLeft,
  onRight,
  mainText,
  leftButtonText,
  rightButtonText,
}: YexNoProps): React.JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cp-black/80">
      <div className="bg-cp-white text-black rounded-[6] shadow-md w-[400] h-[150] text-center">
        <div className="w-90 h-[98] mx-5 mt-10">
          <p className="headline-cp-large mb-10 h-5">{mainText}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onLeft}
              className="w-[170px] h-[38] rounded-[6] bg-cp-gray text-cp-white headline-cp-medium"
            >
              {leftButtonText}
            </button>
            <button
              onClick={onRight}
              className="w-[170px] h-[38] rounded bg-cp-sky-blue text-cp-white headline-cp-medium"
            >
              {rightButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
