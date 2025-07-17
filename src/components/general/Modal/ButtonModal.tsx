"use client";

import React from "react";
import BaseButton from "../Button";
import { ButtonColor } from "@/utils/buttonColor";

type ButtonModalProps = {
  isOpen: boolean;
  onLeft: () => void;
  onRight: () => void;
  title: string;
  leftButtonText: string;
  rightButtonText: string;
  leftButtonColor?: ButtonColor;
  rightButtonColor?: ButtonColor;
  isCaption?: boolean;
  caption?: string;
  isCaptionLine?: boolean;
  isSingleButton?: boolean;
};

export default function ButtonModal({
  isOpen,
  onLeft,
  onRight,
  title,
  leftButtonText,
  rightButtonText,
  leftButtonColor = "cp-gray",
  rightButtonColor = "cp-sky-blue",
  isCaption = false,
  caption = "",
  isCaptionLine = false,
  isSingleButton = false,
}: ButtonModalProps): React.JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cp-black/80">
      <div className="bg-cp-white text-cp-black rounded-[6] w-100 text-center">
        <div className="mx-5 mt-10 mb-5 ">
          <p className="headline-cp-large mb-10 h-5 ">{title}</p>
          {/* --- caption部 --- */}
          {isCaption && (
            <>
              {isCaptionLine && (
                <div className="border-b border-cp-soft-gray" />
              )}
              <div className="my-5 text-center text-sm text-cp-black">
                {caption}
              </div>
            </>
          )}
          {/* --- ボタン部 --- */}
          <div
            className={`flex justify-center ${
              !isSingleButton ? "space-x-4" : ""
            }`}
          >
            <BaseButton
              onClick={onLeft}
              text={leftButtonText}
              color={leftButtonColor}
              size={isSingleButton ? "large" : "medium"}
            />
            {!isSingleButton && (
              <BaseButton
                onClick={onRight}
                text={rightButtonText}
                color={rightButtonColor}
                size="medium"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
